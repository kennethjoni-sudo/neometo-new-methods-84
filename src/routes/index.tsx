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

const description =
  "NEOMETO brings practical methods together for overthinking, sleep, focus and overload. Start with what you want to get better at, find a method, try it now. No label required.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NEOMETO — New Methods for Modern Minds" },
      { name: "description", content: description },
      { property: "og:title", content: "NEOMETO — New Methods for Modern Minds" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
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
