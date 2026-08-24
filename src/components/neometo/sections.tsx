import { useState } from "react";
import { ArrowRight, ArrowUp, Sparkles } from "lucide-react";

import flowArt from "@/assets/neometo-flow.png.asset.json";
import { Button } from "@/components/ui/button";
import { MethodGlyph, ParticleField } from "@/components/neometo/particle-field";
import { Reveal } from "@/components/neometo/reveal";
import { ThoughtSpinExperience } from "@/components/neometo/thought-spin";
import { SleepExperience } from "@/components/neometo/sleep";
import { FocusExperience } from "@/components/neometo/focus";


/* ---------------------------------- Hero --------------------------------- */

const chips = ["Overthinking", "Sleep", "Focus", "Overload"];

/** Erratic on the left, settling to nearly flat on the right. */
const WAVE_PATH =
  "M0 20 L14 6 L22 33 L34 3 L44 30 L56 9 L68 27 L82 13 L96 25 L112 15 L128 23 L146 18 L166 21 L188 19.5 L214 20.3 L244 20 L280 20 L320 20";

function goToAdvisor() {
  document.getElementById("advisor")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Hero() {
  const [value, setValue] = useState("");

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-ink pb-20 pt-20 text-background md:pb-28 md:pt-28"
    >
      {/* Edge dot motif — subtle, never centered. */}
      <div className="pointer-events-none absolute inset-0 dot-scatter opacity-30" aria-hidden="true" />

      <div className="section-shell relative">
        <div className="mx-auto max-w-3xl animate-rise text-center">
          <div className="relative mx-auto h-12 w-full max-w-md md:h-14">
            <svg
              viewBox="0 0 320 40"
              role="presentation"
              aria-hidden="true"
              className="absolute inset-0 size-full text-brand motion-safe:animate-wave-glow"
              style={{ filter: "drop-shadow(0 0 18px color-mix(in oklab, var(--brand) 55%, transparent))" }}
            >
              <defs>
                <linearGradient id="waveGradient" x1="0" y1="0" x2="100%" y2="0">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0.7" />
                  <stop offset="55%" stopColor="currentColor" stopOpacity="1" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0.5" />
                </linearGradient>
              </defs>
              <path
                d={WAVE_PATH}
                fill="none"
                stroke="url(#waveGradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="mt-8 text-sm font-semibold tracking-[0.14em] text-brand uppercase">
            A personality hack, not a diagnosis.
          </p>
          <h1 className="mt-5 text-[2.75rem] font-bold leading-[1.02] sm:text-6xl lg:text-[4rem]">
            New Methods for Modern Minds.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-background/70 md:text-lg">
            Practical methods for focus, sleep, and overthinking — for the moments when your mind
            needs another way.
          </p>


          <form
            onSubmit={(e) => {
              e.preventDefault();
              goToAdvisor();
            }}
            className="mx-auto mt-10 flex w-full max-w-xl items-center gap-3 rounded-2xl border-[0.5px] border-ink-line bg-ink-raised p-2 pl-5 shadow-lift"
          >
            <label htmlFor="hero-input" className="sr-only">
              What&apos;s going on right now?
            </label>
            <input
              id="hero-input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="What's going on right now?"
              className="h-11 flex-1 bg-transparent text-base text-background outline-none placeholder:text-background/45"
            />
            <button
              type="submit"
              aria-label="Ask NEOMETO"
              className="grid size-11 shrink-0 place-items-center rounded-full bg-brand text-white transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              <ArrowUp className="size-5" />
            </button>
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {chips.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={goToAdvisor}
                className="rounded-[14px] border-[0.5px] border-ink-line bg-ink-raised px-4 py-2 text-sm font-medium text-accent transition-colors hover:border-brand"
              >
                {chip}
              </button>
            ))}
            <a
              href="#methods"
              className="rounded-[14px] bg-brand px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              + more coming soon
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


/* -------------------------------- Problems -------------------------------- */

const problems = [
  { title: "Thoughts won't stop spinning?", hint: "Get a method to slow them down.", available: true },
  { title: "Mind still running at 2am?", hint: "Fall asleep faster, tonight.", available: true, method: "sleep" as const },
  { title: "Can't hold focus for more than a minute?", hint: "Sharpen it, fast.", available: false },
  { title: "Everything hitting at once?", hint: "Bring it down to one thing at a time.", available: false },
  { title: "Replaying every conversation afterward?", hint: "Prepare beforehand, recover faster after.", available: false },
  { title: "Something big coming up?", hint: "Walk in steadier.", available: false },
];

