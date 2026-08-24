import { cn } from "@/lib/utils";

type ParticleFieldProps = {
  className?: string;
  /** chaos = scattered, order = aligned grid */
  mode?: "chaos-to-order" | "orbit";
};

const scattered = [
  [8, 22],
  [17, 71],
  [24, 12],
  [31, 48],
  [12, 55],
  [38, 82],
  [45, 26],
  [52, 62],
  [58, 14],
  [64, 44],
  [71, 74],
  [78, 30],
  [85, 58],
  [92, 20],
  [88, 84],
  [5, 88],
];

/**
 * Abstract visual: dots drifting from scattered to structured.
 * Purely decorative, no imagery.
 */
export function ParticleField({ className, mode = "chaos-to-order" }: ParticleFieldProps) {
  if (mode === "orbit") {
    return (
      <div className={cn("pointer-events-none relative", className)} aria-hidden="true">
        <div className="absolute inset-0 animate-orbit">
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              className="absolute size-1.5 rounded-full bg-brand"
              style={{
                left: `${50 + 42 * Math.cos((i / 9) * Math.PI * 2)}%`,
                top: `${50 + 42 * Math.sin((i / 9) * Math.PI * 2)}%`,
                opacity: 0.25 + (i % 4) * 0.2,
              }}
            />
          ))}
        </div>
        <div className="absolute inset-[18%] animate-orbit-slow">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="absolute size-1 rounded-full bg-ink/50"
              style={{
                left: `${50 + 46 * Math.cos((i / 6) * Math.PI * 2 + 0.6)}%`,
                top: `${50 + 46 * Math.sin((i / 6) * Math.PI * 2 + 0.6)}%`,
              }}
            />
          ))}
        </div>
        <div className="absolute left-1/2 top-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-soft animate-pulse-soft" />
        <div className="absolute left-1/2 top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand" />
      </div>
    );
  }

  return (
    <div className={cn("pointer-events-none relative", className)} aria-hidden="true">
      {scattered.map(([x, y], i) => (
        <span
          key={`s-${i}`}
          className="absolute size-1.5 rounded-full bg-ink/25 animate-drift"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            animationDelay: `${(i % 7) * 0.6}s`,
          }}
        />
      ))}
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3">
        {[0, 1, 2].map((row) => (
          <div key={row} className="flex justify-center gap-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <span
                key={i}
                className="size-1.5 rounded-full bg-brand animate-pulse-soft"
                style={{ animationDelay: `${(row * 12 + i) * 0.08}s` }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
