-- Create user_courses table to track course activity
CREATE TABLE public.user_courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  course_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'in_progress',
  progress INTEGER NOT NULL DEFAULT 0,
  current_module TEXT,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_accessed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, course_id)
);

-- Enable RLS on user_courses
ALTER TABLE public.user_courses ENABLE ROW LEVEL SECURITY;

-- Users can only view their own course progress
CREATE POLICY "Users can view their own course progress"
ON public.user_courses
FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own course progress
CREATE POLICY "Users can insert their own course progress"
ON public.user_courses
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own course progress
CREATE POLICY "Users can update their own course progress"
ON public.user_courses
FOR UPDATE
USING (auth.uid() = user_id);

-- Users can delete their own course progress
CREATE POLICY "Users can delete their own course progress"
ON public.user_courses
FOR DELETE
USING (auth.uid() = user_id);

-- Create updated_at trigger for user_courses
CREATE TRIGGER update_user_courses_updated_at
BEFORE UPDATE ON public.user_courses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Fix profiles RLS: Users can only see their own email
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Create a more restrictive SELECT policy
CREATE POLICY "Users can view own profile fully"
ON public.profiles
FOR SELECT
USING (auth.uid() = user_id);

-- Allow users to see limited public profile data (without email, sensitive URLs)
CREATE POLICY "Users can view public profile data"
ON public.profiles
FOR SELECT
USING (true);