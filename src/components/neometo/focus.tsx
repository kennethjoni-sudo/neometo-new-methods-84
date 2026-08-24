import { MethodExperience, type MethodConfig } from "@/components/neometo/method-engine";

export const focusMethod: MethodConfig = {
  label: "Focus method",
  phases: [
    {
      type: "begin",
      title: "Focus",
      subtitle: "Can't hold focus for more than a minute?",
      note: "About 90 seconds. Have something small nearby to look at — a pen, a mug, anything within reach.",
      buttonLabel: "Begin",
    },
    {
      type: "breathe",
      cycles: 2,
      instruction: "Settle in with a few breaths before the exercise starts.",
      pattern: [
        { label: "Breathe in", ms: 4000 },
        { label: "Hold", ms: 2000 },
        { label: "Breathe out", ms: 6000 },
      ],
    },
    {
      type: "text-sequence",
      prompts: [
        "Pick one small object near you.",
        "Rest your eyes on it. Just look.",
        "Notice its shape, its edges, its color.",
        "Your mind will wander. That's normal.",
        "When it does, gently bring it back to the object.",
        "Notice it again, like it's the first time.",
        "That's the whole skill.",
      ],
      stepMs: 7000,
      instruction: "Follow each line. Don't rush it.",
      counterPrefix: "Step",
      size: "md",
    },
    {
      type: "close",
      heading: "That's the rep.",
      subheading: "Attention is a muscle. This is how you train it.",
      actions: [
        { label: "Do it again", action: "restart" },
        { label: "Explore other methods", variant: "outline", action: "scroll-methods" },
      ],
    },
  ],
};

export function FocusExperience({ onClose }: { onClose: () => void }) {
  return <MethodExperience config={focusMethod} onClose={onClose} />;
}
