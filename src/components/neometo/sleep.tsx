import {
  MethodExperience,
  type MethodConfig,
  type PhaseConfig,
} from "@/components/neometo/method-engine";

const CLOSE: PhaseConfig = {
  type: "close",
  heading: "However far that got you, that's enough for tonight.",
  actions: [
    { label: "Try another technique", action: "select" },
    { label: "Done", variant: "outline", action: "close" },
  ],
};

const WORDS = [
  "lantern",
  "river stone",
  "paper boat",
  "wool blanket",
  "garden gate",
  "tin cup",
  "pine cone",
  "linen curtain",
  "wooden spoon",
  "gravel path",
  "brass key",
  "clay pot",
  "cotton thread",
  "harbour rope",
];

const BODY_STEPS = [
  "Notice your forehead. Let it soften.",
  "Notice your jaw. Let it unclench.",
  "Notice your shoulders. Let them drop.",
  "Notice your chest. Let the breath move it slowly.",
  "Notice your arms. Let them get heavy.",
  "Notice your hands. Let the fingers uncurl.",
  "Notice your stomach. Let it settle.",
  "Notice your legs. Let them sink into the bed.",
  "Notice your feet. Let them go completely.",
];

export const sleepMethod: MethodConfig = {
  label: "Sleep method",
  selector: {
    title: "Sleep",
    subtitle: "Mind still running at 2am? Try one of these.",
    techniques: [
      {
        id: "shuffle",
        title: "Racing Thoughts Shuffle",
        meta: "2 minutes · when your mind won't stop looping",
        phases: [
          {
            type: "text-sequence",
            prompts: WORDS,
            stepMs: 3500,
            instruction:
              "Just picture each word for a moment. Don't force it — let your mind drift to the next one.",
            size: "lg",
          },
          CLOSE,
        ],
      },
      {
        id: "breathing",
        title: "4-7-8 Breathing",
        meta: "2 minutes · when you need your body to slow down first",
        phases: [
          {
            type: "breathe",
            cycles: 4,
            instruction: "Breathe with the circle. Out longer than in — that's what settles you.",
            pattern: [
              { label: "Breathe in", ms: 4000 },
              { label: "Hold", ms: 7000 },
              { label: "Breathe out", ms: 8000 },
            ],
          },
          CLOSE,
        ],
      },
      {
        id: "bodyscan",
        title: "Body Scan",
        meta: "3 minutes · when you want to stop thinking entirely",
        phases: [
          {
            type: "text-sequence",
            prompts: BODY_STEPS,
            stepMs: 13_000,
            instruction:
              "Move through your body one part at a time. Let each one go as you reach it.",
            counterPrefix: "Step",
            visual: "ring",
            size: "md",
          },
          CLOSE,
        ],
      },
    ],
  },
};

export function SleepExperience({ onClose }: { onClose: () => void }) {
  return <MethodExperience config={sleepMethod} onClose={onClose} />;
}
