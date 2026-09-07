import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";

type EventName = "method_opened" | "hero_search";

/** Fire-and-forget client-side event logging. Never blocks or breaks the UI. */
export function logEvent(eventName: EventName, metadata: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  void (async () => {
    try {
      const { error } = await supabase
        .from("events")
        .insert({ event_name: eventName, metadata: metadata as Json });
      if (error) console.warn("analytics insert failed", error.message);
    } catch (err) {
      console.warn("analytics insert failed", err);
    }
  })();
}

