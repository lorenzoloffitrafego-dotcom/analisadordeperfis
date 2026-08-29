-- 1) Ownership on shared_analyses
ALTER TABLE public.shared_analyses
  ADD COLUMN IF NOT EXISTS user_id uuid DEFAULT auth.uid();

DROP POLICY IF EXISTS "Authenticated users can create shared analyses" ON public.shared_analyses;
CREATE POLICY "Users can create their own shared analyses"
ON public.shared_analyses FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid());

-- 2) Harden usage counter: always operate on the caller, never an arbitrary user
CREATE OR REPLACE FUNCTION public.increment_analises(user_id_input uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'not authenticated';
  END IF;

  UPDATE public.profiles
  SET analises = analises + 1
  WHERE id = auth.uid();
END;
$function$;

REVOKE ALL ON FUNCTION public.increment_analises(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.increment_analises(uuid) TO authenticated;

-- 3) Signup trigger function must not be callable from the API
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;