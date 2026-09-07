import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { supabase } from "@/integrations/supabase/client";

// The managed OAuth helpers live on the Supabase client's `auth.oauth`
// namespace; keep a tiny typed wrapper so TS stays happy if the local
// typings lag the runtime.
type OAuthNamespace = {
  getAuthorizationDetails: (id: string) => Promise<{
    data: {
      authorization_id?: string;
      redirect_url?: string;
      redirect_to?: string;
      scope?: string;
      client?: { name?: string; client_name?: string; redirect_uris?: string[] };
    } | null;
    error: { message: string } | null;
  }>;
  approveAuthorization: (id: string) => Promise<{
    data: { redirect_url?: string; redirect_to?: string } | null;
    error: { message: string } | null;
  }>;
  denyAuthorization: (id: string) => Promise<{
    data: { redirect_url?: string; redirect_to?: string } | null;
    error: { message: string } | null;
  }>;
};

const oauth = (supabase.auth as unknown as { oauth: OAuthNamespace }).oauth;

const IDENTITY_SCOPE_LABELS: Record<string, string> = {
  openid: "Confirm your identity",
  email: "Share your email address",
  profile: "Share your basic profile",
};

export const Route = createFileRoute("/.lovable/oauth/consent")({
  validateSearch: z.object({
    authorization_id: z.string().min(1).optional(),
  }),
  component: OAuthConsent,
  errorComponent: ({ error }) => (
    <Panel>
      <h1 className="font-headline text-2xl font-semibold">Something went wrong</h1>
      <p className="text-sm text-foreground/70">{error.message}</p>
    </Panel>
  ),
});

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-md space-y-6 rounded-3xl border border-ink-line bg-surface p-8 shadow-card">
        {children}
      </div>
    </main>
  );
}

type Details = {
  clientName: string;
  scopes: string[];
};

function OAuthConsent() {
  const { authorization_id: authorizationId } = Route.useSearch();
  const [ready, setReady] = useState(false);
  const [signedInEmail, setSignedInEmail] = useState<string | null>(null);
  const [details, setDetails] = useState<Details | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // Auth form state
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authMessage, setAuthMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (cancelled) return;
      setSignedInEmail(session?.user?.email ?? null);
      setReady(true);
    })();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSignedInEmail(session?.user?.email ?? null);
    });
    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!ready || !signedInEmail || !authorizationId) return;
    let cancelled = false;
    (async () => {
      const { data, error: detailsError } = await oauth.getAuthorizationDetails(authorizationId);
      if (cancelled) return;
      if (detailsError) {
        setError(detailsError.message);
        return;
      }
      // Some authorizations resolve immediately — follow the provider redirect.
      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) {
        window.location.assign(immediate);
        return;
      }
      setDetails({
        clientName: data?.client?.name ?? data?.client?.client_name ?? "An application",
        scopes: (data?.scope ?? "").split(" ").filter(Boolean),
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [ready, signedInEmail, authorizationId]);

  async function handleAuthSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setAuthMessage(null);
    try {
      if (mode === "sign-in") {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) setAuthMessage(signInError.message);
      } else {
        // Stay on this URL so the consent flow resumes right here.
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.href },
        });
        if (signUpError) setAuthMessage(signUpError.message);
        else setAuthMessage("Check your email to confirm your account, then return to this page.");
      }
    } finally {
      setBusy(false);
    }
  }

  async function decide(approve: boolean) {
    if (!authorizationId) return;
    setBusy(true);
    setError(null);
    try {
      const { data, error: decisionError } = approve
        ? await oauth.approveAuthorization(authorizationId)
        : await oauth.denyAuthorization(authorizationId);
      if (decisionError) {
        setError(decisionError.message);
        return;
      }
      const target = data?.redirect_url ?? data?.redirect_to;
      if (target) window.location.assign(target);
      else setError(approve ? "Approved, but no redirect was provided." : "Connection cancelled.");
    } finally {
      setBusy(false);
    }
  }

  if (!authorizationId) {
    return (
      <Panel>
        <h1 className="font-headline text-2xl font-semibold">Invalid authorization request</h1>
        <p className="text-sm text-foreground/70">
          This link is missing its authorization reference. Restart the connection from the app
          you're trying to connect.
        </p>
      </Panel>
    );
  }

  if (!ready) {
    return (
      <Panel>
        <p className="text-sm text-foreground/70">Loading…</p>
      </Panel>
    );
  }

  if (!signedInEmail) {
    return (
      <Panel>
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50">
            NEOMETO
          </p>
          <h1 className="font-headline text-2xl font-semibold tracking-tight">
            {mode === "sign-in" ? "Sign in to continue" : "Create your account"}
          </h1>
          <p className="text-sm text-foreground/70">
            An application is asking to connect to NEOMETO as you. Sign in to review the request.
          </p>
        </div>
        <form onSubmit={handleAuthSubmit} className="space-y-4">
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            className="w-full rounded-full border border-ink-line bg-background px-5 py-3 text-sm outline-none focus:border-brand"
          />
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            className="w-full rounded-full border border-ink-line bg-background px-5 py-3 text-sm outline-none focus:border-brand"
          />
          {authMessage ? <p className="text-sm text-foreground/70">{authMessage}</p> : null}
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
          >
            {mode === "sign-in" ? "Sign in" : "Sign up"}
          </button>
        </form>
        <button
          type="button"
          onClick={() => setMode(mode === "sign-in" ? "sign-up" : "sign-in")}
          className="text-sm font-medium text-brand hover:underline"
        >
          {mode === "sign-in" ? "New here? Create an account" : "Already have an account? Sign in"}
        </button>
      </Panel>
    );
  }

  if (error) {
    return (
      <Panel>
        <h1 className="font-headline text-2xl font-semibold">Authorization unavailable</h1>
        <p className="text-sm text-foreground/70">{error}</p>
      </Panel>
    );
  }

  if (!details) {
    return (
      <Panel>
        <p className="text-sm text-foreground/70">Loading authorization details…</p>
      </Panel>
    );
  }

  return (
    <Panel>
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50">
          NEOMETO
        </p>
        <h1 className="font-headline text-2xl font-semibold tracking-tight">
          Connect {details.clientName} to NEOMETO
        </h1>
        <p className="text-sm text-foreground/70">
          {details.clientName} will be able to call NEOMETO's enabled tools while you are signed in
          as <span className="font-medium">{signedInEmail}</span>.
        </p>
      </div>
      {details.scopes.length > 0 ? (
        <ul className="space-y-2 text-sm text-foreground/80">
          {details.scopes.map((scope) => (
            <li key={scope} className="flex items-center gap-2">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand" />
              {IDENTITY_SCOPE_LABELS[scope] ?? `Additional permission requested: ${scope}`}
            </li>
          ))}
        </ul>
      ) : null}
      <p className="text-xs text-foreground/50">
        This does not bypass this app's permissions or backend policies.
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => decide(true)}
          disabled={busy}
          className="flex-1 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
        >
          Approve
        </button>
        <button
          type="button"
          onClick={() => decide(false)}
          disabled={busy}
          className="flex-1 rounded-full border border-ink-line px-5 py-3 text-sm font-semibold transition hover:border-brand disabled:opacity-50"
        >
          Cancel connection
        </button>
      </div>
    </Panel>
  );
}
