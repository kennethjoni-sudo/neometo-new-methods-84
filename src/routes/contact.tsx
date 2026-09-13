import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageShell } from "@/components/neometo/page-shell";

/** Swap the endpoint id after creating the form in Formspree. */
const FORM_ENDPOINT = "https://formspree.io/f/xpwddjgn";

const title = "Contact NEOMETO";
const description =
  "Questions, feedback on a method, partnerships or press — get in touch with NEOMETO.";

const TOPICS = ["General", "Feedback on a method", "Partnership", "Press"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://neometo.lovable.app/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState<string>("General");
  const [message, setMessage] = useState("");
  const [gotcha, setGotcha] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const valid =
    name.trim().length > 0 && EMAIL_RE.test(email.trim()) && message.trim().length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid || status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          topic,
          message: message.trim(),
          _gotcha: gotcha,
        }),
      });
      if (!res.ok) throw new Error("send failed");
      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
      setTopic("General");
    } catch {
      setStatus("error");
    }
  };

  return (
    <PageShell
      eyebrow="Contact"
      title="Say what's on your mind."
      lead="Feedback on a method is the most useful thing you can send. Tell me what you ran and what it did — or didn't do."
      closingLine="Every method in the library got better because someone said it didn't work."
    >
      {status === "sent" ? (
        <p className="text-lg text-ink">Sent. We&apos;ll get back to you.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="contact-name">Name</Label>
            <Input
              id="contact-name"
              className="mt-2 rounded-2xl"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>

          <div>
            <Label htmlFor="contact-email">Email</Label>
            <Input
              id="contact-email"
              type="email"
              className="mt-2 rounded-2xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <Label htmlFor="contact-topic">What&apos;s it about?</Label>
            <Select value={topic} onValueChange={setTopic}>
              <SelectTrigger id="contact-topic" className="mt-2 rounded-2xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TOPICS.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="contact-message">Message</Label>
            <Textarea
              id="contact-message"
              rows={6}
              className="mt-2 rounded-2xl"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Keep it as short as you like."
            />
          </div>

          {/* Honeypot — hidden from people, tempting to bots. */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="contact-gotcha">Leave this empty</label>
            <input
              id="contact-gotcha"
              name="_gotcha"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={gotcha}
              onChange={(e) => setGotcha(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            disabled={!valid || status === "sending"}
            className="rounded-full px-7"
          >
            {status === "sending" ? "Sending…" : "Send message"}
          </Button>

          {status === "error" ? (
            <p className="text-sm text-ink">
              Something went wrong. Try again or email us directly at{" "}
              {["hello", "neometo.com"].join("@")}.
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">We&apos;ll reply by email.</p>
          )}
        </form>
      )}
    </PageShell>
  );
}
