import { supabase } from "@/integrations/supabase/client";
import { analyticsPayload, type EventName } from "@/lib/analytics-payload";

/** Fire-and-forget client-side event logging. Never blocks or breaks the UI. */
export function logEvent(eventName: EventName, metadata: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  const payload = analyticsPayload(eventName, metadata);
  if (!payload) return;
  void (async () => {
    try {
      const { error } = await supabase
        .from("events")
        .insert(payload);

      if (error) console.warn("analytics insert failed", error.message);
    } catch (err) {
      console.warn("analytics insert failed", err);
    }
  })();
}

