import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { PageSection, PageShell } from "@/components/neometo/page-shell";
import { MethodLauncher } from "@/components/neometo/method-launcher";
import { methods } from "@/lib/mcp/methods";
import { methodPageCopy, techniquesFor } from "@/lib/method-pages";
import type { MethodSlug } from "@/lib/open-method";

const BASE = "https://neometo.lovable.app";

export const Route = createFileRoute("/methods/$slug")({
  loader: ({ params }) => {
    const method = methods.find((m) => m.slug === params.slug);
    if (!method) throw notFound();
    return { method };
  },
  head: ({ params, loaderData }) => {
    const method = loaderData?.method;
    if (!method) {
      return { meta: [{ title: "Not found | NEOMETO" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${method.name} — ${method.promise} | NEOMETO`;
    const description = method.description;
    const url = `${BASE}/methods/${params.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: method.name,
            description: method.description,
            totalTime: "PT2M",
            step: method.steps.map((step, i) => ({
              "@type": "HowToStep",
              position: i + 1,
              name: `Step ${i + 1}`,
              text: step,
            })),
          }),
        },
      ],
    };
  },
  component: MethodPage,
});

function MethodPage() {
  const { method } = Route.useLoaderData();
  const slug = method.slug as MethodSlug;
  const techniques = techniquesFor(slug);
  const copy = methodPageCopy[slug];
  const others = methods.filter((m) => m.slug !== method.slug);

  return (
    <PageShell
      eyebrow={method.area}
      title={method.promise}
      lead={method.description}
      closingLine="Two minutes. No account. Nothing to set up."
    >
      <div>
        <MethodLauncher slug={slug} duration={method.duration} />
      </div>

      <PageSection heading="What happens">
        <ol className="list-decimal space-y-2 pl-5">
          {method.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </PageSection>

      <PageSection heading="Techniques">
        {techniques.length > 0 ? (
          <ul className="space-y-4">
            {techniques.map((technique) => (
              <li key={technique.title}>
                <span className="block font-medium text-ink">{technique.title}</span>
                <span className="block">{technique.meta}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>This method has one technique — {method.name}. There's nothing to choose between.</p>
        )}
      </PageSection>

      <PageSection heading="When to use it">
        {copy.whenToUse.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </PageSection>

      <PageSection heading="Where it comes from">
        <p>{copy.origin}</p>
        <p>
          <Link to="/sources" className="font-medium text-brand hover:underline">
            More on where the methods come from
          </Link>
        </p>
      </PageSection>

      <PageSection heading="Other methods">
        <ul className="space-y-2">
          {others.map((other) => (
            <li key={other.slug}>
              <Link
                to="/methods/$slug"
                params={{ slug: other.slug }}
                className="inline-flex min-h-11 items-center text-ink hover:text-brand"
              >
                {other.promise}
              </Link>
            </li>
          ))}
        </ul>
      </PageSection>
    </PageShell>
  );
}
