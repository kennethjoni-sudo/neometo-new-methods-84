import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

import {
  BreathingCircle,
  ExperienceShell,
  usePrefersReducedMotion,
  type BreathStep,
} from "@/components/neometo/experience-kit";
import {
  BeginPhase,
  ClosePhase,
  PointPhase,
  ShrinkPhase,
  SpinPhase,
  TapCountPhase,
  TextSequencePhase,
  WordsPhase,
  type CloseAction,
  type ShrinkStage,
  type TapRound,
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
  | { type: "spin"; durationMs: number; instruction?: string; reverseAt?: number }
  | { type: "shrink"; durationMs: number; captions?: string[]; stages?: ShrinkStage[] }
  | { type: "words"; lines: string[]; stepMs: number }
  | { type: "tap-count"; rounds: TapRound[] }
  | { type: "point"; durationMs: number; instruction: string }
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
  /** Method slug, used for anonymous feedback logging. */
  slug?: string;
  /** Linear method: the ordered phases. Omit when the method opens on a selector. */
  phases?: PhaseConfig[];
  /** Multi-technique method: a selector screen listing techniques. */
  selector?: {
    title: string;
    subtitle: string;
    techniques: TechniqueConfig[];
  };
};

/* -------------------------------- Feedback -------------------------------- */

type FeedbackResponse = "yes" | "no" | "skip";

/** Fire-and-forget. Never blocks closing, never surfaces an error. */
function logFeedback(slug: string | undefined, techniqueId: string | null, response: FeedbackResponse) {
  if (!slug) return;
  void (async () => {
    try {
      await supabase.from("neometo_logs").insert({
        method_slug: slug,
        technique_id: techniqueId,
        response,
      });
    } catch {
      /* silent */
    }
  })();
}

function FeedbackPhase({ onRespond }: { onRespond: (response: FeedbackResponse) => void }) {
  return (
    <div className="text-center">
      <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">Did that help?</h2>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Button
          size="lg"
          className="min-h-[56px] rounded-full px-10 text-base"
          onClick={() => onRespond("yes")}
        >
          Yes
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="min-h-[56px] rounded-full border-background/30 bg-transparent px-10 text-base text-background hover:bg-background/10 hover:text-background"
          onClick={() => onRespond("no")}
        >
          Not really
        </Button>
      </div>
      <button
        type="button"
        onClick={() => onRespond("skip")}
        className="mt-8 inline-flex min-h-11 items-center justify-center text-sm text-background/50 underline-offset-4 transition-colors hover:text-background/80 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        Skip
      </button>
    </div>
  );
}

/* --------------------------------- Engine --------------------------------- */

const KNOWN_PHASE_TYPES = new Set<string>([
  "begin",
  "text-sequence",
  "breathe",
  "spin",
  "shrink",
  "words",
  "tap-count",
  "point",
  "close",
]);

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
  const [feedback, setFeedback] = useState(false);
  const [scrollAfter, setScrollAfter] = useState(false);

  const technique = config.selector?.techniques.find((t) => t.id === techniqueId) ?? null;
  const phases = config.selector ? technique?.phases : config.phases;
  const onSelector = Boolean(config.selector) && !technique;

  const toSelector = () => {
    setTechniqueId(null);
    setIndex(0);
  };

  const next = () => setIndex((i) => Math.min((phases?.length ?? 1) - 1, i + 1));

  const askFeedback = () => setFeedback(true);

  const respond = (response: FeedbackResponse) => {
    logFeedback(config.slug, techniqueId, response);
    onClose();
    if (scrollAfter) {
      requestAnimationFrame(() =>
        document.getElementById("methods")?.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    }
  };

  const runAction = (action: CloseAction["action"]) => {
    if (action === "close") return askFeedback();
    if (action === "restart") return setIndex(0);
    if (action === "select") return toSelector();
    setScrollAfter(true);
    setFeedback(true);
  };

  const phase = phases?.[index];

  // A phase type with no renderer would stall on a blank screen — skip past it.
  const unknownPhase = Boolean(phase) && !KNOWN_PHASE_TYPES.has(phase!.type);
  useEffect(() => {
    if (feedback || onSelector || !phase || !unknownPhase) return;
    console.warn(`Unknown method phase type: "${phase.type}" — skipping.`);
    if (index < (phases?.length ?? 0) - 1) next();
    else setFeedback(true);
  }, [unknownPhase, index, feedback, onSelector, phase, phases?.length]);

  return (
    <ExperienceShell
      label={config.label}
      onClose={onClose}
      onBack={config.selector && !onSelector && !feedback ? toSelector : undefined}
      backLabel="← Back"
    >
      {feedback && <FeedbackPhase onRespond={respond} />}

      {!feedback && onSelector && config.selector && (
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
                  className="group flex min-h-[64px] w-full items-center justify-between gap-4 rounded-3xl border border-background/15 bg-background/5 px-5 py-5 text-left transition-colors hover:border-brand/50 hover:bg-background/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:gap-6 sm:px-6"
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

      {!feedback && !onSelector && phase?.type === "begin" && (
        <BeginPhase
          title={phase.title}
          {...(phase.subtitle ? { subtitle: phase.subtitle } : {})}
          {...(phase.note ? { note: phase.note } : {})}
          {...(phase.buttonLabel ? { buttonLabel: phase.buttonLabel } : {})}
          onStart={next}
        />
      )}

      {!feedback && !onSelector && phase?.type === "text-sequence" && (
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

      {!feedback && !onSelector && phase?.type === "breathe" && (
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

      {!feedback && !onSelector && phase?.type === "spin" && (
        <SpinPhase
          key={`${techniqueId ?? "linear"}-${index}`}
          durationMs={phase.durationMs}
          {...(phase.instruction ? { instruction: phase.instruction } : {})}
          {...(phase.reverseAt !== undefined ? { reverseAt: phase.reverseAt } : {})}
          reduced={reduced}
          onDone={next}
        />
      )}

      {!feedback && !onSelector && phase?.type === "shrink" && (
        <ShrinkPhase
          key={`${techniqueId ?? "linear"}-${index}`}
          durationMs={phase.durationMs}
          {...(phase.captions ? { captions: phase.captions } : {})}
          {...(phase.stages ? { stages: phase.stages } : {})}
          reduced={reduced}
          onDone={next}
        />
      )}

      {!feedback && !onSelector && phase?.type === "words" && (
        <WordsPhase
          key={`${techniqueId ?? "linear"}-${index}`}
          lines={phase.lines}
          stepMs={phase.stepMs}
          reduced={reduced}
          onDone={next}
        />
      )}

      {!feedback && !onSelector && phase?.type === "tap-count" && (
        <TapCountPhase
          key={`${techniqueId ?? "linear"}-${index}`}
          rounds={phase.rounds}
          onDone={next}
        />
      )}

      {!feedback && !onSelector && phase?.type === "point" && (
        <PointPhase
          key={`${techniqueId ?? "linear"}-${index}`}
          durationMs={phase.durationMs}
          instruction={phase.instruction}
          reduced={reduced}
          onDone={next}
        />
      )}


      {!feedback && !onSelector && phase?.type === "close" && (
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
