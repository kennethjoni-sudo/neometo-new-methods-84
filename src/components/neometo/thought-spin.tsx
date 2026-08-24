import { MethodExperience, type MethodConfig } from "@/components/neometo/method-engine";

export const thoughtSpinMethod: MethodConfig = {
  label: "Thought Spin method",
  phases: [
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
        { label: "Explore other methods", variant: "outline", action: "scroll-methods" },
      ],
    },
  ],
};

export function ThoughtSpinExperience({ onClose }: { onClose: () => void }) {
  return <MethodExperience config={thoughtSpinMethod} onClose={onClose} />;
}
