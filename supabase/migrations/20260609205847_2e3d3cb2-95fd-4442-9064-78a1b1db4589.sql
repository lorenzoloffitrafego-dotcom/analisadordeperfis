
-- Restrict shared_analyses INSERT to authenticated users
DROP POLICY IF EXISTS "Anyone can create shared analyses" ON public.shared_analyses;
CREATE POLICY "Authenticated users can create shared analyses"
  ON public.shared_analyses
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Revoke anon execute on increment_analises (only signed-in users should call it)
REVOKE EXECUTE ON FUNCTION public.increment_analises(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.increment_analises(uuid) TO authenticated;
