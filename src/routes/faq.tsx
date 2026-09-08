import { createFileRoute } from "@tanstack/react-router";

import { SiteFooter } from "@/components/neometo/site-footer";
import { SiteHeader } from "@/components/neometo/site-header";
import { Faq, faq } from "@/components/neometo/sections";

const title = "FAQ | NEOMETO";
const description =
  "Common questions about NEOMETO's methods — how long they take, what they're based on, and what they are not.";

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://neometo.lovable.app/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(faqPageSchema),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Faq />
      </main>
      <SiteFooter />
    </div>
  );
}
