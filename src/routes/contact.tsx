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

const CONTACT_EMAIL = "hello@neometo.com";

const title = "Contact NEOMETO";
const description =
  "Questions, feedback on a method, partnerships or press — get in touch with NEOMETO.";

const TOPICS = ["General", "Feedback on a method", "Partnership", "Press"];

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

  const handleSend = () => {
    const subject = encodeURIComponent(`[${topic}] ${name || "NEOMETO"}`);
    const body = encodeURIComponent(`${message}\n\n—\n${name}\n${email}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <PageShell
      eyebrow="Contact"
      title="Say what's on your mind."
      lead="Feedback on a method is the most useful thing you can send. Tell me what you ran and what it did — or didn't do."
      closingLine="Every method in the library got better because someone said it didn't work."
    >
      <div className="space-y-6">
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
          <Label htmlFor="contact-topic">What's it about?</Label>
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

        <Button
          type="button"
          onClick={handleSend}
          disabled={!message.trim()}
          className="rounded-full px-7"
        >
          Send message
        </Button>

        <p className="text-sm text-muted-foreground">
          Or write directly to {CONTACT_EMAIL}.
        </p>
      </div>
    </PageShell>
  );
}
