-- Fix PUBLIC_DATA_EXPOSURE: Replace overly permissive public profile policy
-- Drop the policy that exposes ALL profile data to unauthenticated users
DROP POLICY IF EXISTS "Users can view public profile data" ON public.profiles;

-- Create a new policy that requires authentication to view other profiles
-- Users can see their own profile fully via existing policy
-- Authenticated users can see limited profile data of others (but sensitive data still visible - for true column-level security, use a view)
CREATE POLICY "Authenticated users can view profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (true);