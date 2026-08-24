import { createFileRoute } from "@tanstack/react-router";

import { SiteHeader } from "@/components/neometo/site-header";
import { SiteFooter } from "@/components/neometo/site-footer";
import {
  Advisor,
  Coming,
  FeaturedMethod,
  FinalCta,
  Hero,
  HowItWorks,
  Manifesto,
  Philosophy,
  Problems,
} from "@/components/neometo/sections";

const title = "NEOMETO | Practical Methods for Focus, Sleep & Overthinking";
const description =
  "Explore practical, research-informed methods for focus, sleep, and overthinking. Find the method that fits what you're experiencing right now — no diagnosis required.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: flowArt.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: flowArt.url },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "NEOMETO",
          slogan: "New Methods for Modern Minds.",
          description,
        }),
      },
    ],
  }),

  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <Problems />
        <Manifesto />
        <HowItWorks />
        <FeaturedMethod />
        <Advisor />
        <Philosophy />
        <Coming />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}
