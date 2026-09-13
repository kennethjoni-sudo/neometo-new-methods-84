CREATE TABLE public.neometo_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  method_slug text NOT NULL,
  technique_id text,
  response text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.neometo_logs TO anon, authenticated;
GRANT ALL ON public.neometo_logs TO service_role;

ALTER TABLE public.neometo_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can record a method response"
ON public.neometo_logs
FOR INSERT
TO anon, authenticated
WITH CHECK (
  response IN ('yes','no','skip')
  AND length(method_slug) <= 40
  AND (technique_id IS NULL OR length(technique_id) <= 40)
);