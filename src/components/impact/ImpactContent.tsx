import { motion } from "framer-motion";
import { 
  Rocket, 
  Heart, 
  Leaf, 
  GraduationCap, 
  Users, 
  Zap,
  Search,
  Calendar,
  MapPin,
  Trophy,
  ArrowRight,
  CheckCircle,
  MessageCircle,
  Send,
  Reply,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const categoryIcons: Record<string, React.ElementType> = {
  "Environment": Leaf,
  "Healthcare": Heart,
  "Education": GraduationCap,
  "Community": Users,
  "Tech": Zap,
};

const categoryColors: Record<string, string> = {
  "Environment": "bg-success/10 text-success border-success/20",
  "Healthcare": "bg-destructive/10 text-destructive border-destructive/20",
  "Education": "bg-info/10 text-info border-info/20",
  "Community": "bg-warning/10 text-warning border-warning/20",
  "Tech": "bg-primary/10 text-primary border-primary/20",
};

interface Problem {
  id: string;
  title: string;
  description: string;
  ngoName: string;
  category: string;
  location: string;
  solversNeeded: number;
  currentSolvers: number;
  deadline?: string;
}

interface Hackathon {
  id: string;
  name: string;
  theme: string;
  college: string;
  date: string;
  duration: string;
  location: string;
  mode: "Online" | "Offline" | "Hybrid";
  prize: string;
  registrations: number;
}

interface Post {
  id: string;
  title: string;
  content: string;
  category: string | null;
  user_id: string;
  created_at: string;
  profile?: { full_name: string };
  comments?: Comment[];
}

interface Comment {
  id: string;
  content: string;
  user_id: string;
  created_at: string;
  parent_id: string | null;
  profile?: { full_name: string };
  replies?: Comment[];
}

// Real NGO Problems
const problems: Problem[] = [
  {
    id: "p1",
    title: "Digital Literacy App for Rural Schools",
    description: "Build an offline-capable mobile app to teach basic digital skills to children in villages with limited internet connectivity.",
    ngoName: "Pratham",
    category: "Education",
    location: "Rural India",
    solversNeeded: 6,
    currentSolvers: 2,
    deadline: "Mar 15, 2025"
  },
  {
    id: "p2",
    title: "Child Nutrition Tracking System",
    description: "Create a system to track and analyze nutritional status of children in mid-day meal programs.",
    ngoName: "Akshaya Patra Foundation",
    category: "Healthcare",
    location: "Pan India",
    solversNeeded: 5,
    currentSolvers: 1,
    deadline: "Feb 28, 2025"
  },
  {
    id: "p3",
    title: "Disaster Relief Coordination Platform",
    description: "Develop a platform to coordinate donations during disasters. Real-time tracking of contributions.",
    ngoName: "Goonj",
    category: "Community",
    location: "Delhi NCR",
    solversNeeded: 4,
    currentSolvers: 2,
    deadline: "Mar 10, 2025"
  },
  {
    id: "p4",
    title: "Wildlife Conservation Alert System",
    description: "Build an IoT-based alert system to detect and prevent poaching in wildlife sanctuaries.",
    ngoName: "WWF India",
    category: "Environment",
    location: "Western Ghats",
    solversNeeded: 5,
    currentSolvers: 3,
    deadline: "Apr 1, 2025"
  },
  {
    id: "p5",
    title: "Child Rights Awareness Platform",
    description: "Create an interactive learning platform to educate children about their rights.",
    ngoName: "CRY India",
    category: "Education",
    location: "Pan India",
    solversNeeded: 4,
    currentSolvers: 0
  },
  {
    id: "p6",
    title: "Scholarship Management Portal",
    description: "Build a scholarship tracking and application system for underprivileged students.",
    ngoName: "Smile Foundation",
    category: "Education",
    location: "Multiple Cities",
    solversNeeded: 3,
    currentSolvers: 1,
    deadline: "Feb 20, 2025"
  },
  {
    id: "p7",
    title: "Teacher Training Modules",
    description: "Design interactive online training modules for government school teachers.",
    ngoName: "Teach For India",
    category: "Education",
    location: "7 Major Cities",
    solversNeeded: 5,
    currentSolvers: 2,
    deadline: "Mar 30, 2025"
  },
  {
    id: "p8",
    title: "Clean Water Access Mapping",
    description: "Create a mapping solution to identify villages lacking clean water access.",
    ngoName: "WaterAid India",
    category: "Environment",
    location: "Rural India",
    solversNeeded: 4,
    currentSolvers: 1
  },
];

// College Hackathons
const hackathons: Hackathon[] = [
  {
    id: "h1",
    name: "Shaastra Tech Challenge",
    theme: "Sustainable Technology for India",
    college: "IIT Madras",
    date: "Jan 18-20, 2025",
    duration: "48 hours",
    location: "Chennai",
    mode: "Hybrid",
    prize: "₹5,00,000",
    registrations: 3200,
  },
  {
    id: "h2",
    name: "Techfest AI Challenge",
    theme: "AI for Social Good",
    college: "IIT Bombay",
    date: "Jan 25-27, 2025",
    duration: "36 hours",
    location: "Mumbai",
    mode: "Offline",
    prize: "₹7,00,000",
    registrations: 4500,
  },
  {
    id: "h3",
    name: "Pragyan Hackathon",
    theme: "Healthcare Innovation",
    college: "NIT Trichy",
    date: "Feb 8-10, 2025",
    duration: "48 hours",
    location: "Tiruchirappalli",
    mode: "Hybrid",
    prize: "₹3,00,000",
    registrations: 1800,
  },
  {
    id: "h4",
    name: "APOGEE Buildathon",
    theme: "FinTech & Blockchain",
    college: "BITS Pilani",
    date: "Feb 15-17, 2025",
    duration: "48 hours",
    location: "Pilani",
    mode: "Offline",
    prize: "₹4,00,000",
    registrations: 2100,
  },
  {
    id: "h5",
    name: "VIT Hack",
    theme: "EdTech Revolution",
    college: "VIT Vellore",
    date: "Feb 22-24, 2025",
    duration: "36 hours",
    location: "Vellore",
    mode: "Hybrid",
    prize: "₹2,50,000",
    registrations: 2800,
  },
];

const categories = ["All", "Environment", "Healthcare", "Education", "Community", "Tech"];

export function ImpactContent() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [joinedProblems, setJoinedProblems] = useState<string[]>([]);
  const [joinedHackathons, setJoinedHackathons] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("discussions");
  
  // Discussion state
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [createPostOpen, setCreatePostOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("Tech");
  const [replyingTo, setReplyingTo] = useState<{postId: string; commentId?: string} | null>(null);
  const [replyContent, setReplyContent] = useState("");

  // Fetch user's joined problems and hackathons
  useEffect(() => {
    if (user) {
      fetchUserJoins();
    }
  }, [user]);

  // Fetch posts
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchUserJoins = async () => {
    if (!user) return;
    
    const [problemsData, hackathonsData] = await Promise.all([
      supabase.from("user_problem_joins").select("problem_id").eq("user_id", user.id),
      supabase.from("user_hackathon_registrations").select("hackathon_id").eq("user_id", user.id)
    ]);

    setJoinedProblems(problemsData.data?.map(p => p.problem_id) || []);
    setJoinedHackathons(hackathonsData.data?.map(h => h.hackathon_id) || []);
  };

  const fetchPosts = async () => {
    setLoadingPosts(true);
    const { data: postsData } = await supabase
      .from("impact_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (postsData) {
      // Fetch profiles and comments
      const userIds = [...new Set(postsData.map(p => p.user_id))];
      const postIds = postsData.map(p => p.id);
      
      const [profilesData, commentsData] = await Promise.all([
        supabase.from("profiles").select("user_id, full_name").in("user_id", userIds),
        supabase.from("impact_comments").select("*").in("post_id", postIds).order("created_at", { ascending: true })
      ]);

      const profileMap = new Map(profilesData.data?.map(p => [p.user_id, p]) || []);
      
      // Fetch comment authors
      if (commentsData.data && commentsData.data.length > 0) {
        const commentUserIds = [...new Set(commentsData.data.map(c => c.user_id))];
        const { data: commentProfiles } = await supabase
          .from("profiles")
          .select("user_id, full_name")
          .in("user_id", commentUserIds);
        
        const commentProfileMap = new Map(commentProfiles?.map(p => [p.user_id, p]) || []);
        
        // Organize comments by post and build reply trees
        const commentsByPost = new Map<string, Comment[]>();
        
        commentsData.data.forEach(comment => {
          const commentWithProfile = {
            ...comment,
            profile: commentProfileMap.get(comment.user_id),
            replies: []
          };
          
          if (!comment.parent_id) {
            const postComments = commentsByPost.get(comment.post_id) || [];
            postComments.push(commentWithProfile);
            commentsByPost.set(comment.post_id, postComments);
          }
        });

        // Add replies
        commentsData.data.forEach(comment => {
          if (comment.parent_id) {
            commentsByPost.forEach(comments => {
              const parent = comments.find(c => c.id === comment.parent_id);
              if (parent) {
                parent.replies = parent.replies || [];
                parent.replies.push({
                  ...comment,
                  profile: commentProfileMap.get(comment.user_id),
                  replies: []
                });
              }
            });
          }
        });

        const enrichedPosts = postsData.map(post => ({
          ...post,
          profile: profileMap.get(post.user_id),
          comments: commentsByPost.get(post.id) || []
        }));

        setPosts(enrichedPosts);
      } else {
        const enrichedPosts = postsData.map(post => ({
          ...post,
          profile: profileMap.get(post.user_id),
          comments: []
        }));
        setPosts(enrichedPosts);
      }
    }
    setLoadingPosts(false);
  };

  // Subscribe to real-time updates
  useEffect(() => {
    const postsChannel = supabase
      .channel("impact-posts")
      .on("postgres_changes", { event: "*", schema: "public", table: "impact_posts" }, () => {
        fetchPosts();
      })
      .subscribe();

    const commentsChannel = supabase
      .channel("impact-comments")
      .on("postgres_changes", { event: "*", schema: "public", table: "impact_comments" }, () => {
        fetchPosts();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(postsChannel);
      supabase.removeChannel(commentsChannel);
    };
  }, []);

  const handleJoinProblem = async (problemId: string, ngoName: string) => {
    if (!user) {
      toast({ title: "Sign in required", description: "Please sign in to join as a solver.", variant: "destructive" });
      return;
    }

    const { error } = await supabase.from("user_problem_joins").insert({
      user_id: user.id,
      problem_id: problemId
    });

    if (error && error.code === "23505") {
      toast({ title: "Already joined", description: "You've already joined this problem." });
      return;
    }

    setJoinedProblems([...joinedProblems, problemId]);
    toast({
      title: "✅ Successfully Joined!",
      description: `You've joined this ${ngoName} problem as a solver.`
    });
  };

  const handleJoinHackathon = async (hackathonId: string, hackathonName: string) => {
    if (!user) {
      toast({ title: "Sign in required", description: "Please sign in to register.", variant: "destructive" });
      return;
    }

    const { error } = await supabase.from("user_hackathon_registrations").insert({
      user_id: user.id,
      hackathon_id: hackathonId
    });

    if (error && error.code === "23505") {
      toast({ title: "Already registered", description: "You've already registered for this hackathon." });
      return;
    }

    setJoinedHackathons([...joinedHackathons, hackathonId]);
    toast({
      title: "🎉 Registered Successfully!",
      description: `You've registered for ${hackathonName}.`
    });
  };

  const handleCreatePost = async () => {
    if (!user || !newPostTitle.trim() || !newPostContent.trim()) return;

    const { error } = await supabase.from("impact_posts").insert({
      title: newPostTitle.trim(),
      content: newPostContent.trim(),
      category: newPostCategory,
      user_id: user.id
    });

    if (!error) {
      toast({ title: "Post created!", description: "Your discussion has been posted." });
      setCreatePostOpen(false);
      setNewPostTitle("");
      setNewPostContent("");
    }
  };

  const handleAddComment = async (postId: string, parentId?: string) => {
    if (!user || !replyContent.trim()) return;

    const { error } = await supabase.from("impact_comments").insert({
      post_id: postId,
      user_id: user.id,
      content: replyContent.trim(),
      parent_id: parentId || null
    });

    if (!error) {
      setReplyingTo(null);
      setReplyContent("");
    }
  };

  const filteredProblems = problems.filter((problem) => {
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.ngoName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || problem.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredHackathons = hackathons.filter((hackathon) => {
    return hackathon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hackathon.theme.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hackathon.college.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const myContributions = problems.filter(p => joinedProblems.includes(p.id));
  const myHackathons = hackathons.filter(h => joinedHackathons.includes(h.id));

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", { 
      month: "short", day: "numeric", year: "numeric" 
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pt-16 lg:pt-0">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl lg:text-4xl font-display font-bold mb-2">
          Impact Board
        </h1>
        <p className="text-muted-foreground text-lg">
          Collaborate on real problems. Join hackathons. Make an impact.
        </p>
      </motion.div>

      {/* My Impact Summary */}
      {(myContributions.length > 0 || myHackathons.length > 0) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid sm:grid-cols-2 gap-4"
        >
          {myContributions.length > 0 && (
            <div className="p-4 rounded-xl bg-success/10 border border-success/20">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-success" />
                <span className="font-semibold">My Contributions: {myContributions.length}</span>
              </div>
            </div>
          )}
          {myHackathons.length > 0 && (
            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-primary" />
                <span className="font-semibold">Registered Hackathons: {myHackathons.length}</span>
              </div>
            </div>
          )}
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
          "The best way to learn is by doing. The best way to grow is by helping."
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search problems, hackathons, discussions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => {
            const Icon = cat !== "All" ? categoryIcons[cat] : Rocket;
            return (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
              >
                <Icon className="w-4 h-4 mr-1" />
                {cat}
              </Button>
            );
          })}
        </div>
      </motion.div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full max-w-2xl grid-cols-4">
          <TabsTrigger value="discussions">
            <MessageCircle className="w-4 h-4 mr-2" />
            Discussions
          </TabsTrigger>
          <TabsTrigger value="problems">
            <Rocket className="w-4 h-4 mr-2" />
            Problems
          </TabsTrigger>
          <TabsTrigger value="hackathons">
            <Trophy className="w-4 h-4 mr-2" />
            Hackathons
          </TabsTrigger>
          <TabsTrigger value="my-impact">
            <CheckCircle className="w-4 h-4 mr-2" />
            My Impact
          </TabsTrigger>
        </TabsList>

        {/* Discussions Tab */}
        <TabsContent value="discussions" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Community Discussions</h2>
            <Dialog open={createPostOpen} onOpenChange={setCreatePostOpen}>
              <DialogTrigger asChild>
                <Button disabled={!user}>
                  <Plus className="w-4 h-4 mr-2" />
                  New Discussion
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Start a Discussion</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <Label htmlFor="post-title">Title</Label>
                    <Input
                      id="post-title"
                      placeholder="What do you want to discuss?"
                      value={newPostTitle}
                      onChange={(e) => setNewPostTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="post-content">Content</Label>
                    <Textarea
                      id="post-content"
                      placeholder="Share your thoughts, ideas, or questions..."
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label>Category</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {categories.filter(c => c !== "All").map((cat) => (
                        <Badge
                          key={cat}
                          variant={newPostCategory === cat ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => setNewPostCategory(cat)}
                        >
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={handleCreatePost}
                    disabled={!newPostTitle.trim() || !newPostContent.trim()}
                  >
                    Post Discussion
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {!user && (
            <div className="p-4 rounded-xl bg-warning/10 border border-warning/20 text-center">
              Sign in to participate in discussions.
            </div>
          )}

          {loadingPosts ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Discussions Yet</h3>
              <p className="text-muted-foreground mb-4">Be the first to start a conversation!</p>
              <Button onClick={() => setCreatePostOpen(true)} disabled={!user}>
                Start Discussion
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => {
                const CategoryIcon = post.category ? categoryIcons[post.category] : MessageCircle;
                return (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-2xl bg-card border border-border shadow-soft"
                  >
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarFallback>{post.profile?.full_name?.[0] || "U"}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-medium">{post.profile?.full_name || "User"}</span>
                            <span className="text-muted-foreground text-sm">
                              {formatDate(post.created_at)}
                            </span>
                            {post.category && (
                              <Badge variant="outline" className={categoryColors[post.category]}>
                                <CategoryIcon className="w-3 h-3 mr-1" />
                                {post.category}
                              </Badge>
                            )}
                          </div>
                          <h3 className="text-lg font-semibold mt-1">{post.title}</h3>
                          <p className="text-muted-foreground mt-2">{post.content}</p>
                        </div>
                      </div>

                      {/* Comments */}
                      <div className="pl-12 space-y-4">
                        {post.comments?.map((comment) => (
                          <div key={comment.id} className="space-y-3">
                            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback className="text-xs">
                                  {comment.profile?.full_name?.[0] || "U"}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium">
                                    {comment.profile?.full_name || "User"}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {formatDate(comment.created_at)}
                                  </span>
                                </div>
                                <p className="text-sm mt-1">{comment.content}</p>
                                {user && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="mt-1 h-auto p-0 text-xs"
                                    onClick={() => setReplyingTo({ postId: post.id, commentId: comment.id })}
                                  >
                                    <Reply className="w-3 h-3 mr-1" />
                                    Reply
                                  </Button>
                                )}
                              </div>
                            </div>

                            {/* Replies */}
                            {comment.replies?.map((reply) => (
                              <div key={reply.id} className="ml-8 flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                                <Avatar className="w-6 h-6">
                                  <AvatarFallback className="text-xs">
                                    {reply.profile?.full_name?.[0] || "U"}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium">
                                      {reply.profile?.full_name || "User"}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                      {formatDate(reply.created_at)}
                                    </span>
                                  </div>
                                  <p className="text-sm mt-1">{reply.content}</p>
                                </div>
                              </div>
                            ))}

                            {/* Reply to comment input */}
                            {replyingTo?.postId === post.id && replyingTo?.commentId === comment.id && (
                              <div className="ml-8 flex gap-2">
                                <Input
                                  placeholder="Write a reply..."
                                  value={replyContent}
                                  onChange={(e) => setReplyContent(e.target.value)}
                                  onKeyDown={(e) => e.key === "Enter" && handleAddComment(post.id, comment.id)}
                                />
                                <Button size="sm" onClick={() => handleAddComment(post.id, comment.id)}>
                                  <Send className="w-4 h-4" />
                                </Button>
                              </div>
                            )}
                          </div>
                        ))}

                        {/* Add comment */}
                        {replyingTo?.postId === post.id && !replyingTo?.commentId && (
                          <div className="flex gap-2">
                            <Input
                              placeholder="Write a comment..."
                              value={replyContent}
                              onChange={(e) => setReplyContent(e.target.value)}
                              onKeyDown={(e) => e.key === "Enter" && handleAddComment(post.id)}
                            />
                            <Button size="sm" onClick={() => handleAddComment(post.id)}>
                              <Send className="w-4 h-4" />
                            </Button>
                          </div>
                        )}

                        {user && replyingTo?.postId !== post.id && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setReplyingTo({ postId: post.id })}
                          >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Add Comment
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* Problems Tab */}
        <TabsContent value="problems" className="space-y-4">
          {filteredProblems.map((problem, index) => {
            const CategoryIcon = categoryIcons[problem.category] || Rocket;
            const isJoined = joinedProblems.includes(problem.id);
            
            return (
              <motion.div
                key={problem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * Math.min(index, 5) }}
                className="p-6 rounded-2xl bg-card border border-border shadow-soft"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center shrink-0">
                    <span className="text-2xl font-bold text-muted-foreground">
                      {problem.ngoName.charAt(0)}
                    </span>
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className={categoryColors[problem.category]}>
                        <CategoryIcon className="w-3 h-3 mr-1" />
                        {problem.category}
                      </Badge>
                      <Badge variant="secondary">{problem.ngoName}</Badge>
                    </div>
                    
                    <h3 className="text-lg font-display font-semibold">{problem.title}</h3>
                    <p className="text-muted-foreground text-sm">{problem.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {problem.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {problem.currentSolvers}/{problem.solversNeeded} solvers
                      </span>
                      {problem.deadline && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {problem.deadline}
                        </span>
                      )}
                    </div>
                  </div>

                  <Button
                    onClick={() => handleJoinProblem(problem.id, problem.ngoName)}
                    disabled={isJoined}
                    variant={isJoined ? "outline" : "default"}
                  >
                    {isJoined ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Joined
                      </>
                    ) : (
                      <>
                        Join as Solver
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </TabsContent>

        {/* Hackathons Tab */}
        <TabsContent value="hackathons" className="space-y-4">
          {filteredHackathons.map((hackathon, index) => {
            const isRegistered = joinedHackathons.includes(hackathon.id);
            
            return (
              <motion.div
                key={hackathon.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * Math.min(index, 5) }}
                className="p-6 rounded-2xl bg-card border border-border shadow-soft"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="default">{hackathon.college}</Badge>
                      <Badge variant="outline">{hackathon.mode}</Badge>
                    </div>
                    
                    <h3 className="text-lg font-display font-semibold">{hackathon.name}</h3>
                    <p className="text-muted-foreground text-sm">{hackathon.theme}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {hackathon.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {hackathon.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Trophy className="w-4 h-4" />
                        {hackathon.prize}
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleJoinHackathon(hackathon.id, hackathon.name)}
                    disabled={isRegistered}
                    variant={isRegistered ? "outline" : "default"}
                  >
                    {isRegistered ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Registered
                      </>
                    ) : (
                      <>
                        Register Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </TabsContent>

        {/* My Impact Tab */}
        <TabsContent value="my-impact" className="space-y-6">
          {myContributions.length === 0 && myHackathons.length === 0 ? (
            <div className="text-center py-12">
              <Rocket className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Contributions Yet</h3>
              <p className="text-muted-foreground mb-4">
                Join NGO problems or register for hackathons to make an impact!
              </p>
              <Button onClick={() => setActiveTab("problems")}>
                Explore Problems
              </Button>
            </div>
          ) : (
            <>
              {myContributions.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">My Problem Contributions</h3>
                  <div className="space-y-3">
                    {myContributions.map((problem) => (
                      <div key={problem.id} className="p-4 rounded-xl bg-success/5 border border-success/20">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-success" />
                          <span className="font-medium">{problem.title}</span>
                          <Badge variant="secondary">{problem.ngoName}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {myHackathons.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Registered Hackathons</h3>
                  <div className="space-y-3">
                    {myHackathons.map((hackathon) => (
                      <div key={hackathon.id} className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                        <div className="flex items-center gap-2">
                          <Trophy className="w-5 h-5 text-primary" />
                          <span className="font-medium">{hackathon.name}</span>
                          <Badge variant="secondary">{hackathon.college}</Badge>
                          <span className="text-sm text-muted-foreground">{hackathon.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
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
