-- Drop the overly permissive "Authenticated users can view profiles" policy
-- This policy uses "true" which allows any authenticated user to see ALL profiles
DROP POLICY IF EXISTS "Authenticated users can view profiles" ON public.profiles;

-- The "Users can view own profile fully" policy already exists and properly restricts
-- SELECT access to only the user's own profile (auth.uid() = user_id)