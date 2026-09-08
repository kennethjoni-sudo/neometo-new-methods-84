import {
  MethodExperience,
  type MethodConfig,
} from "@/components/neometo/method-engine";

export const frictionMethod: MethodConfig = {
  label: "Friction method",
  phases: [
    {
      type: "begin",
      title: "Next Action",
      subtitle: "Can't seem to get started?",
      note: "About 2 minutes. We aren't finishing the task right now — we're just breaking the first bit of friction.",
      buttonLabel: "Begin",
    },
    {
      type: "breathe",
      cycles: 2,
      instruction: "A quick reset before we break the task down.",
      pattern: [
        { label: "Breathe in", ms: 4000 },
        { label: "Breathe out", ms: 4000 },
      ],
    },
    {
      type: "text-sequence",
      prompts: [
        "Forget the finished thing for a moment.",
        "What's the smallest physical movement you'd have to make to start?",
        "Not 'write the report'. Just 'open the document'.",
        "Give yourself permission to stop after five minutes.",
        "Five minutes is usually enough to break the friction.",
      ],
      stepMs: 7000,
      instruction: "Take your time with each line.",
      counterPrefix: "Step",
      size: "md",
    },
    {
      type: "close",
      heading: "Do the small thing now.",
      subheading: "Decide in five minutes whether you want to keep going.",
      actions: [
        { label: "Start the five minutes", action: "close" },
        { label: "Explore other methods", variant: "outline", action: "scroll-methods" },
      ],
    },
  ],
};

export function FrictionExperience({ onClose }: { onClose: () => void }) {
  return <MethodExperience config={frictionMethod} onClose={onClose} />;
}
