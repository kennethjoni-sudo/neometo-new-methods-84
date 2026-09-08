import { createFileRoute } from "@tanstack/react-router";

import { PageSection, PageShell } from "@/components/neometo/page-shell";

const title = "Philosophy | Your Mind Is a Skill — NEOMETO";
const description =
  "Why NEOMETO treats focus, sleep and overthinking as trainable skills, and why every method ends pointing at an action instead of stopping at calm.";

export const Route = createFileRoute("/philosophy")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://neometo.lovable.app/philosophy" }],
  }),
  component: PhilosophyPage,
});

function PhilosophyPage() {
  return (
    <PageShell
      eyebrow="Philosophy"
      title="Your mind is a skill."
      lead="You train a skill. You don't diagnose it. Everything on this site starts from that."
      closingLine="A method you'll actually run beats a better one you won't."
    >
      <PageSection heading="A method beats another explanation">
        <p>
          Understanding why your attention scatters is interesting. It is not the same as getting
          your attention back. NEOMETO is built for the second one — the few minutes where something
          needs to shift now, not the long read about what it means.
        </p>
      </PageSection>

      <PageSection heading="You don't need a label to use a good method">
        <p>
          Methods work whether or not anyone has ever given you a name for how your mind runs.
          Diagnosed, undiagnosed, neurotypical, neurodivergent, or just having a heavy week — the
          method doesn't ask, and it doesn't need to.
        </p>
      </PageSection>

      <PageSection heading="Train it like a muscle">
        <p>
          Nobody expects one session at the gym to change anything. Same here. A method is a rep.
          You run it in the moment it's built for, you notice what it did, you keep the ones that
          earn a place and drop the rest.
        </p>
        <p>
          The point isn't to learn all of them. It's to end up with the four or five that are yours.
        </p>
      </PageSection>

      <PageSection heading="Calm is not the finish line">
        <p>
          Getting good at settling yourself down and then still not doing the thing is just a more
          sophisticated way of avoiding it. Every method here ends pointing at something concrete —
          the next physical step, the one sentence, the door you walk through. Settling is the
          setup, not the result.
        </p>
      </PageSection>

      <PageSection heading="Short, on purpose">
        <p>
          Two minutes, no setup, no account, nothing to prepare. Length is not a measure of
          seriousness, and a method that needs a quiet room and twenty free minutes is a method
          you'll skip on the day you needed it.
        </p>
      </PageSection>
    </PageShell>
  );
}
