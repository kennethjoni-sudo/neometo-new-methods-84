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
      type: "point",
      durationMs: 45000,
      instruction:
        "Rest your eyes on the dot. When your attention wanders, bring it back. That's the rep.",
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
