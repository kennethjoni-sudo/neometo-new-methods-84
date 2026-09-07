ALTER TABLE public.events
  ADD CONSTRAINT events_event_name_allowed
  CHECK (event_name IN ('method_opened', 'hero_search'));

ALTER TABLE public.events
  ADD CONSTRAINT events_metadata_size
  CHECK (pg_column_size(metadata) <= 2048);

ALTER TABLE public.events
  ADD CONSTRAINT events_metadata_is_object
  CHECK (jsonb_typeof(metadata) = 'object');

CREATE OR REPLACE VIEW public.event_summary
WITH (security_invoker = true) AS
SELECT
  metadata->>'method' AS method_slug,
  count(*)            AS opens,
  max(created_at)     AS last_opened_at
FROM public.events
WHERE event_name = 'method_opened'
  AND metadata->>'method' IS NOT NULL
GROUP BY metadata->>'method'
ORDER BY count(*) DESC;

CREATE OR REPLACE VIEW public.recent_hero_searches
WITH (security_invoker = true) AS
SELECT
  created_at,
  metadata->>'query' AS query
FROM public.events
WHERE event_name = 'hero_search'
  AND metadata->>'query' IS NOT NULL
ORDER BY created_at DESC
LIMIT 50;

GRANT SELECT ON public.event_summary TO service_role;
GRANT SELECT ON public.recent_hero_searches TO service_role;