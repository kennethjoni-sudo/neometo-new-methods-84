import { createFileRoute, Link } from "@tanstack/react-router";

import flowArt from "@/assets/neometo-flow.png.asset.json";
import { SiteHeader } from "@/components/neometo/site-header";
import { Button } from "@/components/ui/button";

import { SiteFooter } from "@/components/neometo/site-footer";
import {
  FeaturedMethod,
  FinalCta,
  Hero,
  HowItWorks,
  Problems,
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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://neometo.lovable.app/" },
      { property: "og:image", content: `https://neometo.lovable.app${flowArt.url}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `https://neometo.lovable.app${flowArt.url}` },
    ],
    links: [{ rel: "canonical", href: "https://neometo.lovable.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(organizationSchema),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(websiteSchema),
      },
    ],
  }),

  component: Index,
});

const trustItems = [
  "No account. Nothing to sign up for.",
  "Nothing stored that identifies you.",
  "Free. No subscription, no upsell.",
  "Not therapy, not a medical product.",
];

function TrustStrip() {
  return (
    <section className="bg-background pb-4 pt-2 md:pb-8 md:pt-6">
      <div className="section-shell">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-ink md:flex md:items-center md:justify-between md:gap-8">
          {trustItems.map((item) => (
            <li key={item} className="leading-snug">
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          <Link to="/sources" className="underline underline-offset-4 hover:text-brand">
            How each method was made
          </Link>
          , and what we don&apos;t claim.
        </p>
      </div>
    </section>
  );
}

function PhilosophyTeaser() {
  return (
    <section id="philosophy" className="bg-ink py-16 text-background md:py-32">
      <div className="section-shell">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-[2rem] font-bold leading-[1.1] sm:text-4xl">
            Your mind is a skill. Not a diagnosis.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-background/70">
            You train a skill. You don't diagnose it. Every method here is short enough to run in
            the moment it's built for, and ends pointing at something you can actually do next.
          </p>
          <Button asChild variant="secondary" className="mt-10 rounded-full px-6">
            <Link to="/philosophy">Read the philosophy</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function ResultStatement() {
  return (
    <section className="bg-ink py-20 text-background md:py-32">
      <div className="section-shell text-center">
        <h2 className="mx-auto max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
          Don&apos;t trust our words. Trust the result.
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-background/70 md:text-xl">
          Run one. You&apos;ll know inside two minutes.
        </p>
      </div>
    </section>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <Problems />
        <TrustStrip />
        <HowItWorks />
        <ResultStatement />
        <FeaturedMethod />
        <PhilosophyTeaser />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}

