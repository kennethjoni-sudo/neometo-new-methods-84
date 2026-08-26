import {
  MethodExperience,
  type MethodConfig,
} from "@/components/neometo/method-engine";

export const prepareMethod: MethodConfig = {
  label: "Preparation method",
  phases: [
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
        "You've handled hard things before this one.",
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
  ],
};

export function PrepareExperience({ onClose }: { onClose: () => void }) {
  return <MethodExperience config={prepareMethod} onClose={onClose} />;
}
