import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

import { findMethods } from "../methods";

export default defineTool({
  name: "find_method",
  title: "Find a method",
  description:
    "Describe what someone wants to handle better (racing thoughts, sleep, focus, overload, conversations, preparing for something) and get the NEOMETO methods that fit, best match first.",
  inputSchema: {
    situation: z
      .string()
      .trim()
      .min(1)
      .describe("What is happening, in the person's own words."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ situation }) => {
    const matches = findMethods(situation).slice(0, 3);
    return {
      content: [{ type: "text", text: JSON.stringify(matches, null, 2) }],
      structuredContent: { matches },
    };
  },
});
