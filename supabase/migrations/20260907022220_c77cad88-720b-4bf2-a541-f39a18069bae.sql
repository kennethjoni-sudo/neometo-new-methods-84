CREATE TABLE public.events (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_name text NOT NULL,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT INSERT ON public.events TO anon;
GRANT INSERT ON public.events TO authenticated;
GRANT ALL ON public.events TO service_role;

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can record an event"
ON public.events
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE INDEX events_created_at_idx ON public.events (created_at DESC);
CREATE INDEX events_event_name_idx ON public.events (event_name);