
CREATE OR REPLACE FUNCTION public.increment_analises(user_id_input UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.profiles
  SET analises = analises + 1
  WHERE id = user_id_input;
END;
$$;
