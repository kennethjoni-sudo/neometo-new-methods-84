import { createFileRoute, Link } from "@tanstack/react-router";

import { PageShell } from "@/components/neometo/page-shell";
import { methods } from "@/lib/mcp/methods";

const title = "All methods | NEOMETO";
const description = "Every NEOMETO method, what it's for, and how long it takes.";

export const Route = createFileRoute("/methods/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://neometo.lovable.app/methods" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://neometo.lovable.app/methods" }],
  }),
  component: MethodsIndexPage,
});

function MethodsIndexPage() {
  return (
    <PageShell
      eyebrow="Methods"
      title="Every method, one place."
      lead="Pick the moment you're in. Each one takes about two minutes and needs nothing set up."
      closingLine="Two minutes. No account. Nothing to set up."
    >
      <ul className="divide-y divide-border border-y border-border">
        {methods.map((method) => (
          <li key={method.slug}>
            <Link
              to="/methods/$slug"
              params={{ slug: method.slug }}
              className="flex min-h-16 flex-col gap-1 py-5 transition-colors hover:text-brand sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <span className="flex-1">
                <span className="block font-display text-lg font-bold leading-tight text-ink">
                  {method.name}
                </span>
                <span className="mt-1 block text-base leading-relaxed text-muted-foreground">
                  {method.promise}
                </span>
              </span>
              <span className="shrink-0 text-sm text-muted-foreground">
                {method.duration} · {method.area}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
