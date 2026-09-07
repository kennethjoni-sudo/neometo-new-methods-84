import { createFileRoute, Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/neometo/site-footer";

const title = "Privacy | NEOMETO";
const description =
  "What NEOMETO logs, why, and what it never collects. Plain language, no legal wall of text.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrivacyPage,
});

const sections = [
  {
    heading: "What we log",
    body: "Two things: the method you open, and the text you type into the input on the front page. Both are stored anonymously. There is no account, no email, no name, and nothing that links an entry back to you. To keep the advisor from being spammed, your network address is turned into an unreadable one-way code the moment a request arrives, used only to count recent requests, and cleared automatically — the address itself is never stored.",

  },
  {
    heading: "Why",
    body: "So we can see which methods people actually use, and what people are looking for that we haven't built yet. That's the whole purpose — it decides what gets improved and what gets made next.",
  },
  {
    heading: "What we don't do",
    body: "We don't collect health data or make any claim about your health. We don't sell or share this data with third parties, and we don't use it for advertising. NEOMETO is a set of methods, not an assessment of anyone.",
  },
];

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="section-shell flex h-16 items-center justify-between md:h-20">
          <Link
            to="/"
            className="text-base font-bold tracking-[0.22em] text-ink transition-opacity hover:opacity-70"
          >
            NEOMETO
          </Link>
          <Button asChild size="sm" className="rounded-full px-5">
            <Link to="/">Find a method</Link>
          </Button>
        </div>
      </header>

      <main className="section-shell py-20 md:py-28">
        <article className="mx-auto max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">Privacy</p>
          <h1 className="mt-5 text-[2.5rem] font-bold leading-[1.05] text-ink sm:text-5xl">
            What we log, and what we never touch.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            NEOMETO logs which methods people open and what they type into the &ldquo;what&apos;s
            going on right now&rdquo; box. Nothing is tied to a person. That&apos;s the whole of it.
          </p>

          <div className="mt-14 space-y-10">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-bold text-ink">{section.heading}</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">{section.body}</p>
              </section>
            ))}

            <section>
              <h2 className="text-2xl font-bold text-ink">Questions, or want it removed</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Write to{" "}
                <a
                  href="mailto:hello@neometo.com"
                  className="font-medium text-brand underline-offset-4 hover:underline"
                >
                  hello@neometo.com
                </a>{" "}
                and we&apos;ll tell you what we hold and delete anything you ask us to.
              </p>
            </section>
          </div>

          <div className="mt-16 rounded-2xl border-[0.5px] border-border bg-surface p-8">
            <p className="text-lg font-medium text-ink">
              You don&apos;t need to give anything up to use a useful method.
            </p>
            <Button asChild className="mt-6 rounded-full px-6">
              <Link to="/">Back to the methods</Link>
            </Button>
          </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
