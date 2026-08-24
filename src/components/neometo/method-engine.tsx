import { useState } from "react";
import { ArrowRight } from "lucide-react";

import {
  BreathingCircle,
  ExperienceShell,
  usePrefersReducedMotion,
  type BreathStep,
} from "@/components/neometo/experience-kit";
import {
  BeginPhase,
  ClosePhase,
  SpinPhase,
  TextSequencePhase,
  type CloseAction,
} from "@/components/neometo/method-phases";

/* ------------------------------- Config types ------------------------------ */

export type PhaseConfig =
  | { type: "begin"; title: string; subtitle?: string; note?: string; buttonLabel?: string }
  | {
      type: "text-sequence";
      prompts: string[];
      stepMs: number;
      instruction?: string;
      counterPrefix?: string;
      visual?: "none" | "ring";
      size?: "md" | "lg";
    }
  | { type: "breathe"; pattern: BreathStep[]; cycles: number; instruction?: string; cycleNoun?: string }
  | { type: "spin"; durationMs: number; instruction?: string }
  | { type: "close"; heading: string; subheading?: string; actions: CloseAction[] };

export type TechniqueConfig = {
  id: string;
  title: string;
  meta: string;
  phases: PhaseConfig[];
};

export type MethodConfig = {
  /** Accessible dialog label, e.g. "Sleep method". */
  label: string;
  /** Linear method: the ordered phases. Omit when the method opens on a selector. */
  phases?: PhaseConfig[];
  /** Multi-technique method: a selector screen listing techniques. */
  selector?: {
    title: string;
    subtitle: string;
    techniques: TechniqueConfig[];
  };
};

/* --------------------------------- Engine --------------------------------- */

export function MethodExperience({
  config,
  onClose,
}: {
  config: MethodConfig;
  onClose: () => void;
}) {
  const reduced = usePrefersReducedMotion();
  const [techniqueId, setTechniqueId] = useState<string | null>(null);
  const [index, setIndex] = useState(0);

  const technique = config.selector?.techniques.find((t) => t.id === techniqueId) ?? null;
  const phases = config.selector ? technique?.phases : config.phases;
  const onSelector = Boolean(config.selector) && !technique;

  const toSelector = () => {
    setTechniqueId(null);
    setIndex(0);
  };

  const next = () => setIndex((i) => Math.min((phases?.length ?? 1) - 1, i + 1));

  const runAction = (action: CloseAction["action"]) => {
    if (action === "close") return onClose();
    if (action === "restart") return setIndex(0);
    if (action === "select") return toSelector();
    onClose();
    requestAnimationFrame(() =>
      document.getElementById("methods")?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  };

  const phase = phases?.[index];

  return (
    <ExperienceShell
      label={config.label}
      onClose={onClose}
      onBack={config.selector && !onSelector ? toSelector : undefined}
      backLabel="← Back"
    >
      {onSelector && config.selector && (
        <div className="text-center">
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
            {config.selector.title}
          </h2>
          <p className="mt-5 text-xl text-background/80 md:text-2xl">{config.selector.subtitle}</p>
          <ul className="mt-10 grid gap-4">
            {config.selector.techniques.map((t) => (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => {
                    setTechniqueId(t.id);
                    setIndex(0);
                  }}
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

      {!onSelector && phase?.type === "begin" && (
        <BeginPhase
          title={phase.title}
          {...(phase.subtitle ? { subtitle: phase.subtitle } : {})}
          {...(phase.note ? { note: phase.note } : {})}
          {...(phase.buttonLabel ? { buttonLabel: phase.buttonLabel } : {})}
          onStart={next}
        />
      )}

      {!onSelector && phase?.type === "text-sequence" && (
        <TextSequencePhase
          key={`${techniqueId ?? "linear"}-${index}`}
          prompts={phase.prompts}
          stepMs={phase.stepMs}
          {...(phase.instruction ? { instruction: phase.instruction } : {})}
          {...(phase.counterPrefix ? { counterPrefix: phase.counterPrefix } : {})}
          {...(phase.visual ? { visual: phase.visual } : {})}
          {...(phase.size ? { size: phase.size } : {})}
          reduced={reduced}
          onDone={next}
        />
      )}

      {!onSelector && phase?.type === "breathe" && (
        <BreathingCircle
          key={`${techniqueId ?? "linear"}-${index}`}
          reduced={reduced}
          pattern={phase.pattern}
          cycles={phase.cycles}
          {...(phase.instruction ? { instruction: phase.instruction } : {})}
          {...(phase.cycleNoun ? { cycleNoun: phase.cycleNoun } : {})}
          onDone={next}
        />
      )}

      {!onSelector && phase?.type === "spin" && (
        <SpinPhase
          key={`${techniqueId ?? "linear"}-${index}`}
          durationMs={phase.durationMs}
          {...(phase.instruction ? { instruction: phase.instruction } : {})}
          reduced={reduced}
          onDone={next}
        />
      )}

      {!onSelector && phase?.type === "close" && (
        <ClosePhase
          heading={phase.heading}
          {...(phase.subheading ? { subheading: phase.subheading } : {})}
          actions={phase.actions}
          onAction={runAction}
        />
      )}
    </ExperienceShell>
  );
}
