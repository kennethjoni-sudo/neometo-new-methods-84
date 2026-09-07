import { supabase } from "@/integrations/supabase/client";

type EventName = "method_opened" | "hero_search";

/** Fire-and-forget client-side event logging. Never blocks or breaks the UI. */
export function logEvent(eventName: EventName, metadata: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  void supabase
    .from("events")
    .insert({ event_name: eventName, metadata })
    .then(({ error }) => {
      if (error) console.warn("analytics insert failed", error.message);
    });
}
