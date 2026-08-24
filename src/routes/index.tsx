import { createFileRoute } from "@tanstack/react-router";

import flowArt from "@/assets/neometo-flow.png.asset.json";
import { SiteHeader } from "@/components/neometo/site-header";

import { SiteFooter } from "@/components/neometo/site-footer";
import {
  Advisor,
  Coming,
  Faq,
  FeaturedMethod,
  FinalCta,
  Hero,
  HowItWorks,
  Manifesto,
  Philosophy,
  Problems,
  faq,
} from "@/components/neometo/sections";

const title = "NEOMETO | Practical Methods for Focus, Sleep & Overthinking";
const description =
  "Explore practical, research-informed methods for focus, sleep, and overthinking. Find the method that fits what you're experiencing right now — no diagnosis required.";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "NEOMETO",
  slogan: "New Methods for Modern Minds.",
  description,
  url: "/",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "NEOMETO",
  url: "/",
  description,
};

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
        children: JSON.stringify(organizationSchema),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(websiteSchema),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(faqPageSchema),
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
        <Faq />
        <Coming />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}
