import { describe, test } from "node:test";
import { deepStrictEqual, strictEqual } from "node:assert";
import { analyticsPayload } from "./analytics-payload";

describe("private product analytics", () => {
  test("raw search events are no longer recorded", () => {
    strictEqual(analyticsPayload("hero_search", { query: "my private thought" }), null);
  });
  test("records method choices without any raw search text", () => {
    deepStrictEqual(analyticsPayload("method_opened", { method: "focus", source: "hero_direct", query: "my private thought", text: "private" }), {
      event_name: "method_opened", metadata: { method: "focus", source: "hero_direct" },
    });
  });
  test("conversation analytics contains a count, never conversation content", () => {
    deepStrictEqual(analyticsPayload("unload_turn", { chars: "42", content: "private conversation", source: "private conversation" }), {
      event_name: "unload_turn", metadata: { chars: "42" },
    });
  });
});