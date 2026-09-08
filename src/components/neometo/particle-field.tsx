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

type MethodGlyphName = "spin" | "sleep" | "focus" | "overload" | "social" | "prepare" | "friction" | "unload";

/** Distinct, stable abstract glyphs used on the method cards. */
export function MethodGlyph({ method }: { method: MethodGlyphName }) {
  const common = "size-14 text-brand";
  const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const };

  switch (method) {
    case "spin": // tangled line resolving
      return (
        <svg viewBox="0 0 36 36" className={common} aria-hidden="true">
          <path d="M4 10c6-8 12 8 18 0s8 2 10 4" {...stroke} />
          <path d="M4 24h28" {...stroke} opacity={0.75} />
        </svg>
      );
    case "sleep": // crescent and settling line
      return (
        <svg viewBox="0 0 36 36" className={common} aria-hidden="true">
          <path d="M24 5a13 13 0 1 0 7 22 11 11 0 0 1-7-22Z" {...stroke} />
          <path d="M5 30h17" {...stroke} opacity={0.65} />
        </svg>
      );
    case "focus": // concentric target
      return (
        <svg viewBox="0 0 36 36" className={common} aria-hidden="true">
          <circle cx="18" cy="18" r="13" {...stroke} opacity={0.45} />
          <circle cx="18" cy="18" r="7" {...stroke} opacity={0.75} />
          <circle cx="18" cy="18" r="2.5" fill="currentColor" />
        </svg>
      );
    case "overload": // many points narrowing to one
      return (
        <svg viewBox="0 0 36 36" className={common} aria-hidden="true">
          <circle cx="7" cy="7" r="2" fill="currentColor" opacity={0.45} />
          <circle cx="17" cy="6" r="2" fill="currentColor" opacity={0.55} />
          <circle cx="28" cy="9" r="2" fill="currentColor" opacity={0.65} />
          <circle cx="9" cy="17" r="2" fill="currentColor" opacity={0.55} />
          <circle cx="26" cy="19" r="2" fill="currentColor" opacity={0.75} />
          <path d="M7 25 18 31l11-6" {...stroke} />
          <circle cx="18" cy="31" r="2.5" fill="currentColor" />
        </svg>
      );
    case "social": // two speech lines meeting
      return (
        <svg viewBox="0 0 36 36" className={common} aria-hidden="true">
          <path d="M4 7h18v12H11l-5 5V19H4Z" {...stroke} />
          <path d="M17 23h8l5 5v-5h2V12h-6" {...stroke} opacity={0.7} />
        </svg>
      );
    case "prepare": // path toward a marker
      return (
        <svg viewBox="0 0 36 36" className={common} aria-hidden="true">
          <path d="M5 30c8 0 5-10 13-10s5-10 13-10" {...stroke} />
          <path d="M25 5h6v10" {...stroke} />
          <circle cx="5" cy="30" r="2.5" fill="currentColor" />
        </svg>
      );
    case "friction": // first move through a threshold
      return (
        <svg viewBox="0 0 36 36" className={common} aria-hidden="true">
          <path d="M6 18h20" {...stroke} />
          <path d="m20 12 6 6-6 6" {...stroke} />
          <path d="M30 7v22" {...stroke} opacity={0.55} />
          <circle cx="6" cy="18" r="2.5" fill="currentColor" />
        </svg>
      );
    case "unload": // open container receiving a thought
      return (
        <svg viewBox="0 0 36 36" className={common} aria-hidden="true">
          <path d="M7 19v11h22V19" {...stroke} />
          <path d="M18 5v17m0 0-6-6m6 6 6-6" {...stroke} />
        </svg>
      );
  }
}

