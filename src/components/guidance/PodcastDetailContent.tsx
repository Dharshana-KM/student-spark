import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  User, 
  Clock, 
  MessageCircle, 
  Send,
  ThumbsUp,
  Bookmark,
  Share2,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";

const podcastData: Record<string, {
  id: string;
  title: string;
  speaker: string;
  role: string;
  category: string;
  duration: string;
  videoUrl: string;
  description: string;
  keyTakeaways: string[];
  nextSteps: string[];
  comments: Array<{
    id: string;
    author: string;
    avatar: string;
    time: string;
    content: string;
    likes: number;
  }>;
}> = {
  "1": {
    id: "1",
    title: "Finding Your Path After Graduation",
    speaker: "Dr. Ananya Singh",
    role: "Professor, IIT Delhi",
    category: "Career",
    duration: "32 min",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "In this candid conversation, Dr. Ananya Singh shares her insights from years of mentoring students. She discusses the pressure of choosing a career path, the importance of exploration, and why it's okay to change direction. Drawing from both her academic experience and real-world observations, she provides practical advice for students feeling lost or uncertain about their future.",
    keyTakeaways: [
      "It's normal to feel uncertain — don't rush major decisions",
      "Exploration is valuable; try different things before committing",
      "Your first job doesn't define your entire career",
      "Build skills that transfer across industries",
      "Find mentors who can share honest perspectives"
    ],
    nextSteps: [
      "List 3 areas you're curious about and research each",
      "Reach out to 2 people in fields that interest you",
      "Start a small project to test your interest",
      "Join a community related to your potential path"
    ],
    comments: [
      {
        id: "c1",
        author: "Priya Sharma",
        avatar: "",
        time: "2 days ago",
        content: "This really helped me feel less anxious about not having everything figured out. Thank you!",
        likes: 24
      },
      {
        id: "c2",
        author: "Rahul V.",
        avatar: "",
        time: "5 days ago",
        content: "The point about first jobs not defining your career was eye-opening. I was putting too much pressure on myself.",
        likes: 18
      }
    ]
  }
};

// Default data for other podcasts
const defaultPodcast = {
  id: "default",
  title: "Loading...",
  speaker: "Guest Speaker",
  role: "Expert",
  category: "General",
  duration: "30 min",
  videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  description: "Podcast description loading...",
  keyTakeaways: ["Key insight 1", "Key insight 2", "Key insight 3"],
  nextSteps: ["Step 1", "Step 2", "Step 3"],
  comments: []
};

export function PodcastDetailContent() {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [localComments, setLocalComments] = useState<typeof defaultPodcast.comments>([]);

  const podcast = id && podcastData[id] ? podcastData[id] : { ...defaultPodcast, id: id || "1" };
  const allComments = [...podcast.comments, ...localComments];

  const handleSubmitComment = () => {
    if (comment.trim()) {
      setLocalComments([
        {
          id: `new-${Date.now()}`,
          author: "You",
          avatar: "",
          time: "Just now",
          content: comment,
          likes: 0
        },
        ...localComments
      ]);
      setComment("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pt-16 lg:pt-0">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button variant="ghost" asChild>
          <Link to="/guidance">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Guidance Hub
          </Link>
        </Button>
      </motion.div>

      {/* Video Player */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl overflow-hidden shadow-card bg-foreground/5"
      >
        <div className="aspect-video">
          <iframe
            src={podcast.videoUrl}
            title={podcast.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </motion.div>

      {/* Title and Meta */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-4"
      >
        <h1 className="text-2xl lg:text-3xl font-display font-bold">
          {podcast.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{podcast.speaker}</span>
            <span className="text-muted-foreground/50">•</span>
            <span>{podcast.role}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{podcast.duration}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button variant="outline" size="sm">
            <ThumbsUp className="w-4 h-4 mr-2" />
            Helpful
          </Button>
          <Button variant="outline" size="sm">
            <Bookmark className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>

        <p className="text-muted-foreground leading-relaxed">
          {podcast.description}
        </p>
      </motion.div>

      {/* Key Takeaways */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="p-6 rounded-2xl bg-primary/5 border border-primary/20"
      >
        <h2 className="text-xl font-display font-semibold mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-primary" />
          Key Takeaways
        </h2>
        <ul className="space-y-3">
          {podcast.keyTakeaways.map((takeaway, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-sm font-medium">
                {index + 1}
              </div>
              <span>{takeaway}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Next Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="p-6 rounded-2xl bg-secondary/5 border border-secondary/20"
      >
        <h2 className="text-xl font-display font-semibold mb-4 text-secondary">
          Next Steps for You
        </h2>
        <ul className="space-y-3">
          {podcast.nextSteps.map((step, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0 text-sm font-medium">
                {index + 1}
              </div>
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Comments Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="p-6 rounded-2xl bg-card border border-border"
      >
        <h2 className="text-xl font-display font-semibold mb-6 flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Discussion ({allComments.length})
        </h2>

        {/* Add Comment */}
        <div className="flex gap-3 mb-6">
          <Avatar className="w-10 h-10">
            <AvatarFallback>You</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-3">
            <Textarea
              placeholder="Share your thoughts or ask a question..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[80px] resize-none"
            />
            <Button onClick={handleSubmitComment} disabled={!comment.trim()}>
              <Send className="w-4 h-4 mr-2" />
              Post Comment
            </Button>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {allComments.map((c) => (
            <div key={c.id} className="flex gap-3 p-4 rounded-xl bg-muted/50">
              <Avatar className="w-10 h-10">
                <AvatarImage src={c.avatar} />
                <AvatarFallback>{c.author[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{c.author}</span>
                  <span className="text-muted-foreground text-sm">{c.time}</span>
                </div>
                <p className="text-muted-foreground">{c.content}</p>
                <button className="flex items-center gap-1 text-sm text-muted-foreground mt-2 hover:text-primary transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  {c.likes}
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
