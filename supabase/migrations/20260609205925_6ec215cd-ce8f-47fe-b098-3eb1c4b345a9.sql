
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.increment_analises(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.increment_analises(uuid) TO authenticated;
