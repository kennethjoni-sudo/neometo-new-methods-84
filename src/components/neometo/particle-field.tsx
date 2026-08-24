import { cn } from "@/lib/utils";

type ParticleFieldProps = {
  className?: string;
  /** chaos-to-order = scattered dots resolving into aligned rows, orbit = settling rotation */
  mode?: "chaos-to-order" | "orbit";
};

const round = (n: number) => Math.round(n * 100) / 100;

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

const ring = (count: number, radius: number, offset = 0) =>
  Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 + offset;
    return {
      left: `${round(50 + radius * Math.cos(angle))}%`,
      top: `${round(50 + radius * Math.sin(angle))}%`,
    };
  });

/**
 * Brand motif: abstract geometry moving from chaos toward order.
 * Purely decorative — carries no information, hidden from assistive tech.
 */
export function ParticleField({ className, mode = "chaos-to-order" }: ParticleFieldProps) {
  if (mode === "orbit") {
    return (
      <div className={cn("pointer-events-none relative", className)} aria-hidden="true">
        <div className="absolute inset-0 animate-orbit">
          {ring(9, 42).map((pos, i) => (
            <span
              key={i}
              className="absolute size-1.5 rounded-full bg-brand"
              style={{ ...pos, opacity: round(0.3 + (i % 4) * 0.18) }}
            />
          ))}
        </div>
        <div className="absolute inset-[18%] animate-orbit-slow">
          {ring(6, 46, 0.6).map((pos, i) => (
            <span key={i} className="absolute size-1 rounded-full bg-ink/40" style={pos} />
          ))}
        </div>
        <div className="absolute inset-[34%] animate-orbit">
          {ring(4, 44, 1.2).map((pos, i) => (
            <span key={i} className="absolute size-1 rounded-full bg-success" style={pos} />
          ))}
        </div>
        <div className="absolute left-1/2 top-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-soft animate-pulse-soft" />
        <div className="absolute left-1/2 top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand transition-transform duration-500 motion-safe:group-hover:scale-150" />

      </div>
    );
  }

  return (
    <div className={cn("pointer-events-none relative", className)} aria-hidden="true">
      {scattered.map(([x, y], i) => (
        <span
          key={`s-${i}`}
          className="absolute size-1.5 rounded-full bg-ink/20 animate-drift"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            animationDelay: `${round((i % 7) * 0.6)}s`,
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
                style={{ animationDelay: `${round((row * 12 + i) * 0.08)}s` }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Small abstract chaos-to-order glyphs used on the problem cards. */
export function MethodGlyph({ variant }: { variant: number }) {
  const common = "size-9 text-brand";
  const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const };

  switch (variant % 6) {
    case 0: // overthinking — tangled line resolving
      return (
        <svg viewBox="0 0 36 36" className={common} aria-hidden="true">
          <path d="M4 10c6-8 12 8 18 0s8 2 10 4" {...stroke} />
          <path d="M4 24h28" {...stroke} opacity={0.45} />
        </svg>
      );
    case 1: // sleep — descending steps
      return (
        <svg viewBox="0 0 36 36" className={common} aria-hidden="true">
          <path d="M4 10h8v8h8v8h12" {...stroke} />
          <circle cx="30" cy="8" r="2.5" fill="currentColor" opacity={0.5} />
        </svg>
      );
    case 2: // focus — converging lines
      return (
        <svg viewBox="0 0 36 36" className={common} aria-hidden="true">
          <path d="M4 6h28M8 14h20M12 22h12" {...stroke} />
          <circle cx="18" cy="30" r="2.5" fill="currentColor" />
        </svg>
      );
    case 3: // overload — dense to sparse dots
      return (
        <svg viewBox="0 0 36 36" className={common} aria-hidden="true">
          {[6, 11, 16, 21, 26, 31].map((x, i) => (
            <circle key={x} cx={x} cy={18} r={2.5 - i * 0.3} fill="currentColor" opacity={1 - i * 0.13} />
          ))}
        </svg>
      );
    case 4: // social — two arcs meeting
      return (
        <svg viewBox="0 0 36 36" className={common} aria-hidden="true">
          <path d="M6 26a8 8 0 0 1 8-12" {...stroke} />
          <path d="M30 26a8 8 0 0 0-8-12" {...stroke} opacity={0.55} />
          <circle cx="18" cy="20" r="2.5" fill="currentColor" />
        </svg>
      );
    default: // prepare — rising bars
      return (
        <svg viewBox="0 0 36 36" className={common} aria-hidden="true">
          <path d="M6 28V22M14 28V16M22 28V12M30 28V6" {...stroke} />
        </svg>
      );
  }
}
