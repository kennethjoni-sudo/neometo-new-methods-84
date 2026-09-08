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
    heading: "One thing at a time. That's the whole method.",
    subheading: "When it piles up again, come back and do this in 90 seconds.",
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
    note: "About 2 minutes. A quick reset to gather your attention in one place.",
    buttonLabel: "Begin",
  },
  {
    type: "breathe",
    cycles: 3,
    instruction: "Let's find a steady rhythm first.",
    pattern: [
      { label: "Breathe in", ms: 4000 },
      { label: "Hold", ms: 4000 },
      { label: "Breathe out", ms: 4000 },
    ],
  },
  {
    type: "text-sequence",
    stepMs: 7500,
    instruction: "Follow each one at your own pace.",
    counterPrefix: "Step",
    size: "md",
    prompts: [
      "Look up from your screen.",
      "Find five neutral things you can see.",
      "Notice three things you can feel. The chair, the floor, your sleeves.",
      "Listen for two sounds in the background.",
      "You're in the room now, not in your head.",
    ],
  },
  {
    type: "close",
    heading: "One thing at a time.",
    subheading: "The overview comes back when the pace drops.",
    actions: [
      { label: "Back to work", action: "close" },
      { label: "Try another technique", variant: "outline", action: "select" },
    ],
  },
];

export const overloadMethod: MethodConfig = {
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
