
CREATE TABLE public.ai_rate_limits (
  key_hash TEXT PRIMARY KEY,
  window_start TIMESTAMPTZ NOT NULL DEFAULT now(),
  count INTEGER NOT NULL DEFAULT 0
);

GRANT ALL ON public.ai_rate_limits TO service_role;

ALTER TABLE public.ai_rate_limits ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.consume_ai_rate_limit(
  _key_hash TEXT,
  _limit INTEGER,
  _window_seconds INTEGER
)
RETURNS TABLE (allowed BOOLEAN, retry_after_seconds INTEGER)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _row public.ai_rate_limits%ROWTYPE;
BEGIN
  DELETE FROM public.ai_rate_limits
  WHERE window_start < now() - make_interval(secs => _window_seconds * 6);

  INSERT INTO public.ai_rate_limits AS r (key_hash, window_start, count)
  VALUES (_key_hash, now(), 1)
  ON CONFLICT (key_hash) DO UPDATE
    SET count = CASE
          WHEN r.window_start < now() - make_interval(secs => _window_seconds) THEN 1
          ELSE r.count + 1
        END,
        window_start = CASE
          WHEN r.window_start < now() - make_interval(secs => _window_seconds) THEN now()
          ELSE r.window_start
        END
  RETURNING * INTO _row;

  RETURN QUERY SELECT
    _row.count <= _limit,
    GREATEST(
      1,
      CEIL(EXTRACT(EPOCH FROM (_row.window_start + make_interval(secs => _window_seconds) - now())))::INTEGER
    );
END;
$$;

REVOKE ALL ON FUNCTION public.consume_ai_rate_limit(TEXT, INTEGER, INTEGER) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.consume_ai_rate_limit(TEXT, INTEGER, INTEGER) TO service_role;
