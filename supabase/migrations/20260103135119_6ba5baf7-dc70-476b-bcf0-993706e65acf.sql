-- Create teams table
CREATE TABLE public.teams (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  interests TEXT[] DEFAULT '{}',
  is_open BOOLEAN DEFAULT true,
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create team members table
CREATE TABLE public.team_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member',
  skills TEXT[] DEFAULT '{}',
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(team_id, user_id)
);

-- Create team join requests table
CREATE TABLE public.team_join_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(team_id, user_id)
);

-- Create team messages table for real-time chat
CREATE TABLE public.team_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create impact posts table
CREATE TABLE public.impact_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create impact comments table
CREATE TABLE public.impact_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.impact_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  parent_id UUID REFERENCES public.impact_comments(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user problem joins table
CREATE TABLE public.user_problem_joins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  problem_id TEXT NOT NULL,
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, problem_id)
);

-- Create user hackathon registrations table
CREATE TABLE public.user_hackathon_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  hackathon_id TEXT NOT NULL,
  registered_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, hackathon_id)
);

-- Enable RLS on all tables
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_join_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.impact_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.impact_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_problem_joins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_hackathon_registrations ENABLE ROW LEVEL SECURITY;

-- Teams policies
CREATE POLICY "Anyone can view teams" ON public.teams FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create teams" ON public.teams FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Team creators can update their teams" ON public.teams FOR UPDATE USING (auth.uid() = created_by);
CREATE POLICY "Team creators can delete their teams" ON public.teams FOR DELETE USING (auth.uid() = created_by);

-- Team members policies
CREATE POLICY "Anyone can view team members" ON public.team_members FOR SELECT USING (true);
CREATE POLICY "Team creators can add members" ON public.team_members FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.teams WHERE id = team_id AND created_by = auth.uid())
  OR user_id = auth.uid()
);
CREATE POLICY "Users can leave teams" ON public.team_members FOR DELETE USING (user_id = auth.uid());

-- Team join requests policies
CREATE POLICY "Team creators can view requests" ON public.team_join_requests FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.teams WHERE id = team_id AND created_by = auth.uid())
  OR user_id = auth.uid()
);
CREATE POLICY "Authenticated users can request to join" ON public.team_join_requests FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Team creators can update requests" ON public.team_join_requests FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.teams WHERE id = team_id AND created_by = auth.uid())
);
CREATE POLICY "Users can delete their own requests" ON public.team_join_requests FOR DELETE USING (user_id = auth.uid());

-- Team messages policies
CREATE POLICY "Team members can view messages" ON public.team_messages FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.team_members WHERE team_id = team_messages.team_id AND user_id = auth.uid())
);
CREATE POLICY "Team members can send messages" ON public.team_messages FOR INSERT WITH CHECK (
  auth.uid() = user_id AND
  EXISTS (SELECT 1 FROM public.team_members WHERE team_id = team_messages.team_id AND user_id = auth.uid())
);

-- Impact posts policies
CREATE POLICY "Anyone can view impact posts" ON public.impact_posts FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create posts" ON public.impact_posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own posts" ON public.impact_posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own posts" ON public.impact_posts FOR DELETE USING (auth.uid() = user_id);

-- Impact comments policies
CREATE POLICY "Anyone can view comments" ON public.impact_comments FOR SELECT USING (true);
CREATE POLICY "Authenticated users can comment" ON public.impact_comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own comments" ON public.impact_comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own comments" ON public.impact_comments FOR DELETE USING (auth.uid() = user_id);

-- User problem joins policies
CREATE POLICY "Users can view their own joins" ON public.user_problem_joins FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Authenticated users can join problems" ON public.user_problem_joins FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can leave problems" ON public.user_problem_joins FOR DELETE USING (auth.uid() = user_id);

-- User hackathon registrations policies
CREATE POLICY "Users can view their own registrations" ON public.user_hackathon_registrations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Authenticated users can register" ON public.user_hackathon_registrations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unregister" ON public.user_hackathon_registrations FOR DELETE USING (auth.uid() = user_id);

-- Enable realtime for team messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.team_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.impact_posts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.impact_comments;

-- Create triggers for updated_at
CREATE TRIGGER update_teams_updated_at BEFORE UPDATE ON public.teams FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_impact_posts_updated_at BEFORE UPDATE ON public.impact_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();