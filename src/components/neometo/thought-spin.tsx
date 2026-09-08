import {
  MethodExperience,
  type MethodConfig,
  type PhaseConfig,
} from "@/components/neometo/method-engine";

const SPIN_PHASES: PhaseConfig[] = [
  {
    type: "begin",
    title: "Thought Spin",
    subtitle: "When your thoughts won't slow down.",
    note: "About 2 minutes. Find a quiet moment.",
  },
  {
    type: "breathe",
    cycles: 4,
    pattern: [
      { label: "Breathe in", ms: 4000 },
      { label: "Hold", ms: 2000 },
      { label: "Breathe out", ms: 6000 },
    ],
  },
  { type: "spin", durationMs: 75_000 },
  {
    type: "close",
    heading: "Notice how still it feels.",
    subheading: "That's the distance you were looking for.",
    actions: [
      { label: "Do it again", action: "restart" },
      { label: "Try another technique", variant: "outline", action: "select" },
    ],
  },
];

const NAME_PHASES: PhaseConfig[] = [
  {
    type: "begin",
    title: "Create Distance",
    subtitle: "Thoughts stuck on a loop?",
    note: "About 2 minutes. We won't argue with the thought. We'll just move it slightly further away.",
    buttonLabel: "Begin",
  },
  {
    type: "breathe",
    cycles: 3,
    instruction: "A few breaths to settle first.",
    pattern: [
      { label: "Breathe in", ms: 4000 },
      { label: "Hold", ms: 2000 },
      { label: "Breathe out", ms: 6000 },
    ],
  },
  {
    type: "words",
    stepMs: 7500,
    lines: [
      "Find the thought taking up the most space right now.",
      "Say it to yourself silently.",
      "Now put this phrase in front of it:",
      "'I notice I'm having the thought that…'",
      "Notice how the sentence creates a small gap.",
      "You are not the thought. You're the one noticing it.",
    ],
  },

  {
    type: "close",
    heading: "Thoughts are mental events.",
    subheading: "You don't have to act on all of them.",
    actions: [
      { label: "Close", action: "close" },
      { label: "Explore other methods", variant: "outline", action: "scroll-methods" },
    ],
  },
];

const PARK_PHASES: PhaseConfig[] = [
  {
    type: "begin",
    title: "Park It",
    subtitle: "Same worry, on repeat?",
    note: "About 2 minutes. We're not solving it now. We're setting a time to come back to it.",
    buttonLabel: "Begin",
  },
  {
    type: "breathe",
    cycles: 2,
    instruction: "Two breaths before we set it down.",
    pattern: [
      { label: "Breathe in", ms: 4000 },
      { label: "Breathe out", ms: 6000 },
    ],
  },
  {
    type: "text-sequence",
    stepMs: 7500,
    instruction: "Take your time with each line.",
    counterPrefix: "Step",
    size: "md",
    prompts: [
      "Name the worry in a few words. Just the headline.",
      "Ask: is there anything I can actually do about it in the next hour?",
      "If there is, do that one thing when this finishes.",
      "If there isn't, it doesn't need you right now.",
      "Pick a time later today when you'll give it your full attention.",
      "Until then, it's parked. It'll keep.",
    ],
  },
  {
    type: "close",
    heading: "It's parked, not ignored.",
    subheading: "You've given it a time. Go back to what you were doing.",
    actions: [
      { label: "Back to it", action: "close" },
      { label: "Try another technique", variant: "outline", action: "select" },
    ],
  },
];

const SHRINK_PHASES: PhaseConfig[] = [
  {
    type: "begin",
    title: "Shrink It",
    subtitle: "One thought taking up the whole frame?",
    note: "About 2 minutes. We're not arguing with the thought. We're changing how big it gets to be.",
    buttonLabel: "Begin",
  },
  {
    type: "breathe",
    cycles: 2,
    instruction: "Two breaths first.",
    pattern: [
      { label: "Breathe in", ms: 4000 },
      { label: "Breathe out", ms: 6000 },
    ],
  },
  {
    type: "shrink",
    durationMs: 45000,
    captions: [
      "Put the thought in front of you, as a picture.",
      "Notice how big it is. How close.",
      "Now let it move back.",
      "Smaller. Further away.",
      "Let the colour drain out of it.",
      "It's still there. It just isn't filling the frame.",
    ],
  },
  {
    type: "close",
    heading: "Same thought. Less space.",
    subheading: "You changed the size of it, not the truth of it.",
    actions: [
      { label: "Close", action: "close" },
      { label: "Try another technique", variant: "outline", action: "select" },
    ],
  },
];



export const thoughtSpinMethod: MethodConfig = {
  label: "Thought Spin method",
  selector: {
    title: "Overthinking",
    subtitle: "Thoughts won't stop spinning? Try one of these.",
    techniques: [
      {
        id: "spin",
        title: "Thought Spin",
        meta: "A spinning visual that interrupts the loop.",
        phases: SPIN_PHASES,
      },
      {
        id: "name",
        title: "Name the thought",
        meta: "Put a little distance between you and it.",
        phases: NAME_PHASES,
      },
      {
        id: "park",
        title: "Park it",
        meta: "Set it down and come back to it later.",
        phases: PARK_PHASES,
      },
      {
        id: "shrink",
        title: "Shrink it",
        meta: "Make it smaller, further away, easier to put down.",
        phases: SHRINK_PHASES,
      },
    ],

  },
};

export function ThoughtSpinExperience({ onClose }: { onClose: () => void }) {
  return <MethodExperience config={thoughtSpinMethod} onClose={onClose} />;
}
