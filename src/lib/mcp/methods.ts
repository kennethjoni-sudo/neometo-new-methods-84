import { z } from "zod";

export type Method = {
  slug: string;
  name: string;
  duration: string;
  promise: string;
  description: string;
  area: string;
  steps: string[];
};

export const methods: Method[] = [
  {
    slug: "thought-spin",
    name: "Thought Spin",
    duration: "2–3 minutes",
    promise: "When your thoughts won't slow down.",
    description:
      "A short guided visualization designed to interrupt repetitive thinking and create mental distance.",
    area: "Thoughts",
    steps: [
      "Picture the thought as a spinning shape a short distance in front of you.",
      "Let it keep spinning. Do not argue with it, do not push it away.",
      "Slow the spin in your mind, one turn at a time, until it drifts.",
      "Notice the gap between you and the shape. Stay there for three breaths.",
    ],
  },
  {
    slug: "wind-down-count",
    name: "Wind-Down Count",
    duration: "2 minutes",
    promise: "When your mind is still running at 2am.",
    description:
      "A counting pattern that gives the mind a low-effort task so it stops reaching for tomorrow.",
    area: "Sleep",
    steps: [
      "Breathe out longer than you breathe in.",
      "Count backwards from 100, skipping every third number.",
      "If you lose the thread, start again from 100 without judging it.",
    ],
  },
  {
    slug: "one-minute-lock",
    name: "One-Minute Lock",
    duration: "1 minute",
    promise: "When focus keeps slipping after a few seconds.",
    description: "A very short commitment window that makes starting cheaper than avoiding.",
    area: "Focus",
    steps: [
      "Name the single next action out loud, in five words or fewer.",
      "Set one minute. Work only on that action.",
      "When the minute ends, decide freely whether to continue.",
    ],
  },
  {
    slug: "single-lane",
    name: "Single Lane",
    duration: "3 minutes",
    promise: "When everything is hitting at once.",
    description: "A quick sorting method that reduces a pile-up to one thing at a time.",
    area: "Overload",
    steps: [
      "Write down everything currently pulling at you, in any order.",
      "Mark only what changes if it is not handled today.",
      "Pick one. Put the rest in a named list you will reopen later.",
    ],
  },
  {
    slug: "after-replay",
    name: "After Replay",
    duration: "2 minutes",
    promise: "When you keep replaying conversations afterward.",
    description:
      "A structured way to close a conversation loop instead of running it again from the start.",
    area: "Communication",
    steps: [
      "Write one sentence on what actually happened, with no interpretation.",
      "Write one sentence on what you would do differently, if anything.",
      "Close the note. The loop is filed, not open.",
    ],
  },
  {
    slug: "steady-entry",
    name: "Steady Entry",
    duration: "3 minutes",
    promise: "When something big is coming up.",
    description: "A short preparation pattern used shortly before the moment that matters.",
    area: "Preparation",
    steps: [
      "Decide the first ten seconds: where you stand, what you say first.",
      "Decide what a good-enough outcome looks like.",
      "Slow your exhale for one minute, then walk in.",
    ],
  },
];

export function findMethods(query: string): Method[] {
  const q = query.toLowerCase().trim();
  if (!q) return methods;
  const terms = q.split(/\s+/).filter((t) => t.length > 2);
  const scored = methods.map((method) => {
    const haystack =
      `${method.name} ${method.promise} ${method.description} ${method.area}`.toLowerCase();
    const score = terms.reduce((acc, term) => acc + (haystack.includes(term) ? 1 : 0), 0);
    return { method, score };
  });
  const hits = scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score);
  return hits.length > 0 ? hits.map((h) => h.method) : methods;
}


export const methodSummarySchema = z.object({
  slug: z.string(),
  name: z.string(),
  area: z.string(),
  duration: z.string(),
  promise: z.string(),
});

export const methodSchema = methodSummarySchema.extend({
  description: z.string(),
  steps: z.array(z.string()),
});
