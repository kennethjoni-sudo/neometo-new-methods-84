import { useState } from "react";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  BreathingCircle,
  ExperienceShell,
  Instruction,
  ProgressLabel,
  ProgressRing,
  StillRing,
  useElapsed,
  usePrefersReducedMotion,
} from "@/components/neometo/experience-kit";

type Screen = "select" | "shuffle" | "breathing" | "bodyscan" | "close";

const TECHNIQUES: { id: Exclude<Screen, "select" | "close">; title: string; meta: string }[] = [
  {
    id: "shuffle",
    title: "Racing Thoughts Shuffle",
    meta: "2 minutes · when your mind won't stop looping",
  },
  {
    id: "breathing",
    title: "4-7-8 Breathing",
    meta: "2 minutes · when you need your body to slow down first",
  },
  {
    id: "bodyscan",
    title: "Body Scan",
    meta: "3 minutes · when you want to stop thinking entirely",
  },
];

/* ------------------------- Technique 1: Shuffle --------------------------- */

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
const WORD_MS = 3500;

function ShufflePhase({ onDone }: { onDone: () => void }) {
  const total = WORDS.length * WORD_MS;
  const elapsed = useElapsed(true, "shuffle", total, onDone);
  const index = Math.min(WORDS.length - 1, Math.floor(elapsed / WORD_MS));
  const word = WORDS[index] ?? "";

  return (
    <div className="flex flex-col items-center gap-10 text-center">
      <Instruction>
        Just picture each word for a moment. Don&apos;t force it — let your mind drift to the next
        one.
      </Instruction>

      <div className="flex min-h-[8rem] items-center justify-center" aria-live="polite">
        <p
          key={word}
          className="animate-fade-in font-display text-4xl font-bold tracking-tight md:text-6xl"
          style={{ transition: "opacity 1200ms ease-in-out" }}
        >
          {word}
        </p>
      </div>

      <ProgressLabel>
        {index + 1} of {WORDS.length}
      </ProgressLabel>
    </div>
  );
}

/* ------------------------- Technique 3: Body scan ------------------------- */

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
const STEP_MS = 13_000;

function BodyScanPhase({ reduced, onDone }: { reduced: boolean; onDone: () => void }) {
  const total = BODY_STEPS.length * STEP_MS;
  const elapsed = useElapsed(true, "bodyscan", total, onDone);
  const index = Math.min(BODY_STEPS.length - 1, Math.floor(elapsed / STEP_MS));
  const line = BODY_STEPS[index] ?? "";
  const progress = Math.min(1, elapsed / total);

  return (
    <div className="flex flex-col items-center gap-10 text-center">
      <Instruction>
        Move through your body one part at a time. Let each one go as you reach it.
      </Instruction>

      <div className="relative size-56 md:size-64">
        <ProgressRing progress={progress} />
        <div
          className="absolute inset-[26%] rounded-full bg-brand/15 ring-1 ring-brand/40"
          style={{
            transform: reduced ? undefined : `scale(${1 + 0.04 * Math.sin(elapsed / 1600)})`,
          }}
        />
        {!reduced &&
          Array.from({ length: 10 }).map((_, i) => {
            const a = (i / 10) * Math.PI * 2 + elapsed / 26_000;
            return (
              <span
                key={i}
                className="absolute size-1.5 rounded-full bg-brand/50"
                style={{ left: `${50 + 42 * Math.cos(a)}%`, top: `${50 + 42 * Math.sin(a)}%` }}
              />
            );
          })}
      </div>

      <div className="flex min-h-[7rem] max-w-md items-center justify-center" aria-live="polite">
        <p
          key={line}
          className="animate-fade-in font-display text-2xl font-bold leading-snug tracking-tight md:text-3xl"
        >
          {line}
        </p>
      </div>

      <ProgressLabel>
        Step {index + 1} of {BODY_STEPS.length}
      </ProgressLabel>
    </div>
  );
}

/* -------------------------------- Container ------------------------------- */

export function SleepExperience({ onClose }: { onClose: () => void }) {
  const [screen, setScreen] = useState<Screen>("select");
  const reduced = usePrefersReducedMotion();
  const toClose = () => setScreen("close");

  return (
    <ExperienceShell
      label="Sleep method"
      onClose={onClose}
      onBack={screen === "select" ? undefined : () => setScreen("select")}
      backLabel="← Back"
    >
      {screen === "select" && (
        <div className="text-center">
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">Sleep</h2>
          <p className="mt-5 text-xl text-background/80 md:text-2xl">
            Mind still running at 2am? Try one of these.
          </p>
          <ul className="mt-10 grid gap-4">
            {TECHNIQUES.map((t) => (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => setScreen(t.id)}
                  className="group flex w-full items-center justify-between gap-6 rounded-3xl border border-background/15 bg-background/5 px-6 py-5 text-left transition-colors hover:border-brand/50 hover:bg-background/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  <span>
                    <span className="block font-display text-lg font-bold tracking-tight">
                      {t.title}
                    </span>
                    <span className="mt-1 block text-sm text-background/60">{t.meta}</span>
                  </span>
                  <ArrowRight className="size-5 shrink-0 text-brand transition-transform duration-500 group-hover:translate-x-1" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {screen === "shuffle" && <ShufflePhase onDone={toClose} />}

      {screen === "breathing" && (
        <BreathingCircle
          reduced={reduced}
          cycles={4}
          onDone={toClose}
          pattern={[
            { label: "Breathe in", ms: 4000 },
            { label: "Hold", ms: 7000 },
            { label: "Breathe out", ms: 8000 },
          ]}
        />
      )}

      {screen === "bodyscan" && <BodyScanPhase reduced={reduced} onDone={toClose} />}

      {screen === "close" && (
        <div className="text-center">
          <StillRing />
          <h2 className="mt-10 font-display text-3xl font-bold tracking-tight md:text-4xl">
            However far that got you, that&apos;s enough for tonight.
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="rounded-full px-8 text-base"
              onClick={() => setScreen("select")}
            >
              Try another technique
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-background/30 bg-transparent px-8 text-base text-background hover:bg-background/10 hover:text-background"
              onClick={onClose}
            >
              Done
            </Button>
          </div>
        </div>
      )}
    </ExperienceShell>
  );
}
