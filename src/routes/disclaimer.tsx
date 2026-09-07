import { createFileRoute } from "@tanstack/react-router";

import { PageSection, PageShell } from "@/components/neometo/page-shell";

const title = "Disclaimer | NEOMETO";
const description =
  "NEOMETO provides self-help and educational training methods. It is not a medical service and does not provide diagnosis or treatment.";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/disclaimer" }],
  }),
  component: DisclaimerPage,
});

function DisclaimerPage() {
  return (
    <PageShell
      eyebrow="Disclaimer"
      title="What this is, and what it isn't."
      lead="NEOMETO provides self-help and educational training methods. It is not a medical service, does not provide diagnosis, and is not a substitute for professional care."
      closingLine="A method is a useful tool. It is not the only tool."
    >
      <PageSection heading="When to talk to someone qualified">
        <p>
          If something is significantly affecting your daily life, your work or your relationships,
          a method is not the right tool. Speak to a qualified professional. That's a different kind
          of help, and it's the one worth having.
        </p>
      </PageSection>

      <PageSection heading="Breathing methods">
        <p>
          Breathing should feel comfortable throughout. If you feel dizzy or unwell at any point,
          stop and return to normal breathing. There is no prize for pushing it.
        </p>
      </PageSection>

      <PageSection heading="No treatment claims">
        <p>
          Nothing on this site is a treatment claim. The methods here are training tools for
          everyday self-regulation, and what they do varies between people and between days.
        </p>
      </PageSection>

      <PageSection heading="Content and sources">
        <p>
          Methods draw on widely used practices from psychology, coaching and performance work. They
          are adapted for short, practical use, and the adaptation is ours — not an endorsement by
          anyone who developed the underlying practice.
        </p>
      </PageSection>
    </PageShell>
  );
}
