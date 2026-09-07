import { createFileRoute, Link } from "@tanstack/react-router";

import { SiteFooter } from "@/components/neometo/site-footer";

const title = "Privacy | NEOMETO";
const description =
  "What NEOMETO logs, why, and what it never collects. Plain language, no legal wall of text.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/70">
        <div className="section-shell flex h-16 items-center justify-between">
          <Link to="/" className="text-base font-bold tracking-[0.22em] text-ink">
            NEOMETO
          </Link>
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-ink">
            Back to site
          </Link>
        </div>
      </header>

      <main className="section-shell py-16 md:py-24">
        <article className="mx-auto max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-ink md:text-5xl">Privacy</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Short version: NEOMETO logs which methods people open and what they type into the
            &ldquo;what&apos;s going on right now&rdquo; box. Nothing is tied to a person.
          </p>

          <h2 className="mt-12 text-2xl font-bold tracking-tight text-ink">What we log</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Two things: the method you open, and the text you type into the input on the front page.
            Both are stored anonymously. There is no account, no email, no name, and nothing that
            links an entry back to you.
          </p>

          <h2 className="mt-10 text-2xl font-bold tracking-tight text-ink">Why</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            So we can see which methods people actually use, and what people are looking for that we
            haven&apos;t built yet. That&apos;s the whole purpose — it decides what gets improved and
            what gets made next.
          </p>

          <h2 className="mt-10 text-2xl font-bold tracking-tight text-ink">What we don&apos;t do</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            We don&apos;t collect health data or make any claim about your health. We don&apos;t
            assess, diagnose, or categorise anyone. We don&apos;t sell or share this data with third
            parties, and we don&apos;t use it for advertising.
          </p>

          <h2 className="mt-10 text-2xl font-bold tracking-tight text-ink">Questions or deletion</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Write to{" "}
            <a
              href="mailto:hello@neometo.com"
              className="font-medium text-brand underline-offset-4 hover:underline"
            >
              hello@neometo.com
            </a>{" "}
            and we&apos;ll answer what we hold and remove anything you ask us to.
          </p>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
