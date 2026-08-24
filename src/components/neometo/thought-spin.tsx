import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  BreathingCircle,
  ExperienceShell,
  PARTICLES,
  ProgressRing,
  StillRing,
  useElapsed,
  usePrefersReducedMotion,
} from "@/components/neometo/experience-kit";

type Phase = "begin" | "breathe" | "spin" | "close";

const SPIN_MS = 75_000;

const BREATH_PATTERN = [
  { label: "Breathe in", ms: 4000 },
  { label: "Hold", ms: 2000 },
  { label: "Breathe out", ms: 6000 },
];

function SpinPhase({ reduced, onDone }: { reduced: boolean; onDone: () => void }) {
  const elapsed = useElapsed(!reduced, "spin", SPIN_MS, onDone);

  const p = Math.min(1, elapsed / SPIN_MS);
  // Angle: fast start, easing to a stop (integral of a decaying speed).
  const angle = 900 * (1 - Math.pow(1 - p, 3));
  // Scatter collapses toward an even ring.
  const settle = 1 - p;

  const offsets = useMemo(
    () =>
      Array.from({ length: PARTICLES }, (_, i) => ({
        radius: ((i * 37) % 19) - 9,
        skew: (((i * 53) % 23) - 11) / 11,
      })),
    [],
  );

  return (
    <div className="flex flex-col items-center gap-10">
      <Instruction>Watch the center. Let your thoughts move with it.</Instruction>

      <div className="relative size-72 md:size-96">
        <ProgressRing progress={p} />
        <div className="absolute inset-0" style={{ transform: `rotate(${angle}deg)` }}>
          {offsets.map((o, i) => {
            const base = (i / PARTICLES) * Math.PI * 2;
            const a = base + o.skew * settle;
            const r = 38 + o.radius * settle;
            return (
              <span
                key={i}
                className="absolute size-2 rounded-full bg-brand"
                style={{
                  left: `${50 + r * Math.cos(a)}%`,
                  top: `${50 + r * Math.sin(a)}%`,
                  opacity: 0.45 + 0.45 * p,
                }}
              />
            );
          })}
        </div>
        <span className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background/70" />
      </div>

      <div className="max-w-sm text-center" aria-live="polite">
        <p
          className="text-lg text-background/80 transition-opacity duration-[3000ms]"
          style={{ opacity: reduced ? 1 : elapsed > 12_000 ? 0.18 : 1 }}
        >
          Watch the center. Let your thoughts move with it.
        </p>
        {reduced && (
          <p className="mt-4 text-sm text-background/60">
            The ring is slowing and settling. Stay with it until it&apos;s still.
          </p>
        )}
      </div>
    </div>
  );
}

export function ThoughtSpinExperience({ onClose }: { onClose: () => void }) {
  const [phase, setPhase] = useState<Phase>("begin");
  const reduced = usePrefersReducedMotion();

  return (
    <ExperienceShell label="Thought Spin method" onClose={onClose}>
      {phase === "begin" && (
        <div className="text-center">
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">Thought Spin</h2>
          <p className="mt-5 text-xl text-background/80 md:text-2xl">
            When your thoughts won&apos;t slow down.
          </p>
          <p className="mt-4 text-sm text-background/60">About 2 minutes. Find a quiet moment.</p>
          <Button
            size="lg"
            className="mt-10 rounded-full px-10 text-base"
            onClick={() => setPhase("breathe")}
          >
            Begin
          </Button>
        </div>
      )}

      {phase === "breathe" && (
        <BreathingCircle
          reduced={reduced}
          pattern={BREATH_PATTERN}
          cycles={4}
          onDone={() => setPhase("spin")}
        />
      )}
      {phase === "spin" && <SpinPhase reduced={reduced} onDone={() => setPhase("close")} />}

      {phase === "close" && (
        <div className="text-center">
          <StillRing />
          <h2 className="mt-10 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Notice how still it feels.
          </h2>
          <p className="mt-4 text-lg text-background/75">
            That&apos;s the distance you were looking for.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button size="lg" className="rounded-full px-8 text-base" onClick={() => setPhase("begin")}>
              Do it again
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-background/30 bg-transparent px-8 text-base text-background hover:bg-background/10 hover:text-background"
              onClick={() => {
                onClose();
                requestAnimationFrame(() =>
                  document
                    .getElementById("methods")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" }),
                );
              }}
            >
              Explore other methods
            </Button>
          </div>
        </div>
      )}
    </ExperienceShell>
  );
}
