import {
  MethodExperience,
  type MethodConfig,
  type PhaseConfig,
} from "@/components/neometo/method-engine";

const REHEARSE_PHASES: PhaseConfig[] = [
  {
    type: "begin",
    title: "Walk in steadier",
    subtitle: "Something big coming up?",
    note: "About 2 minutes. Not a script — just a way to steady out before it starts.",
    buttonLabel: "Begin",
  },
  {
    type: "breathe",
    cycles: 3,
    instruction: "Start by settling your body. The mind follows.",
    pattern: [
      { label: "Breathe in", ms: 4000 },
      { label: "Hold", ms: 3000 },
      { label: "Breathe out", ms: 7000 },
    ],
  },
  {
    type: "text-sequence",
    prompts: [
      "You've already prepared more than you're giving yourself credit for.",
      "Picture the first minute — just walking in, nothing else.",
      "Picture yourself steady. Not perfect. Steady.",
      "Whatever happens, you'll respond to what's actually in front of you.",
      "Not the worst-case version in your head. The real one.",
      "You've walked into hard things before this one.",
      "You're allowed to walk in and just begin.",
    ],
    stepMs: 7500,
    instruction: "Let each line settle before moving to the next.",
    counterPrefix: "Step",
    size: "md",
  },
  {
    type: "close",
    heading: "That's the preparation. The rest is just showing up.",
    subheading: "Come back to this right before you walk in, if it helps.",
    actions: [
      { label: "Do it again", action: "restart" },
      { label: "Explore other methods", variant: "outline", action: "scroll-methods" },
    ],
  },
];

const IFTHEN_PHASES: PhaseConfig[] = [
  {
    type: "begin",
    title: "If, Then",
    subtitle: "Worried about how you'll react?",
    note: "About 2 minutes. We'll pick one likely moment and decide your response now, so you don't have to decide it live.",
    buttonLabel: "Begin",
  },
  {
    type: "breathe",
    cycles: 2,
    instruction: "Two breaths before we plan.",
    pattern: [
      { label: "Breathe in", ms: 4000 },
      { label: "Breathe out", ms: 6000 },
    ],
  },
  {
    type: "text-sequence",
    stepMs: 8000,
    instruction: "Take your time with each line.",
    counterPrefix: "Step",
    size: "md",
    prompts: [
      "Picture the moment you're least looking forward to.",
      "Name it plainly. 'If they ask about the delay.'",
      "Now decide what you'll do. 'Then I take one breath and answer the question that was asked.'",
      "Say the whole thing to yourself once: if that, then this.",
      "Now it's decided. You won't be choosing in the moment.",
    ],
  },
  {
    type: "close",
    heading: "You've already decided.",
    subheading: "One less thing to work out while it's happening.",
    actions: [
      { label: "Close", action: "close" },
      { label: "Try another technique", variant: "outline", action: "select" },
    ],
  },
];

export const prepareMethod: MethodConfig = {
  label: "Preparation method",
  selector: {
    title: "Preparation",
    subtitle: "Something coming up? Try one of these.",
    techniques: [
      {
        id: "rehearse",
        title: "Walk in steadier",
        meta: "Picture the first minute before you're in it.",
        phases: REHEARSE_PHASES,
      },
      {
        id: "ifthen",
        title: "If, then",
        meta: "Decide your response before you need it.",
        phases: IFTHEN_PHASES,
      },
    ],
  },
};

export function PrepareExperience({ onClose }: { onClose: () => void }) {
  return <MethodExperience config={prepareMethod} onClose={onClose} />;
}
