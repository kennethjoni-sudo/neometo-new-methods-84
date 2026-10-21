import { createFileRoute, Link } from "@tanstack/react-router";

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
      title="What we keep. What stays with you."
      lead="The guided methods don't need an account or anything typed about you. We record method choices and optional feedback. Mind Unloader uses AI to respond to what you choose to share."
      closingLine="Choose a method without sharing a word."
    >
      <PageSection heading="Who we are">
        <p>NEOMETO is an independently built collection of practical methods for the mind. For privacy questions, use the contact page below.</p>
      </PageSection>

      <PageSection heading="What we log">
        <p>
          Product logs contain a method choice, where an opening came from when recorded, and a timestamp.
          For Mind Unloader, we record openings and message character counts, not the message text.
          The optional “Did that help?” response stores the method, technique, answer and timestamp.
          These logs do not include a name, email address or account identifier.
        </p>
        <p>
          The former homepage search field has been removed. New product logs do not store raw search text.
          Older logs may contain text entered into that former field; removing the field does not erase those existing records.
        </p>
      </PageSection>

      <PageSection heading="When you use Mind Unloader">
        <p>
          Your message and the recent conversation are sent to Lovable&apos;s AI service to generate a reply.
          This is separate from product analytics. NEOMETO does not save the conversation to its application database;
          it stays in the open conversation until you close it or leave the page.
        </p>
        <p>
          AI processing still means another service receives the text. Its operational logs and retention are governed
          by that service&apos;s policies, not by the fact that NEOMETO does not save a transcript.
          Avoid names, contact details or anything you do not want to share with an AI service.
        </p>
        <p>
          For abuse prevention, the AI request may use a salted, one-way code derived from your network address.
          The limiter stores that code, a counter and a time, not the raw address.
          Entries older than one hour are removed when the limiter next runs; they are not deleted by a scheduled hourly task.
        </p>
      </PageSection>

      <PageSection heading="Why, and on what legal basis">
        <p>
          Method choices and feedback help decide what to improve. Message counts and the temporary
          rate-limit code help monitor usage and limit abuse. Conversation text is processed to answer
          the message you chose to send.
        </p>
        <p>
          The legal basis is legitimate interest: understanding how the service is used so it can be
          improved and protect it from abuse. NEOMETO does not use these logs to build a personal profile
          or make decisions about you.
        </p>
      </PageSection>

      <PageSection heading="What we don't do">
        <p>
          NEOMETO does not ask for health information, assess you, or use product logs for advertising.
          Anything you type into Mind Unloader may still contain personal or sensitive information,
          so share only what you want the AI service to receive.
        </p>
      </PageSection>

      <PageSection heading="Cookies and analytics">
        <p>
          The product event logger does not set a tracking cookie or a persistent visitor identifier.
          Technical requests to hosting, fonts and AI services can still expose connection information
          to those services. This page does not promise that those providers keep no operational logs.
        </p>
      </PageSection>

      <PageSection heading="Who processes the data">
        <p>
          Lovable hosts the site and Lovable Cloud stores product events and method feedback.
          Lovable&apos;s AI service processes Mind Unloader messages.
          Fonts are loaded from Google Fonts. These services receive the technical information needed to deliver their part of the site.
        </p>
        <p>
          If you send the contact form, your name, email, topic and message go to Formspree so we can receive
          and reply to them. Contact messages are separate from the method logs and are not anonymous.
        </p>
      </PageSection>

      <PageSection heading="How long we keep it">
        <p>
          Product events, existing search logs and method feedback currently have no fixed expiry or automatic deletion rule.
          They remain stored until removed. We do not claim a retention period that the site does not enforce.
        </p>
        <p>
          Rate-limit codes have the request-triggered cleanup described above. NEOMETO does not store Mind Unloader transcripts
          in its application database. AI-service records and Formspree contact submissions have their own retention policies.
        </p>
      </PageSection>

      <PageSection heading="Your rights">
        <p>
          You have the right to request access to your personal data, to have it corrected or
          deleted, to restrict or object to how it's processed, and to receive it in a portable
          format. You can also lodge a complaint with your national data protection authority.
        </p>
        <p>
          Method logs have no account identifier, so we may not be able to locate a particular entry.
          Contact messages and older search text can contain identifying information.
          If you believe we hold something personal, get in touch so we can assess your request.
        </p>
      </PageSection>

      <PageSection heading="Questions, or want it removed">
        <p>
          <Link to="/contact" className="underline underline-offset-4 hover:text-brand">Contact NEOMETO</Link>
          {" "}with your privacy question or request. You can also contact your national data protection authority.
        </p>
      </PageSection>
    </PageShell>
  );
}
