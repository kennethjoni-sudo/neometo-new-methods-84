import { ToolError, defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

import { methodSchema, methods } from "../methods";

export default defineTool({
  name: "get_method",
  title: "Get a method",
  description:
    "Get the full NEOMETO method — duration, what it is for, and the steps to try it now — by its slug.",
  inputSchema: {
    slug: z
      .string()
      .trim()
      .min(1)
      .describe('Method slug, e.g. "thought-spin". Use list_methods to see valid slugs.'),
  },
  outputSchema: { method: methodSchema },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ slug }) => {
    const method = methods.find((m) => m.slug === slug.toLowerCase());
    if (!method) {
      throw new ToolError(
        `No method with slug "${slug}". Call list_methods for the available slugs.`,
      );
    }
    return {
      content: [{ type: "text", text: JSON.stringify(method, null, 2) }],
      structuredContent: { method },
    };
  },
});
