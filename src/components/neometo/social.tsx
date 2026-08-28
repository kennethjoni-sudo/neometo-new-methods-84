import {
MethodExperience,
type MethodConfig,
} from "@/components/neometo/method-engine";

export const socialMethod: MethodConfig = {
label: "Social replay method",
phases: [
{
type: "begin",
title: "Replaying it",
subtitle: "Replaying every conversation afterward?",
note: "About 2 minutes. This won't erase the memory — it'll just stop it from looping.",
buttonLabel: "Begin",
},
{
type: "breathe",
cycles: 2,
instruction: "Before we look at it, a couple of breaths to steady out.",
pattern: [
{ label: "Breathe in", ms: 4000 },
{ label: "Hold", ms: 2000 },
{ label: "Breathe out", ms: 6000 },
],
},
{
type: "text-sequence",
prompts: [
"Picture the moment you keep replaying.",
"Now picture it on a small screen, a few feet in front of you.",
"You're not in it. You're watching it, from a distance.",
"Let it play through, once, to the end.",
"Notice: you survived it. It already happened. It's over.",
"The version replaying in your head is a copy, not the moment.",
"You can let the copy stop now.",
],
stepMs: 7500,
instruction: "Take your time with each line.",
counterPrefix: "Step",
size: "md",
},
{
type: "close",
heading: "That's enough replays for today.",
subheading: "If it comes back, you know where this is.",
actions: [
{ label: "Do it again", action: "restart" },
{ label: "Explore other methods", variant: "outline", action: "scroll-methods" },
],
},
],
};

export function SocialExperience({ onClose }: { onClose: () => void }) {
  return <MethodExperience config={socialMethod} onClose={onClose} />;
}
