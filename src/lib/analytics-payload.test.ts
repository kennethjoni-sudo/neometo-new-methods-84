import { describe, expect, test } from "bun:test";
import { analyticsPayload } from "./analytics-payload";

describe("private product analytics", () => {
  test("raw search events are no longer recorded", () => {
    expect(analyticsPayload("hero_search", { query: "my private thought" })).toBeNull();
  });
  test("records method choices without any raw search text", () => {
    expect(analyticsPayload("method_opened", { method: "focus", source: "hero_direct", query: "my private thought", text: "private" })).toEqual({
      event_name: "method_opened", metadata: { method: "focus", source: "hero_direct" },
    });
  });
  test("conversation analytics contains a count, never conversation content", () => {
    expect(analyticsPayload("unload_turn", { chars: "42", content: "private conversation", source: "private conversation" })).toEqual({
      event_name: "unload_turn", metadata: { chars: "42" },
    });
  });
});