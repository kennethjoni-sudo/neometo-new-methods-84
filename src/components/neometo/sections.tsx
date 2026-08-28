import { useState } from "react";
import { ArrowRight, ArrowUp, Sparkles } from "lucide-react";

import flowArt from "@/assets/neometo-flow.png.asset.json";
import { Button } from "@/components/ui/button";
import { MethodGlyph, ParticleField } from "@/components/neometo/particle-field";
import { Reveal } from "@/components/neometo/reveal";
import { ThoughtSpinExperience } from "@/components/neometo/thought-spin";
import { SleepExperience } from "@/components/neometo/sleep";
import { FocusExperience } from "@/components/neometo/focus";
import { OverloadExperience } from "@/components/neometo/overload";
import { SocialExperience } from "@/components/neometo/social";
import { PrepareExperience } from "@/components/neometo/prepare";



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
            <a href="#methods" className="rounded-[14px] bg-brand px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90">
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
  { title: "Thoughts won't stop spinning?", hint: "Get a method to slow them down.", available: true, method: "spin" as const },
  { title: "Mind still running at 2am?", hint: "Fall asleep faster, tonight.", available: true, method: "sleep" as const },
  { title: "Can't hold focus for more than a minute?", hint: "Sharpen it, fast.", available: true, method: "focus" as const },
  { title: "Everything hitting at once?", hint: "Bring it down to one thing at a time.", available: true, method: "overload" as const },
  { title: "Replaying every conversation afterward?", hint: "Prepare beforehand, recover faster after.", available: true, method: "social" as const },
  { title: "Something big coming up?", hint: "Walk in steadier.", available: true, method: "prepare" as const },
];

export function Problems() {
  const [sleepOpen, setSleepOpen] = useState(false);
  const [focusOpen, setFocusOpen] = useState(false);
  const [spinOpen, setSpinOpen] = useState(false);

  const [overloadOpen, setOverloadOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);
  const [prepareOpen, setPrepareOpen] = useState(false);

  return (
    <section id="methods" className="scroll-mt-24 py-20 md:py-28">
      {sleepOpen && <SleepExperience onClose={() => setSleepOpen(false)} />}
      {focusOpen && <FocusExperience onClose={() => setFocusOpen(false)}
