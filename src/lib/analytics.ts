import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";

type EventName = "method_opened" | "hero_search";

/** Values are trimmed so a payload can never exceed the database size limit. */
const MAX_VALUE_LENGTH = 300;

/** Fire-and-forget client-side event logging. Never blocks or breaks the UI. */
export function logEvent(eventName: EventName, metadata: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  const safeMetadata = Object.fromEntries(
    Object.entries(metadata)
      .slice(0, 5)
      .map(([key, value]) => [key.slice(0, 40), String(value).slice(0, MAX_VALUE_LENGTH)]),
  );
  void (async () => {
    try {
      const { error } = await supabase
        .from("events")
        .insert({ event_name: eventName, metadata: safeMetadata as Json });

      if (error) console.warn("analytics insert failed", error.message);
    } catch (err) {
      console.warn("analytics insert failed", err);
    }
  })();
}

