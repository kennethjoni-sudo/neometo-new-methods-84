import { useEffect, useRef, useState, type ReactNode } from "react";
import { X } from "lucide-react";

export function usePrefersReducedMotion() {
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

/**
 * Elapsed ms in the current phase, measured from a wall-clock start time so it
 * stays accurate when the tab is backgrounded or rAF/timers are throttled.
 */
export function useElapsed(
  active: boolean,
  key: string,
  duration?: number,
  onDone?: () => void,
) {
  const [elapsed, setElapsed] = useState(0);
  const frame = useRef<number | null>(null);
  const doneRef = useRef(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    doneRef.current = false;
    const start = Date.now();

    const sync = () => {
      const e = Date.now() - start;
      if (duration != null && e >= duration) {
        setElapsed(duration);
        if (!doneRef.current) {
          doneRef.current = true;
          onDoneRef.current?.();
        }
        return true;
      }
      setElapsed(e);
      return false;
    };

    sync();

    if (active) {
      const tick = () => {
        if (sync()) return;
        frame.current = requestAnimationFrame(tick);
      };
      frame.current = requestAnimationFrame(tick);
    }

    // Backstop: intervals keep firing (throttled to ~1s) while backgrounded.
    const interval = setInterval(sync, 500);
    const onVisible = () => sync();
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", onVisible);

    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
      clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", onVisible);
      setElapsed(0);
    };
  }, [active, key, duration]);

  return elapsed;
}

export const PARTICLES = 14;

export function ProgressRing({ progress }: { progress: number }) {
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

/** The settled, motionless ring used on close screens. */
export function StillRing({ className = "size-56 md:size-64" }: { className?: string }) {
  return (
    <div className={`relative mx-auto ${className}`} aria-hidden="true">
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
  );
}

export type BreathStep = { label: string; ms: number };

/** Generic breathing circle driven by an arbitrary step pattern. */
export function BreathingCircle({
  reduced,
  pattern,
  cycles,
  onDone,
  cycleNoun = "Breath",
}: {
  reduced: boolean;
  pattern: BreathStep[];
  cycles: number;
  onDone: () => void;
  cycleNoun?: string;
}) {
  const cycleMs = pattern.reduce((s, p) => s + p.ms, 0);
  const totalMs = cycleMs * cycles;
  const elapsed = useElapsed(true, "breathe", totalMs, onDone);

  const inCycle = elapsed % cycleMs;
  const cycleIndex = Math.min(cycles - 1, Math.floor(elapsed / cycleMs));

  let acc = 0;
  let stepIndex = 0;
  for (let i = 0; i < pattern.length; i++) {
    const ms = pattern[i]?.ms ?? 0;
    if (inCycle < acc + ms) {
      stepIndex = i;
      break;
    }
    acc += ms;
    stepIndex = i;
  }
  const step = pattern[stepIndex] ?? { label: "", ms: 1 };
  const t = Math.min(1, (inCycle - acc) / step.ms);
  const ease = 0.5 - Math.cos(Math.PI * t) / 2;

  // First step expands, last step contracts, anything between holds.
  let scale = 1;
  if (stepIndex === 0) scale = 0.6 + 0.4 * ease;
  else if (stepIndex === pattern.length - 1) scale = 1 - 0.4 * ease;

  return (
    <div className="flex flex-col items-center gap-12">
      <div className="relative size-64 md:size-80">
        <ProgressRing progress={Math.min(1, elapsed / totalMs)} />
        <div
          className="absolute inset-[18%] rounded-full bg-brand/25 ring-1 ring-brand/50"
          style={{
            transform: reduced ? undefined : `scale(${scale})`,
            transition: "transform 80ms linear",
            filter: "blur(0.2px)",
          }}
        />
        {!reduced && (
          <div className="absolute inset-0" style={{ transform: `rotate(${(elapsed / 240) % 360}deg)` }}>
            {Array.from({ length: 8 }).map((_, i) => {
              const a = (i / 8) * Math.PI * 2;
              return (
                <span
                  key={i}
                  className="absolute size-1.5 rounded-full bg-brand/70"
                  style={{ left: `${50 + 46 * Math.cos(a)}%`, top: `${50 + 46 * Math.sin(a)}%` }}
                />
              );
            })}
          </div>
        )}
      </div>

      <div className="text-center" aria-live="polite">
        <p key={step.label} className="animate-fade-in text-3xl font-bold tracking-tight md:text-4xl">
          {step.label}
        </p>
        <p className="mt-4 text-sm text-background/60">
          {cycleNoun} {cycleIndex + 1} of {cycles}
        </p>
      </div>
    </div>
  );
}

/** Full-screen dark dialog shell: escape-to-close, scroll lock, close button. */
export function ExperienceShell({
  label,
  onClose,
  onBack,
  backLabel = "Back",
  children,
}: {
  label: string;
  onClose: () => void;
  onBack?: () => void;
  backLabel?: string;
  children: ReactNode;
}) {
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
      aria-label={label}
      className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center overflow-y-auto bg-ink px-6 py-16 text-background"
    >
      <div className="pointer-events-none absolute inset-0 dot-scatter opacity-25" aria-hidden="true" />

      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="absolute left-5 top-5 rounded-full px-4 py-2 text-sm font-medium text-background/60 transition-colors hover:bg-background/10 hover:text-background"
        >
          {backLabel}
        </button>
      )}

      <button
        type="button"
        onClick={onClose}
        aria-label={`Close ${label}`}
        className="absolute right-5 top-5 rounded-full p-2 text-background/50 transition-colors hover:bg-background/10 hover:text-background"
      >
        <X className="size-5" />
      </button>

      <div className="relative w-full max-w-xl">{children}</div>
    </div>
  );
}
