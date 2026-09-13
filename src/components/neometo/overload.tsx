import {
  MethodExperience,
  type MethodConfig,
  type PhaseConfig,
} from "@/components/neometo/method-engine";

const NARROW_PHASES: PhaseConfig[] = [
  {
    type: "begin",
    title: "Overload",
    subtitle: "Everything hitting at once?",
    note: "About 90 seconds. We're not solving everything right now — just getting it down to one thing.",
    buttonLabel: "Begin",
  },
  {
    type: "breathe",
    cycles: 2,
    instruction: "A couple of slow breaths first, before we sort anything.",
    pattern: [
      { label: "Breathe in", ms: 4000 },
      { label: "Hold", ms: 2000 },
      { label: "Breathe out", ms: 6000 },
    ],
  },
  {
    type: "text-sequence",
    prompts: [
      "You don't need to hold all of it right now.",
      "Most of it can wait a few minutes. It will still be there.",
      "Ask yourself: what's the one thing that actually needs me right now?",
      "Not the loudest thing. The one thing.",
      "Everything else — set it down for now.",
      "You can pick it back up later. It's not going anywhere.",
      "Right now, there's just one thing.",
    ],
    stepMs: 7000,
    instruction: "Read each line slowly. Let the rest fall away.",
    counterPrefix: "Step",
    size: "md",
  },
  {
    type: "close",
    heading: "One thing. Then the next one.",
    subheading: "The pile is the same size. You just aren't staring at it anymore.",
    actions: [
      { label: "Do it again", action: "restart" },
      { label: "Explore other methods", variant: "outline", action: "scroll-methods" },
    ],
  },
];

const ANCHOR_PHASES: PhaseConfig[] = [
  {
    type: "begin",
    title: "Sensory Anchor",
    subtitle: "Everything hitting at once?",
    note: "No breathing first. Straight into the room.",
    buttonLabel: "Begin",
  },
  {
    type: "tap-count",
    rounds: [
      { prompt: "Five things you can see", count: 5 },
      { prompt: "Three things you can feel", count: 3 },
      { prompt: "Two things you can hear", count: 2 },
    ],
  },

  {
    type: "close",
    heading: "You're in the room now.",
    subheading: "Pick the one thing that actually needs you and start there.",
    actions: [
      { label: "Back to work", action: "close" },
      { label: "Try another technique", variant: "outline", action: "select" },
    ],
  },
];

export const overloadMethod: MethodConfig = {
  slug: "overload",
  label: "Overload method",
  selector: {
    title: "Overload",
    subtitle: "Everything at once? Try one of these.",
    techniques: [
      {
        id: "narrow",
        title: "One thing at a time",
        meta: "Narrow it down to what actually needs you.",
        phases: NARROW_PHASES,
      },
      {
        id: "anchor",
        title: "Sensory anchor",
        meta: "Get out of your head and into the room.",
        phases: ANCHOR_PHASES,
      },
    ],
  },
};

export function OverloadExperience({ onClose }: { onClose: () => void }) {
  return <MethodExperience config={overloadMethod} onClose={onClose} />;
}
