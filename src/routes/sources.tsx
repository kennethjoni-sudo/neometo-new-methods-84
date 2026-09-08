import { createFileRoute, Link } from "@tanstack/react-router";

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
          <Link to="/methods/$slug" params={{ slug: "spin" }} className="font-semibold text-ink hover:text-brand hover:underline">Thought Spin</Link>: our own construction. A
          simple moving visual gives attention something to hold, which makes it harder for a loop
          to keep running. Not a named technique from anywhere.
        </p>
        <p>
          <Link to="/methods/$slug" params={{ slug: "spin" }} className="font-semibold text-ink hover:text-brand hover:underline">Name the thought</Link>: cognitive defusion,
          from Acceptance and Commitment Therapy. Putting &ldquo;I notice I&apos;m having the
          thought that…&rdquo; in front of a thought is the plainest form of it.
        </p>
        <p>
          <Link to="/methods/$slug" params={{ slug: "spin" }} className="font-semibold text-ink hover:text-brand hover:underline">Park it</Link>: worry postponement — naming a
          worry and giving it a scheduled time rather than arguing with it now.
        </p>
      </PageSection>

      <PageSection heading="Sleep">
        <p>
          <Link to="/methods/$slug" params={{ slug: "sleep" }} className="font-semibold text-ink hover:text-brand hover:underline">Racing Thoughts Shuffle</Link>: cognitive
          shuffling. A slow stream of unrelated neutral images is hard to spiral on.
        </p>
        <p>
          <Link to="/methods/$slug" params={{ slug: "sleep" }} className="font-semibold text-ink hover:text-brand hover:underline">4-7-8</Link>: paced breathing with a long
          exhale.
        </p>
        <p>
          <Link to="/methods/$slug" params={{ slug: "sleep" }} className="font-semibold text-ink hover:text-brand hover:underline">Body scan</Link>: a shortened body scan, from
          mindfulness practice.
        </p>
      </PageSection>

      <PageSection heading="Focus">
        <p>
          <Link to="/methods/$slug" params={{ slug: "focus" }} className="font-semibold text-ink hover:text-brand hover:underline">One-Point Anchor</Link>: attention training.
          Rest attention on one object, notice when it wanders, bring it back. The bringing-back is
          the rep.
        </p>
      </PageSection>

      <PageSection heading="Overload">
        <p>
          <Link to="/methods/$slug" params={{ slug: "overload" }} className="font-semibold text-ink hover:text-brand hover:underline">One thing at a time</Link>: narrowing a
          pile-up down to the single next thing.
        </p>
        <p>
          <Link to="/methods/$slug" params={{ slug: "overload" }} className="font-semibold text-ink hover:text-brand hover:underline">Sensory anchor</Link>: 5-4-3-2-1 sensory
          grounding, shortened.
        </p>
      </PageSection>

      <PageSection heading="Social situations">
        <p>
          <Link to="/methods/$slug" params={{ slug: "social" }} className="font-semibold text-ink hover:text-brand hover:underline">Replaying it</Link>: self-distancing.
          Watching a memory from a few feet away rather than from inside it.
        </p>
      </PageSection>

      <PageSection heading="Preparation">
        <p>
          <Link to="/methods/$slug" params={{ slug: "prepare" }} className="font-semibold text-ink hover:text-brand hover:underline">Walk in steadier</Link>: mental rehearsal of
          the first minute.
        </p>
        <p>
          <Link to="/methods/$slug" params={{ slug: "prepare" }} className="font-semibold text-ink hover:text-brand hover:underline">If, then</Link>: implementation intentions —
          deciding a response in advance so you&apos;re not choosing in the moment.
        </p>
      </PageSection>

      <PageSection heading="Getting started">
        <p>
          <Link to="/methods/$slug" params={{ slug: "friction" }} className="font-semibold text-ink hover:text-brand hover:underline">Next Action</Link>: reducing a task to the
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
