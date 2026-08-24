import { useEffect, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";

type Phase = "begin" | "breathe" | "spin" | "close";

const BREATH_IN = 4000;
const BREATH_HOLD = 2000;
const BREATH_OUT = 6000;
const CYCLE = BREATH_IN + BREATH_HOLD + BREATH_OUT; // 12s
const CYCLES = 4;
const BREATHE_MS = CYCLE * CYCLES;
const SPIN_MS = 75_000;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

/** Elapsed ms in the current phase, driven by rAF. */
function useElapsed(active: boolean, key: string) {
  const [elapsed, setElapsed] = useState(0);
  const frame = useRef<number | null>(null);
  useEffect(() => {
    if (!active) {
      setElapsed(0);
      return;
    }
    const start = performance.now();
    const tick = (now: number) => {
      setElapsed(now - start);
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [active, key]);
  return elapsed;
}

const PARTICLES = 14;

function ProgressRing({ progress }: { progress: number }) {
  const r = 49;
  const c = 2 * Math.PI * r;
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 size-full -rotate-90"
    >
      <circle cx="50" cy="50" r={r} fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.15" />
      <circle
        cx="50"
        cy="50"
        r={r}
        fill="none"
        stroke="var(--brand)"
        strokeWidth="0.6"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - progress)}
        opacity="0.8"
      />
    </svg>
  );
}

/* ------------------------------- Phase views ------------------------------ */

function BreathePhase({ reduced, onDone }: { reduced: boolean; onDone: () => void }) {
  const elapsed = useElapsed(true, "breathe");

  useEffect(() => {
    const t = setTimeout(onDone, BREATHE_MS);
    return () => clearTimeout(t);
  }, [onDone]);

  const inCycle = elapsed % CYCLE;
  const cycleIndex = Math.min(CYCLES - 1, Math.floor(elapsed / CYCLE));

  let label = "Breathe in";
  let scale = 0.6;
  if (inCycle < BREATH_IN) {
    const t = inCycle / BREATH_IN;
    scale = 0.6 + 0.4 * (0.5 - Math.cos(Math.PI * t) / 2);
  } else if (inCycle < BREATH_IN + BREATH_HOLD) {
    label = "Hold";
    scale = 1;
  } else {
    label = "Breathe out";
    const t = (inCycle - BREATH_IN - BREATH_HOLD) / BREATH_OUT;
    scale = 1 - 0.4 * (0.5 - Math.cos(Math.PI * t) / 2);
  }

  return (
    <div className="flex flex-col items-center gap-12">
      <div className="relative size-64 md:size-80">
        <ProgressRing progress={Math.min(1, elapsed / BREATHE_MS)} />
        <div
          className="absolute inset-[18%] rounded-full bg-brand/25 ring-1 ring-brand/50"
          style={{
            transform: reduced ? undefined : `scale(${scale})`,
            transition: "transform 80ms linear",
            filter: "blur(0.2px)",
          }}
        />
        {!reduced && (
          <div
            className="absolute inset-0"
            style={{ transform: `rotate(${(elapsed / 240) % 360}deg)` }}
          >
            {Array.from({ length: 8 }).map((_, i) => {
              const a = (i / 8) * Math.PI * 2;
              return (
                <span
                  key={i}
                  className="absolute size-1.5 rounded-full bg-brand/70"
                  style={{
                    left: `${50 + 46 * Math.cos(a)}%`,
                    top: `${50 + 46 * Math.sin(a)}%`,
                  }}
                />
              );
            })}
          </div>
        )}
      </div>

      <div className="text-center" aria-live="polite">
        <p key={label} className="animate-fade-in text-3xl font-bold tracking-tight md:text-4xl">
          {label}
        </p>
        <p className="mt-4 text-sm text-background/60">
          Breath {cycleIndex + 1} of {CYCLES}
        </p>
      </div>
    </div>
  );
}

function SpinPhase({ reduced, onDone }: { reduced: boolean; onDone: () => void }) {
  const elapsed = useElapsed(!reduced, "spin");

  useEffect(() => {
    const t = setTimeout(onDone, SPIN_MS);
    return () => clearTimeout(t);
  }, [onDone]);

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
    <div className="flex flex-col items-center gap-12">
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

/* -------------------------------- Container ------------------------------- */

export function ThoughtSpinExperience({ onClose }: { onClose: () => void }) {
  const [phase, setPhase] = useState<Phase>("begin");
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Thought Spin method"
      className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center overflow-y-auto bg-ink px-6 py-16 text-background"
    >
      <div className="pointer-events-none absolute inset-0 dot-scatter opacity-25" aria-hidden="true" />

      <button
        type="button"
        onClick={onClose}
        aria-label="Close Thought Spin"
        className="absolute right-5 top-5 rounded-full p-2 text-background/50 transition-colors hover:bg-background/10 hover:text-background"
      >
        <X className="size-5" />
      </button>

      <div className="relative w-full max-w-xl">
        {phase === "begin" && (
          <div className="text-center">
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Thought Spin</h2>
            <p className="mt-5 text-xl text-background/80 md:text-2xl">
              When your thoughts won&apos;t slow down.
            </p>
            <p className="mt-4 text-sm text-background/60">
              About 2 minutes. Find a quiet moment.
            </p>
            <Button
              size="lg"
              className="mt-10 rounded-full px-10 text-base"
              onClick={() => setPhase("breathe")}
            >
              Begin
            </Button>
          </div>
        )}

        {phase === "breathe" && <BreathePhase reduced={reduced} onDone={() => setPhase("spin")} />}
        {phase === "spin" && <SpinPhase reduced={reduced} onDone={() => setPhase("close")} />}

        {phase === "close" && (
          <div className="text-center">
            <div className="relative mx-auto size-56 md:size-64" aria-hidden="true">
              {Array.from({ length: PARTICLES }).map((_, i) => {
                const a = (i / PARTICLES) * Math.PI * 2;
                return (
                  <span
                    key={i}
                    className="absolute size-2 rounded-full bg-brand/90"
                    style={{ left: `${50 + 38 * Math.cos(a)}%`, top: `${50 + 38 * Math.sin(a)}%` }}
                  />
                );
              })}
            </div>
            <h2 className="mt-10 text-3xl font-bold tracking-tight md:text-4xl">
              Notice how still it feels.
            </h2>
            <p className="mt-4 text-lg text-background/75">
              That&apos;s the distance you were looking for.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="rounded-full px-8 text-base"
                onClick={() => setPhase("begin")}
              >
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
      </div>
    </div>
  );
}
