import { useEffect, useMemo, useState } from "react";

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
        className={`flex items-center justify-center px-2 ${
          size === "lg" ? "min-h-[8rem]" : "min-h-[8rem] max-w-md sm:min-h-[7rem]"
        }`}
        aria-live="polite"
      >
        <p
          key={line}
          className={`animate-fade-in font-display font-bold leading-snug tracking-tight ${
            size === "lg" ? "text-3xl sm:text-4xl md:text-6xl" : "text-xl sm:text-2xl md:text-3xl"
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

/* --------------------------------- Shrink --------------------------------- */

/**
 * One soft abstract shape starts large, close and saturated, then scales down,
 * drifts back, desaturates and softens. Captions fade through beneath it.
 */
export function ShrinkPhase({
  durationMs,
  captions,
  reduced,
  onDone,
}: {
  durationMs: number;
  captions: string[];
  reduced: boolean;
  onDone: () => void;
}) {
  const elapsed = useElapsed(!reduced, "shrink", durationMs, onDone);
  const p = Math.min(1, elapsed / durationMs);
  const stepMs = durationMs / Math.max(1, captions.length);
  const index = Math.min(captions.length - 1, Math.floor(elapsed / stepMs));
  const line = captions[index] ?? "";

  // Held end-states rather than continuous motion for reduced motion.
  const eased = reduced ? (index + 1) / captions.length : 1 - Math.pow(1 - p, 2);
  const scale = 1 - 0.78 * eased;
  const shift = -18 * eased;
  const opacity = 0.95 - 0.7 * eased;
  const blur = 0.4 + 5 * eased;

  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <div className="relative grid h-56 w-full place-items-center sm:h-64 md:h-72">
        <div
          className="rounded-[42%] bg-brand"
          style={{
            width: "13rem",
            height: "13rem",
            maxWidth: "60vw",
            maxHeight: "60vw",
            opacity,
            filter: `blur(${blur}px) saturate(${Math.round(100 - 80 * eased)}%)`,
            transform: `translateY(${shift}%) scale(${Math.max(0.12, scale)})`,
            transition: reduced ? "all 900ms ease-out" : "filter 200ms linear",
          }}
          aria-hidden="true"
        />
      </div>

      <div className="flex min-h-[6rem] max-w-md items-center justify-center px-2" aria-live="polite">
        <p
          key={line}
          className="animate-fade-in font-display text-xl font-bold leading-snug tracking-tight sm:text-2xl md:text-3xl"
        >
          {line}
        </p>
      </div>

      <ProgressLabel>
        {index + 1} of {captions.length}
      </ProgressLabel>
    </div>
  );
}

/* ---------------------------------- Words --------------------------------- */

/** One line at a time, loosening — spacing widens, weight drops, it dissolves. */
export function WordsPhase({
  lines,
  stepMs,
  reduced,
  onDone,
}: {
  lines: string[];
  stepMs: number;
  reduced: boolean;
  onDone: () => void;
}) {
  const total = lines.length * stepMs;
  const elapsed = useElapsed(true, "words", total, onDone);
  const index = Math.min(lines.length - 1, Math.floor(elapsed / stepMs));
  const line = lines[index] ?? "";
  const t = reduced ? 0 : Math.min(1, (elapsed % stepMs) / stepMs);
  // Hold solid for the first third, then loosen.
  const loosen = Math.max(0, (t - 0.34) / 0.66);

  return (
    <div className="flex flex-col items-center gap-10 text-center">
      <div className="flex min-h-[9rem] w-full items-center justify-center px-2" aria-live="polite">
        <p
          key={line}
          className="font-display leading-snug text-2xl sm:text-3xl md:text-4xl"
          style={{
            letterSpacing: `${(-0.02 + 0.34 * loosen).toFixed(3)}em`,
            fontWeight: Math.round(700 - 400 * loosen),
            opacity: 1 - 0.85 * loosen,
            filter: `blur(${(2.5 * loosen).toFixed(2)}px)`,
          }}
        >
          {line}
        </p>
      </div>

      <ProgressLabel>
        {index + 1} of {lines.length}
      </ProgressLabel>
    </div>
  );
}

/* -------------------------------- Tap count -------------------------------- */

export type TapRound = { prompt: string; count: number };

/** The one interactive phase: tap (or Enter/Space) a circle per thing noticed. */
export function TapCountPhase({
  rounds,
  onDone,
}: {
  rounds: TapRound[];
  onDone: () => void;
}) {
  const [round, setRound] = useState(0);
  const [filled, setFilled] = useState(0);
  const current = rounds[round] ?? { prompt: "", count: 0 };
  const complete = filled >= current.count;

  useEffect(() => {
    if (!complete) return;
    const id = setTimeout(() => {
      if (round >= rounds.length - 1) onDone();
      else {
        setRound((r) => r + 1);
        setFilled(0);
      }
    }, 900);
    return () => clearTimeout(id);
  }, [complete, round, rounds.length, onDone]);

  const skip = () => {
    if (round >= rounds.length - 1) onDone();
    else {
      setRound((r) => r + 1);
      setFilled(0);
    }
  };

  return (
    <div className="flex flex-col items-center gap-10 text-center">
      <div className="flex min-h-[6rem] items-center justify-center px-2" aria-live="polite">
        <h3
          key={current.prompt}
          className="animate-fade-in font-display text-2xl font-bold leading-snug tracking-tight sm:text-3xl md:text-4xl"
        >
          {current.prompt}
        </h3>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {Array.from({ length: current.count }).map((_, i) => {
          const isFilled = i < filled;
          return (
            <button
              key={i}
              type="button"
              onClick={() => setFilled((f) => Math.max(f, i + 1))}
              aria-label={`Mark ${i + 1} of ${current.count}`}
              aria-pressed={isFilled}
              className={`size-12 rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:size-14 ${
                isFilled
                  ? "border-brand bg-brand"
                  : "border-background/30 bg-background/5 hover:bg-background/15"
              }`}
            />
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-4">
        <ProgressLabel>
          {Math.min(filled, current.count)} of {current.count} · step {round + 1} of {rounds.length}
        </ProgressLabel>
        <button
          type="button"
          onClick={skip}
          className="min-h-11 rounded-full px-4 text-sm text-background/50 transition-colors hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          Skip this one
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------- Point --------------------------------- */

/** One sharp still dot; everything else drifts and blurs around it. */
export function PointPhase({
  durationMs,
  instruction,
  reduced,
  onDone,
}: {
  durationMs: number;
  instruction: string;
  reduced: boolean;
  onDone: () => void;
}) {
  const elapsed = useElapsed(!reduced, "point", durationMs, onDone);
  const p = Math.min(1, elapsed / durationMs);

  const dots = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        radius: 16 + ((i * 31) % 30),
        base: (i / 22) * Math.PI * 2,
        speed: 0.6 + ((i * 17) % 9) / 12,
        size: 1 + ((i * 13) % 3) * 0.5,
      })),
    [],
  );

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="relative size-72 md:size-96">
        <ProgressRing progress={p} />
        <div className="absolute inset-0" style={{ filter: "blur(2.5px)" }} aria-hidden="true">
          {dots.map((d, i) => {
            const a = d.base + (reduced ? 0 : (elapsed / 26_000) * d.speed);
            return (
              <span
                key={i}
                className="absolute rounded-full bg-brand/40"
                style={{
                  width: `${d.size * 4}px`,
                  height: `${d.size * 4}px`,
                  left: `${50 + d.radius * Math.cos(a)}%`,
                  top: `${50 + d.radius * Math.sin(a)}%`,
                }}
              />
            );
          })}
        </div>
        <span className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand" />
      </div>

      <Instruction>{instruction}</Instruction>

      <div aria-live="polite">
        <ProgressLabel>{Math.round(p * 100)}% through</ProgressLabel>
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
