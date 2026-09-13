import { createFileRoute } from "@tanstack/react-router";

import { PageSection, PageShell } from "@/components/neometo/page-shell";

const title = "Privacy | NEOMETO";
const description =
  "What NEOMETO logs, why, and what it never collects. Plain language, plus the GDPR detail you're entitled to.";

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
    links: [{ rel: "canonical", href: "https://neometo.lovable.app/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Privacy"
      title="What we log, and what we never touch."
      lead="NEOMETO logs which methods people open and what they type into the box on the front page. Nothing is tied to a person. That's the whole of it — the rest of this page is the detail GDPR entitles you to."
      closingLine="You don't need to give anything up to use a useful method."
    >
      <p className="text-sm leading-relaxed text-muted-foreground">
        Some details on this page are still being finalised. Everything stated here about what we
        log is accurate today.
      </p>

      <PageSection heading="Who we are">{null}</PageSection>

      <PageSection heading="What we log">
        <p>
          Two things: the method you open, and the text you type into the input on the front page.
          Both are stored anonymously. There is no account, no email, no name, and nothing that
          links an entry back to you.
        </p>
        <p>
          To keep the advisor from being spammed, your network address is turned into an unreadable
          one-way code the moment a request arrives, used only to count recent requests, and cleared
          automatically. The address itself is never stored.
        </p>
      </PageSection>

      <PageSection heading="Why, and on what legal basis">
        <p>
          So we can see which methods people actually use, and what people are looking for that we
          haven't built yet. That's the whole purpose — it decides what gets improved and what gets
          made next.
        </p>
        <p>
          The legal basis is legitimate interest: understanding how the service is used so it can be
          improved. Because the data is not linked to a person, this does not involve profiling and
          no decision is ever made about an individual.
        </p>
      </PageSection>

      <PageSection heading="What we don't do">
        <p>
          We don't collect health data or make any claim about your health. We don't sell or share
          this data with third parties, and we don't use it for advertising. NEOMETO is a set of
          methods, not an assessment of anyone.
        </p>
      </PageSection>

      <PageSection heading="Cookies and analytics">{null}</PageSection>

      <PageSection heading="Who processes the data">
        <p>
          The anonymous logs are stored in Supabase, and the site is hosted through Lovable. Both
          act as processors on our behalf and are bound by their own data processing terms.
        </p>
      </PageSection>

      <PageSection heading="How long we keep it">{null}</PageSection>

      <PageSection heading="Your rights">
        <p>
          You have the right to request access to your personal data, to have it corrected or
          deleted, to restrict or object to how it's processed, and to receive it in a portable
          format. You can also lodge a complaint with your national data protection authority.
        </p>
        <p>
          One practical note: because nothing we store is linked to you, we usually can't find your
          data to return or delete it — there's no identifier to search by. That's a consequence of
          collecting as little as possible, not a way of avoiding the request.
        </p>
      </PageSection>

      <PageSection heading="Questions, or want it removed">
        <p>
          Write to hello@neometo.com and we'll tell you what we hold and delete anything you ask us
          to.
        </p>
      </PageSection>
    </PageShell>
  );
}
