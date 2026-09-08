import { thoughtSpinMethod } from "@/components/neometo/thought-spin";
import { sleepMethod } from "@/components/neometo/sleep";
import { focusMethod } from "@/components/neometo/focus";
import { overloadMethod } from "@/components/neometo/overload";
import { socialMethod } from "@/components/neometo/social";
import { prepareMethod } from "@/components/neometo/prepare";
import { frictionMethod } from "@/components/neometo/friction";
import type { MethodConfig } from "@/components/neometo/method-engine";
import type { MethodSlug } from "@/lib/open-method";

const configs: Record<MethodSlug, MethodConfig> = {
  spin: thoughtSpinMethod,
  sleep: sleepMethod,
  focus: focusMethod,
  overload: overloadMethod,
  social: socialMethod,
  prepare: prepareMethod,
  friction: frictionMethod,
};

export type TechniqueEntry = { title: string; meta: string };

/** Techniques a method actually contains, read from its own config. */
export function techniquesFor(slug: MethodSlug): TechniqueEntry[] {
  const config = configs[slug];
  const list = config?.selector?.techniques ?? [];
  return list.map((t) => ({ title: t.title, meta: t.meta }));
}

type PageCopy = { whenToUse: string[]; origin: string };

export const methodPageCopy: Record<MethodSlug, PageCopy> = {
  spin: {
    whenToUse: [
      "For the moments when the same thought keeps coming back around and you can't get on with anything else.",
      "It fits a break between tasks, a walk, or the ten minutes before you have to concentrate again.",
      "Two minutes, then back to whatever you were doing.",
    ],
    origin:
      "Thought Spin is our own construction — a simple moving visual gives attention something to hold. The other two techniques are adapted from cognitive defusion and from worry postponement: naming a thought, and giving it a time later instead of arguing with it now.",
  },
  sleep: {
    whenToUse: [
      "For the middle of the night, when you're awake and your mind has picked up where it left off.",
      "Also useful in the first twenty minutes in bed, before the night gets long.",
      "Pick the technique that matches the night you're having.",
    ],
    origin:
      "The Shuffle is adapted from cognitive shuffling, the breathing from paced breathing with a long exhale, and the last one from a shortened mindfulness body scan.",
  },
  focus: {
    whenToUse: [
      "For the moment you sit down to work and your attention keeps sliding off.",
      "It works best before you start something, not in the middle of it.",
      "Ninety seconds, with one small object within reach.",
    ],
    origin:
      "Adapted from attention training: rest attention on one object, notice when it wanders, bring it back. The bringing-back is the rep.",
  },
  overload: {
    whenToUse: [
      "For the moment when there are eight things and you can't start any of them.",
      "Useful mid-morning when the list grows faster than you can work through it, or at the end of a day that got away from you.",
      "Ninety seconds to get it down to one thing.",
    ],
    origin:
      "One thing at a time narrows a pile-up down to the single next thing. Sensory anchor is a shortened form of 5-4-3-2-1 sensory grounding.",
  },
  social: {
    whenToUse: [
      "For the hour after a conversation, when you keep running the same thirty seconds of it back.",
      "It fits the walk home, the drive back, or the quiet stretch before bed.",
      "Two minutes to let the memory settle instead of loop.",
    ],
    origin:
      "Adapted from self-distancing — watching a memory from a few feet away rather than from inside it.",
  },
  prepare: {
    whenToUse: [
      "For the ten minutes before a meeting, an interview, an event, or a conversation you've been thinking about all week.",
      "Do it in the corridor, the car, or at your desk before you stand up.",
      "Two minutes to walk in steadier.",
    ],
    origin:
      "Walk in steadier is mental rehearsal of the first minute. If, then is adapted from implementation intentions — deciding a response in advance so you're not choosing in the moment.",
  },
  friction: {
    whenToUse: [
      "For the task that's been sitting on the list for three days and still hasn't started.",
      "Do it with the task in front of you, so the first small move is available the second you finish.",
      "Two minutes, then five minutes of the thing itself.",
    ],
    origin:
      "Adapted from reducing a task to the smallest physical move, plus a five-minute limit so starting costs less.",
  },
};
