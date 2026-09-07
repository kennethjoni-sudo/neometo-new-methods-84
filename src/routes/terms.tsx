import { createFileRoute, Link } from "@tanstack/react-router";

import { PagePlaceholder, PageSection, PageShell } from "@/components/neometo/page-shell";

const title = "Terms of Use | NEOMETO";
const description = "The terms that apply when you use NEOMETO's methods and website.";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <PageShell
      eyebrow="Terms"
      title="Terms of use."
      lead="These terms apply to everyone who uses this site and the methods on it."
      closingLine="Short terms, because the service is simple."
    >
      <PagePlaceholder>
        NOT FINAL LEGAL TEXT. The structure below is right and the plain-language sections are
        usable, but the marked blocks need your real company details and a review before you rely on
        this.
      </PagePlaceholder>

      <PageSection heading="Who these terms apply to">
        <p>Anyone who accesses this site or runs a method on it.</p>
        <PagePlaceholder>
          PLACEHOLDER — add a minimum age if you set one. 16 is the common floor in the EU for
          services that process any personal data without parental consent.
        </PagePlaceholder>
      </PageSection>

      <PageSection heading="What NEOMETO provides">
        <p>
          Short, guided training methods and educational content, provided as-is and free to use
          unless a page says otherwise. Methods run in your browser; there is no account and nothing
          to install.
        </p>
      </PageSection>

      <PageSection heading="What NEOMETO is not">
        <p>
          NEOMETO is not a medical service, does not provide diagnosis or treatment, and is not a
          substitute for professional care. The{" "}
          <Link
            to="/disclaimer"
            className="font-medium text-brand underline-offset-4 hover:underline"
          >
            disclaimer
          </Link>{" "}
          has the full wording.
        </p>
      </PageSection>

      <PageSection heading="Acceptable use">
        <p>
          Don't scrape the site, resell the methods, republish the content as your own, or try to
          disrupt the service for other people. Using a method yourself, sharing a link, or telling
          someone about it is all fine and encouraged.
        </p>
      </PageSection>

      <PageSection heading="Intellectual property">
        <PagePlaceholder>
          PLACEHOLDER — state who owns the method copy, the NEOMETO name, the wordmark and the
          visual system, and what visitors may do with it. Note that the underlying
