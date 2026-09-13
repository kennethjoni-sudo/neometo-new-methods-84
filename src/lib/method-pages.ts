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

type TechniqueCopy = { title: string; body: string };

type PageCopy = {
  whenToUse: string[];
  techniques: TechniqueCopy[];
  techniqueNote?: string;
  origin: string;
};

export const methodPageCopy: Record<MethodSlug, PageCopy> = {
  spin: {
    whenToUse: [
      "The moment a thought has been running for more than a few minutes and you've noticed it's looping rather than getting anywhere.",
      "It works well mid-task, when you catch yourself replaying something instead of doing what's in front of you.",
      "Two to three minutes, then back to whatever you were doing.",
    ],
    techniques: [
      {
        title: "Spin it out",
        body: "You find where the feeling actually sits — chest, stomach, throat, jaw — and notice which way it moves. Then you lift it out in front of you and turn it the other way, following a circle on screen as it reverses direction.",
      },
      {
        title: "Name the thought",
        body: "You find the thought taking up the most space and say it to yourself once. Then you put 'I notice I'm having the thought that…' in front of it, and feel the small gap that opens between you and the sentence.",
      },
      {
        title: "Park it",
        body: "You name the worry as a headline and ask whether there's anything you can do about it in the next hour. If there isn't, you pick a time later today to give it your full attention, and leave it there until then.",
      },
      {
        title: "Step back",
        body: "You put the thing in front of you as a picture, then watch it shrink, lose its colour and go rough as you move further out. By the last stage you're looking at it from far enough away that it's one small thing on a very large planet.",
      },
    ],
    techniqueNote: "Not sure which one? Start with Spin it out — it's the most physical.",
    origin:
      "Spin it out is adapted from a neuro-linguistic programming practice of locating a feeling, noticing which way it moves, and turning it the other way — the research base for NLP is thin, and we're not claiming otherwise. The others are adapted from cognitive defusion, from worry postponement, and from changing the size, colour and texture of a mental image while taking a wider viewing position on it.",
  },
  sleep: {
    whenToUse: [
      "Lying in bed, lights already off, head still running.",
      "Not for falling asleep faster in general — for the specific nights where your mind won't stop producing content.",
      "Pick the technique that matches the night you're having.",
    ],
    techniques: [
      {
        title: "Racing Thoughts Shuffle",
        body: "You get one unrelated word at a time — lantern, paper boat, brass key — and picture each one for a few seconds before the next arrives. You don't hold them or connect them; the point is to let your mind drift between images instead of running one line of thought.",
      },
      {
        title: "4-7-8 Breathing",
        body: "You breathe with a circle on screen: in for four, hold for seven, out for eight, four times through. The long exhale does the work, so you follow the circle rather than counting.",
      },
      {
        title: "Body Scan",
        body: "You move down your body one part at a time — forehead, jaw, shoulders, chest, arms, hands, stomach, legs, feet. Each line gives you one place to soften and about thirteen seconds to let it go.",
      },
    ],
    techniqueNote:
      "Start with the Shuffle if your head is busy with words. Start with 4-7-8 if your body feels wired.",
    origin:
      "The Shuffle is adapted from cognitive shuffling, the breathing from paced breathing with a long exhale, and the last one from a shortened mindfulness body scan.",
  },
  focus: {
    whenToUse: [
      "You've been trying to start something for ten minutes and your attention keeps sliding off it.",
      "Not a long focus session — one short rep to get your eyes and your mind on the same thing.",
      "Ninety seconds, with one small object within reach.",
    ],
    techniques: [
      {
        title: "One-Point Anchor",
        body: "After two slow breaths, a single dot appears on a dark screen and you rest your eyes on it for forty-five seconds. Your attention will wander; each time you notice and bring it back to the dot, that's the rep.",
      },
    ],
    origin:
      "Adapted from attention training: rest attention on one object, notice when it wanders, bring it back. The bringing-back is the rep.",
  },
  overload: {
    whenToUse: [
      "Eight things need you at once and you're frozen between them.",
      "Not a planning tool — just a way to stop staring at the pile and pick one thing to do first.",
      "Ninety seconds to get it down to one thing.",
    ],
    techniques: [
      {
        title: "One thing at a time",
        body: "This one is all prompts: two slow breaths, then a line at a time asking what actually needs you right now — not the loudest thing, the one thing. You read, you answer it in your head, and everything else gets set down until later.",
      },
      {
        title: "Sensory anchor",
        body: "This one is interactive. You tap through five things you can see, three you can feel and two you can hear, one tap per item, so your attention lands in the room instead of the pile.",
      },
    ],
    origin:
      "One thing at a time narrows a pile-up down to the single next thing. Sensory anchor is a shortened form of 5-4-3-2-1 sensory grounding.",
  },
  social: {
    whenToUse: [
      "After a conversation or social situation that keeps replaying.",
      "The loop usually starts within an hour and gets worse the more you replay it.",
      "Two minutes to let the memory settle instead of loop.",
    ],
    techniques: [
      {
        title: "Replaying it",
        body: "After two steadying breaths, you picture the moment you keep going back over — then move it onto a small screen a few feet in front of you and watch it play through once, to the end. You stay outside it the whole time, which is what lets you see that the version in your head is a copy rather than the moment.",
      },
    ],
    origin:
      "Adapted from self-distancing — watching a memory from a few feet away rather than from inside it.",
  },
  prepare: {
    whenToUse: [
      "Ten minutes before a meeting, a call, a conversation you're nervous about.",
      "Not a scripting tool — it settles you and gives you one decision made in advance.",
      "Do it in the corridor, the car, or at your desk before you stand up.",
    ],
    techniques: [
      {
        title: "Walk in steadier",
        body: "Three slow breaths, then you picture the first minute only — walking in, nothing after that. You rehearse yourself steady rather than perfect, so the version in your head matches something you can actually do.",
      },
      {
        title: "If, then",
        body: "You pick the one moment you're least looking forward to and name it plainly: 'if they ask about the delay.' Then you decide the response now — 'then I take one breath and answer the question that was asked' — so you're not choosing it live.",
      },
    ],
    origin:
      "Walk in steadier is mental rehearsal of the first minute. If, then is adapted from implementation intentions — deciding a response in advance so you're not choosing in the moment.",
  },
  friction: {
    whenToUse: [
      "Staring at a task you know how to do but can't seem to begin.",
      "The method opens cold — no settling, no breathing, straight into finding the smallest physical move.",
      "Two minutes, then five minutes of the thing itself.",
    ],
    techniques: [
      {
        title: "Next Action",
        body: "You drop the finished thing entirely and look for the smallest physical movement that would start it — not 'write the report', just 'open the document'. Then you give yourself permission to stop after five minutes, and go and make that one move.",
      },
    ],
    origin:
      "Adapted from reducing a task to the smallest physical move, plus a five-minute limit so starting costs less.",
  },
};
