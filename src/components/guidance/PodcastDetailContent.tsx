import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  User, 
  Clock, 
  MessageCircle, 
  Send,
  ThumbsUp,
  Bookmark,
  Share2,
  CheckCircle,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { podcasts } from "./GuidanceContent";

const podcastDetails: Record<string, {
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
    keyTakeaways: [
      "Start with 'Why' — understand your purpose before your 'what' and 'how'",
      "Purpose drives motivation and long-term success",
      "Great leaders inspire action through shared purpose",
      "Finding meaning in work leads to fulfillment, not just success",
    ],
    nextSteps: [
      "Write down your 'Why' — what drives you beyond money",
      "Reflect on moments when you felt most fulfilled",
      "Share your purpose with someone you trust",
    ],
    comments: [
      {
        id: "c1",
        author: "Priya S.",
        avatar: "",
        time: "2 days ago",
        content: "This talk changed how I think about my career. Purpose first, success follows.",
        likes: 42,
      },
      {
        id: "c2",
        author: "Rahul M.",
        avatar: "",
        time: "1 week ago",
        content: "Shared this with my entire team. We're now rethinking our 'Why' together.",
        likes: 28,
      },
    ],
  },
  "2": {
    keyTakeaways: [
      "Growth mindset: abilities can be developed through dedication",
      "Embrace challenges instead of avoiding them",
      "Learn from criticism rather than ignoring it",
      "The power of 'not yet' over 'failed'",
    ],
    nextSteps: [
      "Replace 'I can't do this' with 'I can't do this yet'",
      "Take on one challenge outside your comfort zone this week",
      "Journal about a recent failure and what you learned",
    ],
    comments: [
      {
        id: "c1",
        author: "Ananya K.",
        avatar: "",
        time: "3 days ago",
        content: "The 'yet' framework is powerful. I'm using it daily now!",
        likes: 35,
      },
    ],
  },
  "3": {
    keyTakeaways: [
      "The 'Instant Gratification Monkey' hijacks our rational decision-maker",
      "The 'Panic Monster' only wakes up at deadlines",
      "Procrastination affects everyone, even successful people",
      "Long-term procrastination has no deadline — it's the most dangerous",
    ],
    nextSteps: [
      "Identify your Dark Playground activities",
      "Set artificial deadlines for important tasks",
      "Start with just 2 minutes on intimidating tasks",
    ],
    comments: [
      {
        id: "c1",
        author: "Vikram P.",
        avatar: "",
        time: "5 days ago",
        content: "Literally me every day. At least now I understand why!",
        likes: 67,
      },
    ],
  },
  "4": {
    keyTakeaways: [
      "Seven deadly sins of speaking: gossip, judging, negativity, complaining",
      "HAIL: Honesty, Authenticity, Integrity, Love",
      "Your voice is a toolbox — use register, timbre, pace, pitch",
      "Silence is a powerful tool in communication",
    ],
    nextSteps: [
      "Practice speaking from your chest, not your throat",
      "Record yourself speaking and analyze your pace and tone",
      "Pause before important points for emphasis",
    ],
    comments: [
      {
        id: "c1",
        author: "Neha R.",
        avatar: "",
        time: "1 week ago",
        content: "Used these tips in my presentation yesterday. Got great feedback!",
        likes: 23,
      },
    ],
  },
  "5": {
    keyTakeaways: [
      "We think success brings happiness, but it's the opposite",
      "The happiness advantage: positive brains are more productive",
      "Dopamine from positivity improves learning and creativity",
      "Simple practices can rewire your brain for positivity",
    ],
    nextSteps: [
      "Write 3 gratitudes daily for 21 days",
      "Journal about one positive experience each day",
      "Exercise, meditate, or do random acts of kindness",
    ],
    comments: [
      {
        id: "c1",
        author: "Arjun S.",
        avatar: "",
        time: "4 days ago",
        content: "Started the 21-day gratitude challenge. Day 8 and feeling different!",
        likes: 31,
      },
    ],
  },
  "6": {
    keyTakeaways: [
      "Grit = passion + perseverance for long-term goals",
      "Grit is a better predictor of success than IQ",
      "Growth mindset is essential for building grit",
      "Talent alone doesn't guarantee achievement",
    ],
    nextSteps: [
      "Identify one long-term goal you'll commit to",
      "Practice deliberate discomfort — do hard things",
      "Find your passion, then persevere through challenges",
    ],
    comments: [
      {
        id: "c1",
        author: "Kavya M.",
        avatar: "",
        time: "2 weeks ago",
        content: "This explains why some 'average' students end up more successful!",
        likes: 45,
      },
    ],
  },
  "7": {
    keyTakeaways: [
      "Self-confidence is a skill, not a trait — you can build it",
      "Repetition builds confidence through experience",
      "Self-affirmation works — tell yourself positive things",
      "Interpret feedback constructively, not destructively",
    ],
    nextSteps: [
      "Write a letter to yourself about your strengths",
      "Practice one skill for 20 minutes daily",
      "Catch negative self-talk and reframe it",
    ],
    comments: [
      {
        id: "c1",
        author: "Rohan K.",
        avatar: "",
        time: "1 week ago",
        content: "The self-affirmation tip felt silly at first but actually works!",
        likes: 19,
      },
    ],
  },
  "8": {
    keyTakeaways: [
      "Body language affects how others see us and how we see ourselves",
      "Power poses increase testosterone and decrease cortisol",
      "'Fake it till you become it' — embodied cognition is real",
      "Two minutes of power posing can change your life",
    ],
    nextSteps: [
      "Do a power pose before your next interview or presentation",
      "Notice your body language throughout the day",
      "Stand tall and take up space in meetings",
    ],
    comments: [
      {
        id: "c1",
        author: "Shreya T.",
        avatar: "",
        time: "3 days ago",
        content: "Did the Wonder Woman pose before my interview. I got the job!",
        likes: 56,
      },
    ],
  },
  "9": {
    keyTakeaways: [
      "'Scrappers' who overcome adversity often outperform 'Silver Spoons'",
      "Post-traumatic growth builds resilience and determination",
      "A 'perfect' resume doesn't guarantee perfect performance",
      "Give people chances — potential matters as much as pedigree",
    ],
    nextSteps: [
      "Reframe your challenges as strengths on your resume",
      "Share your story authentically in interviews",
      "Look for resilience when evaluating candidates or partners",
    ],
    comments: [
      {
        id: "c1",
        author: "Amit D.",
        avatar: "",
        time: "6 days ago",
        content: "As a first-gen college student, this talk gave me so much hope.",
        likes: 38,
      },
    ],
  },
};

