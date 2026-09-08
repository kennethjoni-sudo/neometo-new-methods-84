import { createFileRoute } from "@tanstack/react-router";

import { PagePlaceholder, PageSection, PageShell } from "@/components/neometo/page-shell";

const title = "About NEOMETO | Short, Guided Methods for Modern Minds";
const description =
  "NEOMETO is a library of short, guided methods for specific mental moments. No labels, no programs, no account. Here's what it is and how it's built.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://neometo.lovable.app/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell
      eyebrow="About"
      title="What NEOMETO is."
      lead="A library of short, guided methods for specific mental moments — the ten minutes before a meeting, the hour you can't get started, the night your head won't slow down."
    >
      <PageSection heading="How it works in practice">
        <p>
          Each method takes a few minutes. You pick the moment you're in, you run it, you get on
          with your day. Nothing to read first, no program to commit to, no account.
        </p>
      </PageSection>

      <PageSection heading="Why it exists">
        <p>
          Most tools ask you to identify as something before they'll help you. Pick a category, take
          the assessment, get sorted — then get the exercise. NEOMETO skips that step. You don't
          need a label to use a method that works.
        </p>
      </PageSection>

      <PageSection heading="You don't always need another explanation">
        <p>
          NEOMETO explores practical methods for focus, sleep, and mental clarity — from cognitive
          and behavioural techniques to guided visualization. We explain how each method works and
          when it might be worth trying.
        </p>
        <p>
          Useful methods already exist across psychology, research, coaching, neuroscience and
          lived experience. The hard part is finding the right one when you actually need it.
        </p>
        <p>NEOMETO brings them together and makes them simple to find and use.</p>
      </PageSection>

      <PageSection heading="How the methods are built">
        <p>
          Every method follows the same four-part shape: begin, breathe, a short sequence of
          prompts, close. The structure is identical every time, so the method itself never gets in
          the way — you're not learning an interface, you're running a rep.
        </p>
        <p>
          New methods get added when they earn it. Short enough to actually use. Clear enough to
          follow without instructions. And doing something the library doesn't already do.
        </p>
      </PageSection>

      <PageSection heading="Who's behind it">
        <PagePlaceholder>
          PLACEHOLDER — Kenneth, write three or four sentences here. What made you build it, what
          you were doing before, and why you've kept it this small. First person reads better than a
          company voice, and it's the part of this page people will actually remember.
        </PagePlaceholder>
      </PageSection>

      <PageSection heading="What it isn't">
        <p>
          Not therapy. Not a medical product. Not a meditation app. These are training methods — use
          them the way you'd use a warm-up.
        </p>
      </PageSection>
    </PageShell>
  );
}
