export type EventName = "method_opened" | "unload_opened" | "unload_turn";

const METHODS = new Set(["spin", "sleep", "focus", "overload", "social", "prepare", "friction", "unload"]);
const SOURCES = new Set(["begin", "hero", "hero_direct"]);

/** Only known choices and numeric counts may enter product analytics. */
export function analyticsPayload(eventName: string, metadata: Record<string, string> = {}) {
  if (!["method_opened", "unload_opened", "unload_turn"].includes(eventName)) return null;
  const safe: Record<string, string> = {};
  if (eventName !== "unload_turn") {
    if (METHODS.has(metadata.method)) safe.method = metadata.method;
    if (SOURCES.has(metadata.source)) safe.source = metadata.source;
  } else if (/^\d{1,4}$/.test(metadata.chars ?? "")) {
    const count = Number(metadata.chars);
    if (count <= 2000) safe.chars = String(count);
  }
  return { event_name: eventName as EventName, metadata: safe };
}