export function PodcastDetailContent() {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [localComments, setLocalComments] = useState<Array<{
    id: string;
    author: string;
    avatar: string;
    time: string;
    content: string;
    likes: number;
  }>>([]);

  const podcast = podcasts.find((p) => p.id === id);
  const details = id && podcastDetails[id] ? podcastDetails[id] : {
    keyTakeaways: ["Watch the full video for key insights"],
    nextSteps: ["Take notes while watching", "Apply one idea today"],
    comments: [],
  };

  const allComments = [...details.comments, ...localComments];

  const handleSubmitComment = () => {
    if (comment.trim()) {
      setLocalComments([
        {
          id: `new-${Date.now()}`,
          author: "You",
          avatar: "",
          time: "Just now",
          content: comment,
          likes: 0,
        },
        ...localComments,
      ]);
      setComment("");
    }
  };

  if (!podcast) {
    return (
      <div className="max-w-4xl mx-auto pt-16 lg:pt-0 text-center">
        <h1 className="text-2xl font-display font-bold mb-4">Talk not found</h1>
        <Button asChild>
          <Link to="/guidance">Back to Guidance Hub</Link>
        </Button>
      </div>
    );
  }

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
        <div className="flex gap-2">
          <Badge variant="secondary">{podcast.category}</Badge>
          <Badge variant="outline">{podcast.source}</Badge>
        </div>
        
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
          {details.keyTakeaways.map((takeaway, index) => (
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
          {details.nextSteps.map((step, index) => (
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

      {/* Motivation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="p-6 rounded-2xl gradient-warm text-center"
      >
        <p className="text-xl font-medium text-primary-foreground italic">
          "Knowledge is only potential power. Action makes it powerful."
        </p>
      </motion.div>
    </div>
  );
}
