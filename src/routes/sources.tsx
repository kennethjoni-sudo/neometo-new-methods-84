import { createFileRoute } from "@tanstack/react-router";

import { PageSection, PageShell } from "@/components/neometo/page-shell";

const title = "Where the methods come from | NEOMETO";
const description =
  "Every NEOMETO method names the practice it's adapted from — and what we don't claim about it.";

export const Route = createFileRoute("/sources")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/sources" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/sources" }],
  }),
  component: SourcesPage,
});

function SourcesPage() {
  return (
    <PageShell
      eyebrow="Sources"
      title="Where the methods come from."
      lead="Every method here is adapted from a practice that already existed. This page says which one, in plain language. It does not say that any of them will work for you — nobody can tell you that in advance."
      closingLine="Naming where something comes from is not the same as claiming it's proven."
    >
      <PageSection heading="Thoughts">
        <p>
          <strong className="font-semibold text-ink">Thought Spin:</strong> our own construction. A
          simple moving visual gives attention something to hold, which makes it harder for a loop
          to keep running. Not a named technique from anywhere.
        </p>
        <p>
          <strong className="font-semibold text-ink">Name the thought:</strong> cognitive defusion,
          from Acceptance and Commitment Therapy. Putting &ldquo;I notice I&apos;m having the
          thought that…&rdquo; in front of a thought is the plainest form of it.
        </p>
        <p>
          <strong className="font-semibold text-ink">Park it:</strong> worry postponement — naming a
          worry and giving it a scheduled time rather than arguing with it now.
        </p>
      </PageSection>

      <PageSection heading="Sleep">
        <p>
          <strong className="font-semibold text-ink">Racing Thoughts Shuffle:</strong> cognitive
          shuffling. A slow stream of unrelated neutral images is hard to spiral on.
        </p>
        <p>
          <strong className="font-semibold text-ink">4-7-8:</strong> paced breathing with a long
          exhale.
        </p>
        <p>
          <strong className="font-semibold text-ink">Body scan:</strong> a shortened body scan, from
          mindfulness practice.
        </p>
      </PageSection>

      <PageSection heading="Focus">
        <p>
          <strong className="font-semibold text-ink">One-Point Anchor:</strong> attention training.
          Rest attention on one object, notice when it wanders, bring it back. The bringing-back is
          the rep.
        </p>
      </PageSection>

      <PageSection heading="Overload">
        <p>
          <strong className="font-semibold text-ink">One thing at a time:</strong> narrowing a
          pile-up down to the single next thing.
        </p>
        <p>
          <strong className="font-semibold text-ink">Sensory anchor:</strong> 5-4-3-2-1 sensory
          grounding, shortened.
        </p>
      </PageSection>

      <PageSection heading="Social situations">
        <p>
          <strong className="font-semibold text-ink">Replaying it:</strong> self-distancing.
          Watching a memory from a few feet away rather than from inside it.
        </p>
      </PageSection>

      <PageSection heading="Preparation">
        <p>
          <strong className="font-semibold text-ink">Walk in steadier:</strong> mental rehearsal of
          the first minute.
        </p>
        <p>
          <strong className="font-semibold text-ink">If, then:</strong> implementation intentions —
          deciding a response in advance so you&apos;re not choosing in the moment.
        </p>
      </PageSection>

      <PageSection heading="Getting started">
        <p>
          <strong className="font-semibold text-ink">Next Action:</strong> reducing a task to the
          smallest physical move, plus a five-minute limit so starting costs less.
        </p>
      </PageSection>

      <PageSection heading="What we don't claim">
        <p>
          We don&apos;t claim any of these are proven to work for you. We haven&apos;t run trials,
          we don&apos;t cite studies to imply we have, and we don&apos;t quote numbers we can&apos;t
          stand behind.
        </p>
        <p>
          We&apos;ve shortened and reworded every one of these. The adaptation is ours. Anyone who
          developed the underlying practice hasn&apos;t endorsed what we did with it.
        </p>
        <p>
          What we can tell you: each one takes two minutes, costs nothing, and you&apos;ll know
          quickly whether it does something for you.
        </p>
      </PageSection>
    </PageShell>
  );
}
