import {
  MethodExperience,
  type MethodConfig,
} from "@/components/neometo/method-engine";

export const overloadMethod: MethodConfig = {
  label: "Overload method",
  phases: [
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
  ],
};

export function OverloadExperience({ onClose }: { onClose: () => void }) {
  return <MethodExperience config={overloadMethod} onClose={onClose} />;
}
