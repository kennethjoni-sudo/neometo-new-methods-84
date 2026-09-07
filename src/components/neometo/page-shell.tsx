import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/neometo/site-footer";
import { SiteHeader } from "@/components/neometo/site-header";

type PageShellProps = {
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  children: ReactNode;
  closingLine?: string;
};

export function PageShell({
  eyebrow,
  title,
  lead,
  children,
  closingLine = "You don't need a label to use a useful method.",
}: PageShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="section-shell py-20 md:py-28">
        <article className="mx-auto max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">{eyebrow}</p>
          <h1 className="mt-5 text-[2.5rem] font-bold leading-[1.05] text-ink sm:text-5xl">
            {title}
          </h1>
          {lead ? (
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{lead}</p>
          ) : null}

          <div className="mt-14 space-y-10">{children}</div>

          <div className="mt-16 rounded-2xl border-[0.5px] border-border bg-surface p-8">
            <p className="text-lg font-medium text-ink">{closingLine}</p>
            <Button asChild className="mt-6 rounded-full px-6">
              <Link to="/" hash="methods">
                Back to the methods
              </Link>
            </Button>
          </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}

export function PageSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-ink">{heading}</h2>
      <div className="mt-3 space-y-3 leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

export function PagePlaceholder({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-brand/40 bg-brand-soft/50 p-5 text-sm leading-relaxed text-muted-foreground">
      {children}
    </div>
  );
}