export function Problems() {
  const [sleepOpen, setSleepOpen] = useState(false);

  return (
    <section id="methods" className="scroll-mt-24 py-20 md:py-28">
      {sleepOpen && <SleepExperience onClose={() => setSleepOpen(false)} />}
      <div className="section-shell">
        <Reveal>
          <h2 className="max-w-2xl text-[1.75rem] font-bold leading-tight text-ink md:text-[2.5rem]">
            What do you want to get better at?
          </h2>
        </Reveal>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem, i) => (
            <Reveal as="li" key={problem.title} delay={i * 70} className="h-full">
              <button
                type="button"
                onClick={
                  "method" in problem && problem.method === "sleep"
                    ? () => setSleepOpen(true)
                    : undefined
                }
                className="group relative flex h-full min-h-[260px] w-full flex-col items-start overflow-hidden rounded-3xl border border-border bg-surface p-7 text-left shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <span className="absolute -right-10 -top-10 size-28 rounded-full bg-brand-soft opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                {!problem.available && (
                  <span className="absolute right-4 top-4 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                    Coming soon
                  </span>
                )}
                <span className="relative">
                  <MethodGlyph variant={i} />
                </span>
                <span className="relative mt-6 font-display text-xl font-bold leading-snug tracking-[-0.015em] text-ink">
                  {problem.title}
                </span>
                <span className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                  {problem.hint}
                </span>
                <span
                  className={`relative mt-auto inline-flex items-center gap-2 text-sm font-semibold ${
                    problem.available ? "text-brand" : "text-muted-foreground"
                  }`}
                >
                  {problem.available ? "Find a method" : "Notify me"}
                  <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
        <Reveal>
          <a
            href="#advisor"
            className="mt-8 inline-flex items-center gap-2 rounded-full text-sm font-semibold text-ink transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            Something else <ArrowRight className="size-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------- Positioning ------------------------------- */

export function Manifesto() {
  return (
    <section className="py-20 md:py-28">
      <Reveal className="section-shell grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <svg
            viewBox="0 0 320 40"
            role="presentation"
            aria-hidden="true"
            className="mb-6 h-8 w-full max-w-[208px] text-brand opacity-90"
          >
            <path
              d={WAVE_PATH}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h2 className="text-[1.75rem] font-bold leading-tight text-ink md:text-[2.5rem]">
            You don&apos;t always need another explanation. Sometimes you need a method.
          </h2>
        </div>
        <div className="space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
          <p>
            NEOMETO explores practical methods for improving focus, sleep, and mental clarity —
            from cognitive and behavioral techniques to guided visualization. We explain how each
            method works and when it may be worth trying.
          </p>
          <p>
            Useful methods already exist across psychology, research, coaching, neuroscience and
            lived experience.
          </p>
          <p>The hard part is finding the right one when you actually need it.</p>
          <p className="font-medium text-ink">
            NEOMETO brings practical methods together and makes them simple to find and use.
          </p>
        </div>

      </Reveal>
    </section>
  );
}


/* ------------------------------- How it works ------------------------------ */

const steps = [
  { number: "01", title: "Tell us what's happening." },
  { number: "02", title: "Find a method." },
  { number: "03", title: "Try it now." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 py-20 md:py-28">
      <div className="section-shell">
        <Reveal>
          <h2 className="eyebrow">How it works</h2>
        </Reveal>
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal as="li" key={step.number} delay={i * 120}>
              <div className="h-full rounded-3xl border border-border bg-surface p-8 shadow-soft transition-transform duration-500 hover:-translate-y-1">
                <span className="block text-5xl font-bold tracking-tight text-brand-soft">
                  {step.number}
                </span>
                <h3 className="mt-6 text-xl font-bold text-ink md:text-[1.75rem]">{step.title}</h3>
              </div>
            </Reveal>
          ))}
        </ol>
        <Reveal>
          <p className="mt-10 text-lg font-semibold text-success">No label required.</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------- Featured method ----------------------------- */

export function FeaturedMethod() {
  const [open, setOpen] = useState(false);

  return (
    <section className="py-20 md:py-28">
      {open && <ThoughtSpinExperience onClose={() => setOpen(false)} />}
      <Reveal className="section-shell">
        <article className="group grid gap-10 overflow-hidden rounded-4xl border border-border bg-surface p-8 shadow-soft transition-shadow duration-700 hover:shadow-lift md:grid-cols-[1fr_0.8fr] md:items-center md:p-14">
          <div>
            <p className="mb-3 text-xs font-semibold tracking-wide text-brand uppercase">
              Don&apos;t trust our words. Trust the result.
            </p>
            <h2 className="mt-5 text-[1.75rem] font-bold text-ink md:text-[2.5rem]">
              Thought Spin
            </h2>
            <p className="mt-3 text-sm font-semibold text-brand">2–3 minutes</p>
            <p className="mt-6 text-xl font-medium leading-snug text-ink md:text-[1.75rem]">
              &ldquo;When your thoughts won&apos;t slow down.&rdquo;
            </p>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
              A short guided visualization designed to interrupt repetitive thinking and create
              mental distance.
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Why it works: shifting attention to a simple visual pattern interrupts the
              automatic loop of repetitive thinking, creating enough distance to respond instead
              of react.
            </p>
            <Button
              size="lg"
              className="mt-9 rounded-full px-8 text-base"
              onClick={() => setOpen(true)}
            >
              Try Thought Spin
            </Button>
          </div>
          <div className="relative aspect-square w-full max-w-sm justify-self-center overflow-hidden rounded-3xl bg-background transition-all duration-500 motion-safe:group-hover:scale-[1.02] motion-safe:group-hover:shadow-[0_0_40px_rgba(79,110,247,0.18)] motion-safe:group-active:scale-[1.02]">
            <img
              src={flowArt.url}
              alt="Abstract blue particle streams spiralling from a chaotic tangle into a calm, ordered ring — the Thought Spin method visual."
              loading="lazy"
              className="absolute inset-0 size-full object-cover opacity-80"
            />

            <ParticleField mode="orbit" className="absolute inset-6" />
          </div>

        </article>
      </Reveal>
    </section>
  );
}


/* -------------------------------- AI advisor ------------------------------- */

export function Advisor() {
  return (
    <section id="advisor" className="scroll-mt-24 py-20 md:py-28">
      <Reveal className="section-shell grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="text-[1.75rem] font-bold leading-tight text-ink md:text-[2.5rem]">
            Not sure what method you need?
          </h2>
          <Button asChild size="lg" className="mt-8 rounded-full px-8 text-base">
            <a href="#final-cta">
              <Sparkles className="size-4" />
              Ask NEOMETO
            </a>
          </Button>
          <p className="mt-6 max-w-md text-xs leading-relaxed text-muted-foreground">
            NEOMETO provides self-help and educational tools, not medical diagnosis.
          </p>
        </div>
        <div className="rounded-4xl border border-border bg-surface p-6 shadow-soft md:p-8">
          <h3 className="sr-only">Example conversation with NEOMETO</h3>
          <div className="flex justify-end">
            <p className="max-w-[80%] rounded-3xl rounded-br-lg bg-ink px-5 py-4 text-sm leading-relaxed text-background md:text-base">
              I need to sleep but my thoughts won&apos;t stop.
            </p>
          </div>
          <div className="mt-4 flex justify-start">
            <p className="max-w-[80%] rounded-3xl rounded-bl-lg bg-brand-soft px-5 py-4 text-sm leading-relaxed text-ink md:text-base">
              Let&apos;s start with a 2-minute method.
            </p>
          </div>
          <div className="mt-5 flex items-center gap-1.5 pl-2" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="size-2 rounded-full bg-brand animate-pulse-soft"
                style={{ animationDelay: `${i * 0.25}s` }}
              />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* -------------------------------- Philosophy ------------------------------- */

export function Philosophy() {
  return (
    <section id="philosophy" className="scroll-mt-24 py-20 md:py-28">
      <Reveal className="section-shell">
        <div className="relative overflow-hidden rounded-4xl bg-ink px-7 py-16 text-background md:px-16 md:py-24">
          <h2 className="relative max-w-3xl text-[1.75rem] font-bold leading-tight md:text-[2.75rem]">
            Your mind is a skill. Not a diagnosis.
          </h2>
          <div className="relative mt-8 max-w-2xl space-y-4 text-base leading-relaxed opacity-80 md:text-lg">
            <p>
              NEOMETO isn&apos;t built around a diagnosis. It&apos;s built around a pattern
              you&apos;ve noticed — even if you&apos;ve never had a name for it, even if
              you&apos;ve managed it quietly for years.
            </p>
            <p className="font-medium opacity-100">
              You don&apos;t need a label to train a skill.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* -------------------------------- Coming next ------------------------------ */

const areas = ["Thoughts", "Focus", "Sleep", "Communication", "Preparation", "Overload"];

export function Coming() {
  return (
    <section id="coming" className="scroll-mt-24 py-20 md:py-28">
      <div className="section-shell">
        <Reveal>
          <h2 className="text-[1.75rem] font-bold text-ink md:text-[2.5rem]">
            One method becomes many.
          </h2>
        </Reveal>
        <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {areas.map((area, i) => (
            <Reveal as="li" key={area} delay={i * 60}>
              <div className="rounded-2xl border border-border bg-surface px-5 py-8 text-center text-sm font-semibold text-ink shadow-soft transition-transform duration-500 hover:-translate-y-1">
                {area}
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------- Final CTA -------------------------------- */

export function FinalCta() {
  return (
    <section id="final-cta" className="scroll-mt-24 py-24 md:py-36">
      <div className="section-shell relative text-center">
        <Reveal className="relative">
          <h2 className="text-[1.75rem] font-bold text-ink md:text-[3.25rem]">
            What will you train today?
          </h2>
          <Button asChild size="lg" className="mt-10 rounded-full px-10 text-base">
            <a href="#methods">Start training</a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
