import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUp } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";

import { ExperienceShell } from "@/components/neometo/experience-kit";
import { advise } from "@/lib/advisor.functions";
import { logEvent } from "@/lib/analytics";
import { requestMethod, type MethodSlug, type SeedReply } from "@/lib/open-method";

type Turn = {
  role: "person" | "neometo";
  content: string;
  method?: MethodSlug | null;
  crisis?: boolean;
};

const METHOD_LABELS: Record<MethodSlug, string> = {
  spin: "Thought Spin",
  sleep: "Sleep",
  focus: "Focus",
  overload: "Overload",
  social: "Replaying it",
  prepare: "Walk in steadier",
};

export function UnloadExperience({
  onClose,
  seed,
  seedReply,
}: {
  onClose: () => void;
  seed?: string | undefined;
  seedReply?: SeedReply | undefined;
}) {
  const [started, setStarted] = useState(Boolean(seed));
  const [turns, setTurns] = useState<Turn[]>([]);
  const [value, setValue] = useState("");
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);
  const askAdvisor = useServerFn(advise);
  const endRef = useRef<HTMLDivElement>(null);
  const seededRef = useRef(false);

  const send = async (text: string, history: Turn[]) => {
    setPending(true);
    setFailed(false);
    logEvent("unload_turn", { chars: String(text.length) });
    try {
      const result = await askAdvisor({
        data: {
          text,
          mode: "unload" as const,
          history: history.map((t) => ({ role: t.role, content: t.content })),
        },
      });
      setTurns((prev) => [
        ...prev,
        {
          role: "neometo",
          content: result.reply,
          method: result.intent === "crisis" ? null : result.method,
          crisis: result.intent === "crisis",
        },
      ]);
    } catch {
      setFailed(true);
    } finally {
      setPending(false);
    }
  };

  // Pre-seeded first message from the hero input.
  useEffect(() => {
    if (!seed || seededRef.current) return;
    seededRef.current = true;
    const first: Turn = { role: "person", content: seed };
    if (seedReply) {
      setTurns([
        first,
        {
          role: "neometo",
          content: seedReply.content,
          method: seedReply.crisis ? null : seedReply.method,
          crisis: seedReply.crisis,
        },
      ]);
      return;
    }
    setTurns([first]);
    void send(seed, []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [turns, pending]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = value.trim();
    if (!text || pending) return;
    const history = turns;
    setTurns((prev) => [...prev, { role: "person", content: text }]);
    setValue("");
    void send(text, history);
  };

  return (
    <ExperienceShell label="Unload" onClose={onClose}>
      {!started ? (
        <div className="text-center">
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">Unload</h2>
          <p className="mt-5 text-xl leading-relaxed text-background/80 md:text-2xl">
            Get it off your chest. Say as much or as little as you want.
          </p>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-background/50">
            No steps, no timer. NEOMETO listens and can point to a method if one fits — nothing is
            saved to you.
          </p>
          <button
            type="button"
            onClick={() => {
              logEvent("unload_opened", { source: "begin" });
              setStarted(true);
            }}
            className="mt-10 rounded-full bg-brand px-10 py-4 text-base font-semibold text-background transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            Begin
          </button>
        </div>
      ) : (
        <div className="flex flex-col">
          <h2 className="font-display text-2xl font-bold tracking-tight">Unload</h2>
          <p className="mt-1 text-sm text-background/50">Say as much or as little as you want.</p>

          <div className="mt-8 space-y-4" aria-live="polite">
            {turns.map((turn, i) => (
              <div
                key={i}
                className={turn.role === "person" ? "flex justify-end" : "flex justify-start"}
              >
                <div className="max-w-[85%]">
                  <p
                    className={`rounded-3xl px-5 py-4 text-sm leading-relaxed md:text-base ${
                      turn.role === "person"
                        ? "rounded-br-lg bg-background/10 text-background"
                        : turn.crisis
                          ? "rounded-bl-lg border border-brand/60 bg-brand/10 text-background"
                          : "rounded-bl-lg bg-brand/20 text-background"
                    }`}
                  >
                    {turn.content}
                  </p>
                  {turn.role === "neometo" && turn.method && (
                    <button
                      type="button"
                      onClick={() => {
                        const slug = turn.method as MethodSlug;
                        onClose();
                        requestAnimationFrame(() => requestMethod(slug));
                      }}
                      className="group mt-3 flex w-full items-center justify-between gap-4 rounded-2xl border border-background/15 bg-background/5 px-5 py-4 text-left transition-colors hover:border-brand/50 hover:bg-background/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                    >
                      <span>
                        <span className="block text-xs tracking-[0.14em] text-background/50 uppercase">
                          If you want it
                        </span>
                        <span className="mt-1 block font-display text-lg font-bold tracking-tight">
                          {METHOD_LABELS[turn.method]}
                        </span>
                      </span>
                      <ArrowRight className="size-5 shrink-0 text-brand transition-transform duration-500 group-hover:translate-x-1" />
                    </button>
                  )}
                </div>
              </div>
            ))}

            {pending && (
              <div className="flex items-center gap-1.5 pl-3" aria-label="NEOMETO is reading">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="size-2 animate-pulse rounded-full bg-brand/70"
                    style={{ animationDelay: `${i * 150}ms` }}
                  />
                ))}
              </div>
            )}

            {failed && (
              <p className="text-sm text-background/60">
                That didn&apos;t come through. Try sending it again.
              </p>
            )}
          </div>

          <form
            onSubmit={submit}
            className="sticky bottom-0 mt-8 flex items-end gap-3 rounded-2xl border-[0.5px] border-ink-line bg-ink-raised p-2 pl-5"
          >
            <label htmlFor="unload-input" className="sr-only">
              Say what&apos;s on your mind
            </label>
            <textarea
              id="unload-input"
              value={value}
              rows={1}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) submit(e);
              }}
              placeholder="Say what's on your mind…"
              className="max-h-40 min-h-11 flex-1 resize-none bg-transparent py-3 text-base text-background outline-none placeholder:text-background/45"
            />
            <button
              type="submit"
              aria-label="Send"
              disabled={pending}
              className="mb-1 grid size-11 shrink-0 place-items-center rounded-full bg-brand text-background transition-transform duration-300 hover:scale-105 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <ArrowUp className="size-5" />
            </button>
          </form>

          <button
            type="button"
            onClick={onClose}
            className="mx-auto mt-6 rounded-full px-5 py-2 text-sm font-medium text-background/55 transition-colors hover:bg-background/10 hover:text-background"
          >
            Done for now
          </button>
        </div>
      )}
    </ExperienceShell>
  );
}
