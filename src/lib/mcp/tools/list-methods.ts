import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

import { methodSummarySchema, methods } from "../methods";

export default defineTool({
  name: "list_methods",
  title: "List methods",
  description:
    "List every NEOMETO method with its area, duration and what it is for. Use this to see what is available before recommending one.",
  inputSchema: {},
  outputSchema: { methods: z.array(methodSummarySchema) },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const summary = methods.map(({ slug, name, area, duration, promise }) => ({
      slug,
      name,
      area,
      duration,
      promise,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(summary, null, 2) }],
      structuredContent: { methods: summary },
    };
  },
});
