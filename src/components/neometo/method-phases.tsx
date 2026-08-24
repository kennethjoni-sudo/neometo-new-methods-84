import { useMemo } from "react";

import { Button } from "@/components/ui/button";
import {
  Instruction,
  PARTICLES,
  ProgressLabel,
  ProgressRing,
  StillRing,
  useElapsed,
} from "@/components/neometo/experience-kit";

/* --------------------------------- Begin ---------------------------------- */

export function BeginPhase({
  title,
  subtitle,
  note,
  buttonLabel = "Begin",
  onStart,
}: {
  title: string;
  subtitle?: string;
  note?: string;
  buttonLabel?: string;
  onStart: () => void;
}) {
  return (
    <div className="text-center">
      <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">{title}</h2>
      {subtitle && <p className="mt-5 text-xl text-background/80 md:text-2xl">{subtitle}</p>}
      {note && <p className="mt-4 text-sm text-background/60">{note}</p>}
      <Button size="lg" className="mt-10 rounded-full px-10 text-base" onClick={onStart}>
        {buttonLabel}
      </Button>
    </div>
  );
}

/* ----------------------------- Text sequence ------------------------------ */

/**
 * An ordered list of short prompts, each held for a fixed duration with a
 * crossfade, plus a quiet step counter. Shared by Racing Thoughts Shuffle,
 * Body Scan, and any future prompt-driven technique.
 */
export function TextSequencePhase({
  prompts,
  stepMs,
  instruction,
  counterPrefix,
  visual = "none",
  size = "lg",
  reduced,
  onDone,
}: {
  prompts: string[];
  stepMs: number;
  instruction?: string;
  counterPrefix?: string;
  visual?: "none" | "ring";
  size?: "md" | "lg";
  reduced: boolean;
  onDone: () => void;
}) {
  const total = prompts.length * stepMs;
  const elapsed = useElapsed(true, "text-sequence", total, onDone);
  const index = Math.min(prompts.length - 1, Math.floor(elapsed / stepMs));
  const line = prompts[index] ?? "";
  const progress = Math.min(1, elapsed / total);

  return (
    <div className="flex flex-col items-center gap-10 text-center">
      {instruction && <Instruction>{instruction}</Instruction>}

      {visual === "ring" && (
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
      )}

      <div
        className={`flex items-center justify-center ${
          size === "lg" ? "min-h-[8rem]" : "min-h-[7rem] max-w-md"
        }`}
        aria-live="polite"
      >
        <p
          key={line}
          className={`animate-fade-in font-display font-bold tracking-tight ${
            size === "lg" ? "text-4xl md:text-6xl" : "text-2xl leading-snug md:text-3xl"
          }`}
          style={{ transition: "opacity 1200ms ease-in-out" }}
        >
          {line}
        </p>
      </div>

      <ProgressLabel>
        {counterPrefix ? `${counterPrefix} ` : ""}
        {index + 1} of {prompts.length}
      </ProgressLabel>
    </div>
  );
}

/* ---------------------------------- Spin ---------------------------------- */

export function SpinPhase({
  durationMs,
  instruction = "Watch the center. Let your thoughts move with it.",
  reduced,
  onDone,
}: {
  durationMs: number;
  instruction?: string;
  reduced: boolean;
  onDone: () => void;
}) {
  const elapsed = useElapsed(!reduced, "spin", durationMs, onDone);

  const p = Math.min(1, elapsed / durationMs);
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
      <Instruction>{instruction}</Instruction>

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
        {reduced ? (
          <p className="text-sm text-background/60">
            The ring is slowing and settling. Stay with it until it&apos;s still.
          </p>
        ) : (
          <ProgressLabel>{Math.round(p * 100)}% settled</ProgressLabel>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------- Close --------------------------------- */

export type CloseAction = {
  label: string;
  variant?: "primary" | "outline";
  action: "restart" | "select" | "close" | "scroll-methods";
};

export function ClosePhase({
  heading,
  subheading,
  actions,
  onAction,
}: {
  heading: string;
  subheading?: string;
  actions: CloseAction[];
  onAction: (action: CloseAction["action"]) => void;
}) {
  return (
    <div className="text-center">
      <StillRing />
      <h2 className="mt-10 font-display text-3xl font-bold tracking-tight md:text-4xl">
        {heading}
      </h2>
      {subheading && <p className="mt-4 text-lg text-background/75">{subheading}</p>}
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        {actions.map((a) =>
          a.variant === "outline" ? (
            <Button
              key={a.label}
              size="lg"
              variant="outline"
              className="rounded-full border-background/30 bg-transparent px-8 text-base text-background hover:bg-background/10 hover:text-background"
              onClick={() => onAction(a.action)}
            >
              {a.label}
            </Button>
          ) : (
            <Button
              key={a.label}
              size="lg"
              className="rounded-full px-8 text-base"
              onClick={() => onAction(a.action)}
            >
              {a.label}
            </Button>
          ),
        )}
      </div>
    </div>
  );
}
