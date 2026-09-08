import {
  MethodExperience,
  type MethodConfig,
  type PhaseConfig,
} from "@/components/neometo/method-engine";

const SPIN_PHASES: PhaseConfig[] = [
  {
    type: "begin",
    title: "Spin It Out",
    subtitle: "Feeling stuck on a loop?",
    note: "About 2 minutes. We're not slowing the loop down. We're turning it around.",
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
  {
    type: "text-sequence",
    stepMs: 7000,
    instruction: "Take your time with each line.",
    counterPrefix: "Step",
    size: "md",
    prompts: [
      "Find where the feeling actually sits. Chest, stomach, throat, jaw.",
      "Notice that it moves. Most feelings turn, drift or pulse.",
      "Which way does it go? Pick a direction, even if you're guessing.",
      "Now lift it out and hold it in front of you.",
      "Turn it the other way.",
    ],
  },
  { type: "spin", durationMs: 75_000, reverseAt: 0.45 },
  {
    type: "close",
    heading: "You turned it around.",
    subheading: "Same feeling, running the other way.",
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
    title: "Step Back",
    subtitle: "One thing filling the whole frame?",
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
    durationMs: 66000,
    stages: [
      {
        caption: "Put it in front of you, as a picture.",
        scale: 1,
        opacity: 0.95,
        saturation: 100,
        blur: 0,
        texture: "solid",
      },
      {
        caption: "Notice how big it is. How close.",
        scale: 0.95,
        opacity: 0.95,
        saturation: 100,
        blur: 0,
        texture: "solid",
      },
      {
        caption: "Let the colour drain out of it.",
        scale: 0.8,
        opacity: 0.85,
        saturation: 15,
        blur: 1,
        texture: "solid",
      },
      {
        caption: "Change what it's made of. Rough, not smooth.",
        scale: 0.65,
        opacity: 0.7,
        saturation: 10,
        blur: 1.5,
        texture: "grain",
      },
      {
        caption: "Now step back, so you can see yourself looking at it.",
        scale: 0.45,
        opacity: 0.55,
        saturation: 5,
        blur: 2.5,
        texture: "outline",
      },
      {
        caption: "Further. You're watching someone watch a picture.",
        scale: 0.3,
        opacity: 0.4,
        saturation: 0,
        blur: 3.5,
        texture: "outline",
      },
      {
        caption: "Further still. A room, a building, a city below you.",
        scale: 0.18,
        opacity: 0.28,
        saturation: 0,
        blur: 4.5,
        texture: "outline",
      },
      {
        caption: "From out here it's one small thing on a very large planet.",
        scale: 0.08,
        opacity: 0.18,
        saturation: 0,
        blur: 5.5,
        texture: "outline",
      },
    ],
  },
  {
    type: "close",
    heading: "Same thing. Different distance.",
    subheading: "You didn't change what happened. You changed where you're standing.",
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
        title: "Spin it out",
        meta: "Find the turning, then turn it the other way.",
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
        title: "Step back",
        meta: "Smaller, further, until it's one small thing.",
        phases: SHRINK_PHASES,
      },
    ],

  },
};

export function ThoughtSpinExperience({ onClose }: { onClose: () => void }) {
  return <MethodExperience config={thoughtSpinMethod} onClose={onClose} />;
}
