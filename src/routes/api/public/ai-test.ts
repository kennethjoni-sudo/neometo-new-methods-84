import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/ai-test")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) {
          return Response.json({ error: "LOVABLE_API_KEY not configured" }, { status: 500 });
        }

        let text: unknown;
        try {
          text = (await request.json()).text;
        } catch {
          return Response.json({ error: "Provide JSON body { text: string }" }, { status: 400 });
        }
        if (typeof text !== "string" || !text.trim()) {
          return Response.json({ error: "Provide JSON body { text: string }" }, { status: 400 });
        }

        const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-3.7-flash",
            messages: [
              {
                role: "system",
                content: "Reply to the user's message with exactly one short, warm sentence. Nothing more.",
              },
              { role: "user", content: text },
            ],
          }),
        });

        if (!aiRes.ok) {
          const errText = await aiRes.text();
          return Response.json({ error: `AI gateway error ${aiRes.status}`, detail: errText }, { status: 502 });
        }

        const data = await aiRes.json();
        const reply = data.choices?.[0]?.message?.content ?? "";
        return Response.json({ reply });
      },
    },
  },
});
