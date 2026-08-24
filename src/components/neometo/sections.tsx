import { ArrowRight, Sparkles } from "lucide-react";

import flowArt from "@/assets/neometo-flow.png.asset.json";
import { Button } from "@/components/ui/button";
import { MethodGlyph, ParticleField } from "@/components/neometo/particle-field";
import { Reveal } from "@/components/neometo/reveal";

/* ---------------------------------- Hero --------------------------------- */

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-border bg-background pb-20 pt-16 md:pb-32 md:pt-28"
    >
      <div className="grid-fade absolute inset-0" aria-hidden="true" />
      <div className="dot-scatter pointer-events-none absolute inset-0" aria-hidden="true" />
      <ParticleField className="absolute inset-x-0 top-8 mx-auto hidden h-[380px] max-w-5xl opacity-40 md:block" />
      <div className="section-shell relative">
        <div className="max-w-3xl animate-rise">
          <p className="eyebrow">NEOMETO — New Method</p>
          <h1 className="mt-6 text-[2.75rem] font-bold leading-[1.02] text-ink sm:text-6xl lg:text-[4rem]">
            New Methods for Modern Minds.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Practical methods for the moments when your mind needs another way.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-full px-8 text-base shadow-soft">
              <a href="#methods">Find a method</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-ink/15 bg-surface px-8 text-base hover:bg-accent"
            >
              <a href="#how-it-works">Explore NEOMETO</a>
            </Button>
          </div>
          <p className="mt-10 text-base font-medium text-ink/70">
            A better method might be all you need.
          </p>
        </div>
      </div>
    </section>
  );
}


/* -------------------------------- Problems -------------------------------- */

const problems = [
  { title: "Thoughts won't stop spinning?", hint: "Get a method to slow them down." },
  { title: "Mind still running at 2am?", hint: "Fall asleep faster, tonight." },
  { title: "Can't hold focus for more than a minute?", hint: "Sharpen it, fast." },
  { title: "Everything hitting at once?", hint: "Bring it down to one thing at a time." },
  { title: "Replaying every conversation afterward?", hint: "Prepare beforehand, recover faster after." },
  { title: "Something big coming up?", hint: "Walk in steadier." },
];

export function Problems() {
  return (
    <section id="methods" className="scroll-mt-24 py-20 md:py-28">
      <div className="section-shell">
        <Reveal>
          <h2 className="max-w-2xl text-[1.75rem] font-extrabold leading-tight text-ink md:text-[2.5rem]">
            What do you want to handle better?
          </h2>
        </Reveal>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem, i) => (
            <Reveal as="li" key={problem.title} delay={i * 70}>
              <button
                type="button"
                className="group relative flex h-full w-full flex-col items-start overflow-hidden rounded-3xl border border-border bg-surface p-7 text-left shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <span className="absolute -right-10 -top-10 size-28 rounded-full bg-brand-soft opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="relative">
                  <MethodGlyph variant={i} />
                </span>
                <span className="relative mt-6 font-display text-xl font-bold leading-snug tracking-[-0.015em] text-ink">
                  {problem.title}
                </span>
                <span className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                  {problem.hint}
                </span>
                <span className="relative mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                  Find a method
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
        <h2 className="text-[1.75rem] font-extrabold leading-tight text-ink md:text-[2.5rem]">
          You don&apos;t always need another explanation. Sometimes you need a method.
        </h2>
        <div className="space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
          <p>
            Useful methods already exist across psychology, research, coaching, neuroscience and
            lived experience.
          </p>
          <p>The problem is finding the right one when you actually need it.</p>
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
                <span className="block text-5xl font-extrabold tracking-tight text-brand-soft">
                  {step.number}
                </span>
                <h3 className="mt-6 text-xl font-bold text-ink md:text-[1.75rem]">{step.title}</h3>
              </div>
            </Reveal>
          ))}
        </ol>
        <Reveal>
          <p className="mt-10 text-lg font-semibold text-success">No diagnosis required.</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------- Featured method ----------------------------- */

export function FeaturedMethod() {
  return (
    <section className="py-20 md:py-28">
      <Reveal className="section-shell">
        <article className="grid gap-10 overflow-hidden rounded-4xl border border-border bg-surface p-8 shadow-soft transition-shadow duration-700 hover:shadow-lift md:grid-cols-[1fr_0.8fr] md:items-center md:p-14">
          <div>
            <p className="eyebrow">Featured method</p>
            <h2 className="mt-5 text-[1.75rem] font-extrabold text-ink md:text-[2.5rem]">
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
            <Button asChild size="lg" className="mt-9 rounded-full px-8 text-base">
              <a href="#advisor">Try Thought Spin</a>
            </Button>
          </div>
          <div className="relative aspect-square w-full max-w-sm justify-self-center overflow-hidden rounded-3xl bg-background">
            <img
              src={flowArt.url}
              alt=""
              aria-hidden="true"
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
          <h2 className="text-[1.75rem] font-extrabold leading-tight text-ink md:text-[2.5rem]">
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
            This isn&apos;t for people with a problem. It&apos;s for people who want more control
            over their own mind.
          </h2>
          <div className="relative mt-8 max-w-2xl space-y-4 text-base leading-relaxed opacity-80 md:text-lg">
            <p>
              NEOMETO isn&apos;t built around a diagnosis. It&apos;s built around a pattern
              you&apos;ve noticed — even if you&apos;ve never had a name for it, even if
              you&apos;ve managed it quietly for years.
            </p>
            <p className="font-medium opacity-100">
              You don&apos;t need a label to use a useful method.
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
          <h2 className="text-[1.75rem] font-extrabold text-ink md:text-[2.5rem]">
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
        <ParticleField className="absolute inset-x-0 -top-6 mx-auto h-56 max-w-2xl opacity-50" />
        <Reveal className="relative">
          <h2 className="text-[1.75rem] font-extrabold text-ink md:text-[3.25rem]">
            What could you handle better today?
          </h2>
          <Button asChild size="lg" className="mt-10 rounded-full px-10 text-base">
            <a href="#methods">Find your method</a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
