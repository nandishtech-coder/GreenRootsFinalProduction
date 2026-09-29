-- Grant read access to public and logged-in users
GRANT SELECT ON public.categories TO anon, authenticated;
GRANT SELECT ON public.products TO anon, authenticated;

-- Allow authenticated users (Admins) to modify the data
GRANT INSERT, UPDATE, DELETE ON public.categories TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.products TO authenticated;

-- Ensure service_role has all permissions
GRANT ALL ON public.categories TO service_role;
GRANT ALL ON public.products TO service_role;


GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO anon, authenticated;
