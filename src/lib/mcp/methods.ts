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
    slug: "spin",
    name: "Thought Spin",
    duration: "2 minutes",
    promise: "When your thoughts won't slow down.",
    description:
      "Four techniques: a guided spinning visual that interrupts a loop, Name the thought for a little distance, Park it to set a worry down for later, and Shrink it to make a thought smaller and further away.",
    area: "Overthinking",
    steps: [
      "Settle in with slow breaths — out longer than in.",
      "Pick the technique that fits right now.",
      "Let the visual or the words hold your attention.",
      "Notice the distance between you and the thought.",
    ],

  },
  {
    slug: "sleep",
    name: "Sleep",
    duration: "2–3 minutes",
    promise: "Mind still running at 2am?",
    description:
      "Three techniques to choose from: Racing Thoughts Shuffle for a looping mind, 4-7-8 Breathing to slow the body first, and a Body Scan to stop thinking entirely.",
    area: "Sleep",
    steps: [
      "Pick the technique that fits tonight.",
      "Shuffle: picture each unrelated word for a moment, then let it drift.",
      "4-7-8: breathe in 4, hold 7, out 8, four times.",
      "Body scan: soften forehead, jaw, shoulders, and down to your feet.",
    ],
  },
  {
    slug: "focus",
    name: "Focus",
    duration: "90 seconds",
    promise: "Can't hold focus for more than a minute?",
    description:
      "The One-Point Anchor: a couple of settling breaths, then a short attention rep on one small object nearby.",
    area: "Focus",
    steps: [
      "Pick one small object near you.",
      "Rest your eyes on it — shape, edges, color.",
      "When your mind wanders, bring it back to the object.",
      "Notice it again, like it's the first time.",
    ],
  },
  {
    slug: "overload",
    name: "Overload",
    duration: "90 seconds",
    promise: "Everything hitting at once?",
    description:
      "A short breathing and text-guided sequence that narrows a pile-up down to the one thing that actually needs you right now.",
    area: "Overload",
    steps: [
      "Two slow breaths before sorting anything.",
      "Most of it can wait a few minutes. It will still be there.",
      "Ask: what's the one thing that actually needs me right now?",
      "Set everything else down for now — you can pick it back up later.",
    ],
  },
  {
    slug: "social",
    name: "Replaying it",
    duration: "2 minutes",
    promise: "Replaying every conversation afterward?",
    description:
      "A distancing technique for conversations and social situations — watching the moment from a few feet away so the memory settles instead of looping.",
    area: "Social situations",
    steps: [
      "Picture the moment you keep replaying.",
      "Put it on a small screen a few feet in front of you.",
      "Let it play through once, to the end.",
      "The version in your head is a copy, not the moment. Let the copy stop.",
    ],
  },
  {
    slug: "prepare",
    name: "Walk in steadier",
    duration: "2 minutes",
    promise: "Something big coming up?",
    description:
      "A breathing and visualization sequence for preparing before a meeting, event, or conversation — steady, not scripted.",
    area: "Preparation",
    steps: [
      "Three slow breaths to settle the body first.",
      "Picture the first minute — just walking in.",
      "Picture yourself steady. Not perfect. Steady.",
      "You'll respond to what's actually in front of you, not the worst-case version.",
    ],
  },
  {
    slug: "friction",
    name: "Next Action",
    duration: "2 minutes",
    promise: "Can't seem to get started?",
    description:
      "A short breathing and text-guided sequence for breaking the friction at the start of a task — finding the one small physical move that begins it.",
    area: "Getting started",
    steps: [
      "Two slow breaths before deciding anything.",
      "Forget the finished thing for a moment.",
      "Find the smallest physical movement that would start it.",
      "Give yourself permission to stop after five minutes.",
    ],
  },
];

function rankMethods(query: string): Method[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const terms = q.split(/\s+/).filter((t) => t.length > 2);
  const scored = methods.map((method) => {
    const haystack =
      `${method.name} ${method.promise} ${method.description} ${method.area}`.toLowerCase();
    const score = terms.reduce((acc, term) => acc + (haystack.includes(term) ? 1 : 0), 0);
    return { method, score };
  });
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((h) => h.method);
}

export function findMethods(query: string): Method[] {
  const hits = rankMethods(query);
  return hits.length > 0 ? hits : methods;
}

/** Returns a method only when the query genuinely scored a match — never a blind fallback. */
export function matchMethod(query: string): Method | null {
  return rankMethods(query)[0] ?? null;
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
