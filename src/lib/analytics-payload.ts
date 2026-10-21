export type EventName = "method_opened" | "unload_opened" | "unload_turn";

const METHODS = new Set(["spin", "sleep", "focus", "overload", "social", "prepare", "friction", "unload"]);
const SOURCES = new Set(["begin", "hero", "hero_direct"]);

/** Only known choices and numeric counts may enter product analytics. */
export function analyticsPayload(eventName: string, metadata: Record<string, string> = {}) {
  if (!["method_opened", "unload_opened", "unload_turn"].includes(eventName)) return null;
  const safe: Record<string, string> = {};
  const method = metadata["method"];
  const source = metadata["source"];
  const chars = metadata["chars"];
  if (eventName !== "unload_turn") {
    if (method && METHODS.has(method)) safe["method"] = method;
    if (source && SOURCES.has(source)) safe["source"] = source;
  } else if (/^\d{1,4}$/.test(chars ?? "")) {
    const count = Number(chars);
    if (count <= 2000) safe["chars"] = String(count);
  }
  return { event_name: eventName as EventName, metadata: safe };
}