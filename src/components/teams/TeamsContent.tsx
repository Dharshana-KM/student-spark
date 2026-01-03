import { motion } from "framer-motion";
import { 
  Users, 
  Search, 
  Plus, 
  MessageCircle,
  Star,
  Trophy,
  Target,
  Sparkles,
  Send,
  Linkedin,
  CheckCircle,
  Clock,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface Team {
  id: string;
  name: string;
  description: string | null;
  interests: string[];
  is_open: boolean;
  created_by: string;
  created_at: string;
  members?: TeamMember[];
}

interface TeamMember {
  id: string;
  user_id: string;
  role: string;
  skills: string[];
  profile?: {
    full_name: string;
    avatar_url: string | null;
  };
}

interface TeamMessage {
  id: string;
  team_id: string;
  user_id: string;
  message: string;
  created_at: string;
  profile?: {
    full_name: string;
  };
}

const interestTags = ["All", "Tech", "Environment", "Healthcare", "Education", "Design", "AI/ML", "IoT"];

export function TeamsContent() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInterest, setSelectedInterest] = useState("All");
  const [myTeams, setMyTeams] = useState<Team[]>([]);
  const [openTeams, setOpenTeams] = useState<Team[]>([]);
  const [pendingRequests, setPendingRequests] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Create team dialog
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamDescription, setNewTeamDescription] = useState("");
  const [newTeamInterests, setNewTeamInterests] = useState<string[]>([]);
  
  // Chat
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [teamMessages, setTeamMessages] = useState<TeamMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Fetch teams
  useEffect(() => {
    fetchTeams();
    if (user) {
      fetchPendingRequests();
    }
  }, [user]);

  const fetchTeams = async () => {
    setLoading(true);
    try {
      // Fetch all teams
      const { data: allTeams } = await supabase
        .from("teams")
        .select("*")
        .order("created_at", { ascending: false });

      if (allTeams && user) {
        // Fetch user's team memberships
        const { data: memberships } = await supabase
          .from("team_members")
          .select("team_id")
          .eq("user_id", user.id);

        const memberTeamIds = memberships?.map(m => m.team_id) || [];
        
        // Also include teams the user created
        const myTeamsList = allTeams.filter(t => 
          memberTeamIds.includes(t.id) || t.created_by === user.id
        );
        const openTeamsList = allTeams.filter(t => 
          t.is_open && !memberTeamIds.includes(t.id) && t.created_by !== user.id
        );

        setMyTeams(myTeamsList);
        setOpenTeams(openTeamsList);
      } else if (allTeams) {
        setOpenTeams(allTeams.filter(t => t.is_open));
      }
    } catch (error) {
      console.error("Error fetching teams:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingRequests = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("team_join_requests")
      .select("team_id")
      .eq("user_id", user.id)
      .eq("status", "pending");
    
    setPendingRequests(data?.map(r => r.team_id) || []);
  };

  const fetchTeamMessages = async (teamId: string) => {
    const { data } = await supabase
      .from("team_messages")
      .select("*")
      .eq("team_id", teamId)
      .order("created_at", { ascending: true });
    
    if (data) {
      // Fetch profile names for messages
      const userIds = [...new Set(data.map(m => m.user_id))];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, full_name")
        .in("user_id", userIds);
      
      const profileMap = new Map(profiles?.map(p => [p.user_id, p]) || []);
      
      const messagesWithProfiles = data.map(m => ({
        ...m,
        profile: profileMap.get(m.user_id)
      }));
      
      setTeamMessages(messagesWithProfiles);
    }
  };

  // Subscribe to real-time messages
  useEffect(() => {
    if (!selectedTeam) return;

    const channel = supabase
      .channel(`team-messages-${selectedTeam.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "team_messages",
          filter: `team_id=eq.${selectedTeam.id}`
        },
        async (payload) => {
          const newMsg = payload.new as TeamMessage;
          // Fetch the profile for this message
          const { data: profile } = await supabase
            .from("profiles")
            .select("user_id, full_name")
            .eq("user_id", newMsg.user_id)
            .maybeSingle();
          
          setTeamMessages(prev => [...prev, { ...newMsg, profile: profile || undefined }]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedTeam]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [teamMessages]);

  const handleCreateTeam = async () => {
    if (!user || !newTeamName.trim()) return;

    const { data: team, error } = await supabase
      .from("teams")
      .insert({
        name: newTeamName.trim(),
        description: newTeamDescription.trim() || null,
        interests: newTeamInterests,
        created_by: user.id,
        is_open: true
      })
      .select()
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create team. Please try again.",
        variant: "destructive"
      });
      return;
    }

    // Add creator as a member
    await supabase.from("team_members").insert({
      team_id: team.id,
      user_id: user.id,
      role: "leader"
    });

    toast({
      title: "🎉 Team Created!",
      description: `"${team.name}" is ready. Invite members and start building!`
    });

    setCreateDialogOpen(false);
    setNewTeamName("");
    setNewTeamDescription("");
    setNewTeamInterests([]);
    fetchTeams();
  };

  const handleRequestToJoin = async (teamId: string, teamName: string) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to request to join a team.",
        variant: "destructive"
      });
      return;
    }

    const { error } = await supabase.from("team_join_requests").insert({
      team_id: teamId,
      user_id: user.id,
      status: "pending"
    });

    if (error) {
      if (error.code === "23505") {
        toast({
          title: "Already requested",
          description: "You've already sent a request to join this team."
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to send request. Please try again.",
          variant: "destructive"
        });
      }
      return;
    }

    setPendingRequests([...pendingRequests, teamId]);
    toast({
      title: "📤 Request Sent!",
      description: `Your request to join "${teamName}" has been sent to the team leader.`
    });
  };

  const openTeamChat = (team: Team) => {
    setSelectedTeam(team);
    setChatOpen(true);
    fetchTeamMessages(team.id);
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedTeam || !user) return;

    const { error } = await supabase.from("team_messages").insert({
      team_id: selectedTeam.id,
      user_id: user.id,
      message: newMessage.trim()
    });

    if (!error) {
      setNewMessage("");
    }
  };

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const filteredOpenTeams = openTeams.filter((team) => {
    const matchesSearch = team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (team.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    const matchesInterest = selectedInterest === "All" || 
      team.interests.some(i => i.toLowerCase().includes(selectedInterest.toLowerCase()));
    return matchesSearch && matchesInterest;
  });

  const toggleInterest = (interest: string) => {
    if (newTeamInterests.includes(interest)) {
      setNewTeamInterests(newTeamInterests.filter(i => i !== interest));
    } else {
      setNewTeamInterests([...newTeamInterests, interest]);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto pt-16 lg:pt-0 flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pt-16 lg:pt-0">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl lg:text-4xl font-display font-bold mb-2">
            Teams
          </h1>
          <p className="text-muted-foreground text-lg">
            Find your tribe. Build together. Grow together.
          </p>
        </div>
        
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="hero" disabled={!user}>
              <Plus className="w-4 h-4 mr-2" />
              Create Team
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create a New Team</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label htmlFor="team-name">Team Name</Label>
                <Input
                  id="team-name"
                  placeholder="e.g., EcoTech Builders"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="team-desc">Description</Label>
                <Textarea
                  id="team-desc"
                  placeholder="What will your team build?"
                  value={newTeamDescription}
                  onChange={(e) => setNewTeamDescription(e.target.value)}
                />
              </div>
              <div>
                <Label>Interests</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {interestTags.filter(t => t !== "All").map((interest) => (
                    <Badge
                      key={interest}
                      variant={newTeamInterests.includes(interest) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleInterest(interest)}
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button className="w-full" onClick={handleCreateTeam} disabled={!newTeamName.trim()}>
                Create Team
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {!user && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-warning/10 border border-warning/20"
        >
          <p className="text-center text-warning-foreground">
            Sign in to create teams, join others, and collaborate with students.
          </p>
        </motion.div>
      )}

      {/* Pending Requests Summary */}
      {pendingRequests.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-warning/10 border border-warning/20"
        >
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-warning" />
            <span className="font-medium">Pending Requests: {pendingRequests.length}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Waiting for team leaders to accept your join requests.
          </p>
        </motion.div>
      )}

      {/* Motivational Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="p-4 rounded-xl bg-accent/20 border border-accent/30"
      >
        <p className="text-center font-medium italic">
          "Alone we can do so little; together we can do so much." — Helen Keller
        </p>
      </motion.div>

      <Tabs defaultValue={myTeams.length > 0 ? "my-teams" : "discover"} className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="my-teams">
            <Users className="w-4 h-4 mr-2" />
            My Teams ({myTeams.length})
          </TabsTrigger>
          <TabsTrigger value="discover">
            <Search className="w-4 h-4 mr-2" />
            Discover
          </TabsTrigger>
        </TabsList>

        {/* My Teams */}
        <TabsContent value="my-teams" className="space-y-6">
          {myTeams.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <Users className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Teams Yet</h3>
              <p className="text-muted-foreground mb-4">Create a team or join one to get started!</p>
              <Button onClick={() => setCreateDialogOpen(true)} disabled={!user}>
                Create Your First Team
              </Button>
            </motion.div>
          ) : (
            myTeams.map((team, index) => (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="p-6 rounded-2xl bg-card border border-border shadow-soft"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-display font-semibold">{team.name}</h3>
                        <p className="text-muted-foreground text-sm">{team.description || "No description"}</p>
                      </div>
                      {team.created_by === user?.id && (
                        <Badge variant="secondary">Leader</Badge>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {team.interests.map((interest) => (
                        <Badge key={interest} variant="outline">{interest}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-row lg:flex-col gap-2">
                    <Dialog open={chatOpen && selectedTeam?.id === team.id} onOpenChange={(open) => {
                      setChatOpen(open);
                      if (open) openTeamChat(team);
                    }}>
                      <DialogTrigger asChild>
                        <Button variant="outline" onClick={() => openTeamChat(team)}>
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Team Chat
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-lg max-h-[80vh] flex flex-col">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <MessageCircle className="w-5 h-5" />
                            {team.name} Chat
                          </DialogTitle>
                        </DialogHeader>
                        <div className="flex-1 overflow-y-auto space-y-4 py-4 min-h-[300px] max-h-[400px]">
                          {teamMessages.length === 0 ? (
                            <p className="text-center text-muted-foreground py-8">
                              No messages yet. Start the conversation!
                            </p>
                          ) : (
                            teamMessages.map((msg) => (
                              <div
                                key={msg.id}
                                className={`flex gap-3 ${msg.user_id === user?.id ? 'flex-row-reverse' : ''}`}
                              >
                                <Avatar className="w-8 h-8">
                                  <AvatarFallback>
                                    {msg.profile?.full_name?.[0] || "U"}
                                  </AvatarFallback>
                                </Avatar>
                                <div className={`max-w-[70%] ${msg.user_id === user?.id ? 'text-right' : ''}`}>
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-medium">
                                      {msg.user_id === user?.id ? "You" : (msg.profile?.full_name || "User")}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                      {formatTime(msg.created_at)}
                                    </span>
                                  </div>
                                  <div className={`rounded-xl px-4 py-2 ${
                                    msg.user_id === user?.id 
                                      ? 'bg-primary text-primary-foreground' 
                                      : 'bg-muted'
                                  }`}>
                                    <p className="text-sm">{msg.message}</p>
                                  </div>
                                </div>
                              </div>
                            ))
                          )}
                          <div ref={chatEndRef} />
                        </div>
                        <div className="flex gap-2 pt-4 border-t">
                          <Input
                            placeholder="Type a message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                          />
                          <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </TabsContent>

        {/* Discover Teams */}
        <TabsContent value="discover" className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search teams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {interestTags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedInterest === tag ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedInterest(tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>

          {filteredOpenTeams.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <Search className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Teams Found</h3>
              <p className="text-muted-foreground mb-4">
                Be the first to create a team in this area!
              </p>
              <Button onClick={() => setCreateDialogOpen(true)} disabled={!user}>
                Create Team
              </Button>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {filteredOpenTeams.map((team, index) => (
                <motion.div
                  key={team.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * Math.min(index, 5) }}
                  className="p-6 rounded-2xl bg-card border border-border shadow-soft hover:shadow-card transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-display font-semibold">{team.name}</h3>
                      <p className="text-muted-foreground text-sm">{team.description || "No description"}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {team.interests.map((interest) => (
                          <Badge key={interest} variant="secondary">{interest}</Badge>
                        ))}
                      </div>
                    </div>
                    <Button
                      onClick={() => handleRequestToJoin(team.id, team.name)}
                      disabled={!user || pendingRequests.includes(team.id)}
                      variant={pendingRequests.includes(team.id) ? "outline" : "default"}
                    >
                      {pendingRequests.includes(team.id) ? (
                        <>
                          <Clock className="w-4 h-4 mr-2" />
                          Requested
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 mr-2" />
                          Request to Join
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-sm text-muted-foreground py-4"
      >
        Created by the Students
      </motion.div>
    </div>
  );
}
