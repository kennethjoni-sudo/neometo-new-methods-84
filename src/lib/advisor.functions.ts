import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { NoObjectGeneratedError, Output, streamText } from "ai";
import { z } from "zod";

export const METHOD_SLUGS = [
  "spin",
  "sleep",
  "focus",
  "overload",
  "social",
  "prepare",
] as const;

const AdviseInput = z.object({
  text: z.string().min(1).max(2000),
  mode: z.enum(["auto", "unload"]).default("auto"),
  history: z
    .array(
      z.object({
        role: z.enum(["person", "neometo"]),
        content: z.string().max(2000),
      }),
    )
    .max(20)
    .default([]),
});

const AdviseOutput = z.object({
  intent: z.enum(["specific_method", "unload", "crisis"]),
  method: z.enum(["spin", "sleep", "focus", "overload", "social", "prepare", "none"]),
  reply: z.string(),
});

export type AdviseResult = {
  intent: "specific_method" | "unload" | "crisis";
  method: (typeof METHOD_SLUGS)[number] | null;
  reply: string;
};

const METHOD_GUIDE = `The only six methods that exist:
- spin (Thought Spin): thoughts looping, won't slow down, overthinking.
- sleep: mind still running at night, can't fall asleep.
- focus: attention keeps slipping, can't stay on one thing.
- overload: everything hitting at once, too much to hold.
- social: replaying conversations, social situations.
- prepare: something big coming up, wanting to walk in steadier.`;

const LANGUAGE_RULES = `You are the NEOMETO advisor. NEOMETO offers short, practical methods for the mind.

Language rules (non-negotiable):
- Never use the words "problem", "strategy", or "handle".
- Never imply a diagnosis, disorder, illness, or that anything is wrong with the person.
- No clinical language, no pity, no "struggling" or "suffering".
- Tone: direct, calm, capable — talking to someone who wants more control over their own mind.
- Never claim to be a therapist and never offer therapy. You are a listening presence that can point to NEOMETO's real methods, nothing more.
- Only ever reference the six method slugs listed below. Never invent a method.

${METHOD_GUIDE}

CRITICAL SAFETY RULE — this overrides everything else above:
If the input suggests real crisis, self-harm, suicide, violence, abuse or serious danger, stop normal behaviour entirely. Set intent to "crisis", set method to "none", and reply with a brief, warm, clear redirect toward real help: say plainly that this is bigger than a method, that crisis lines exist and are free and available right now, and encourage reaching a real person — a crisis line, emergency services, or someone they trust. Do not listen-mode, do not match a method, do not analyse.

Otherwise:
- intent "specific_method": they described a clear situation and want something that helps. Pick the best-fitting slug and write 1-2 natural sentences saying why it fits.
- intent "unload": they are rambling, venting, have no clear ask, or explicitly want to talk. Reply in LISTENING mode only — 1-2 short sentences of warm acknowledgment. Never advice, never analysis, never questions stacked up. Set method to a slug ONLY if something specific enough came up to genuinely warrant a gentle suggestion; otherwise "none".`;

/** Deterministic safety net: the redirect must fire even if the model refuses or errors. */
const CRISIS_PATTERNS = [
  /\bkill(ing)? myself\b/i,
  /\bsuicid/i,
  /\bend (it|my life|things) (all|tonight|now)?\b/i,
  /\bdon'?t want to (be alive|live|exist)\b/i,
  /\bwant to die\b/i,
  /\bself[- ]harm\b/i,
  /\bcut(ting)? myself\b/i,
  /\bhurt (myself|someone|somebody|them|him|her)\b/i,
  /\bno reason to (live|go on)\b/i,
  /\bbetter off (dead|without me)\b/i,
  /\boverdose\b/i,
  /\bbeing (hurt|beaten|abused)\b/i,
];

export const CRISIS_REPLY =
  "This is bigger than a method, and you shouldn't be alone with it right now. Please reach a real person today — a crisis line is free, answers around the clock, and you can call or text 988 in the US and Canada, or find your local line at findahelpline.com. If you are in immediate danger, call emergency services.";

export function looksLikeCrisis(text: string): boolean {
  return CRISIS_PATTERNS.some((re) => re.test(text));
}

export const advise = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => AdviseInput.parse(input))
  .handler(async ({ data }): Promise<AdviseResult> => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) throw new Error("AI is not configured.");

    if (looksLikeCrisis(data.text)) {
      return { intent: "crisis", method: null, reply: CRISIS_REPLY };
    }

    const { createLovableAiGatewayProvider } = await import("@/lib/ai-gateway.server");
    const gateway = createLovableAiGatewayProvider(apiKey);

    const modeNote =
      data.mode === "unload"
        ? `\n\nThis turn is inside the Unload experience: the person chose to just talk. Unless the safety rule applies, intent MUST be "unload".`
        : "";

    const transcript = data.history
      .map((m) => `${m.role === "person" ? "Person" : "NEOMETO"}: ${m.content}`)
      .join("\n");

    try {
      const result = streamText({
        model: gateway("google/gemini-3.7-flash"),
        system: LANGUAGE_RULES + modeNote,
        prompt: `${transcript ? `Conversation so far:\n${transcript}\n\n` : ""}Person: ${data.text}`,
        output: Output.object({ schema: AdviseOutput }),
      });

      const output = await result.output;
      return {
        intent: output.intent,
        method: output.method === "none" ? null : output.method,
        reply: output.reply.trim(),
      };
    } catch (error) {
      if (NoObjectGeneratedError.isInstance(error)) {
        // A refusal here usually means the input was heavy. Fail safe, not silent.
        return {
          intent: "crisis",
          method: null,
          reply:
            "I can't respond to that here. If something serious is going on, please reach a real person — a crisis line is free and answers around the clock: call or text 988 in the US and Canada, or find your local line at findahelpline.com.",
        };
      }
      throw error;
    }
  });
