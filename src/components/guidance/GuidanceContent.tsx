import { motion } from "framer-motion";
import { Play, Clock, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useState } from "react";

const categories = ["All", "Career", "Skills", "Preparation", "Mindset"];

const podcasts = [
  {
    id: "1",
    title: "How to Find Your Purpose",
    speaker: "Simon Sinek",
    role: "Author & Speaker",
    source: "TEDx",
    category: "Career",
    duration: "18 min",
    thumbnail: "https://img.youtube.com/vi/u4ZoJKF_VuA/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/u4ZoJKF_VuA",
    description: "Discover how to find meaning and purpose in your work and life.",
  },
  {
    id: "2",
    title: "The Power of Believing That You Can Improve",
    speaker: "Carol Dweck",
    role: "Professor, Stanford",
    source: "TED",
    category: "Mindset",
    duration: "10 min",
    thumbnail: "https://img.youtube.com/vi/_X0mgOOSpLU/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/_X0mgOOSpLU",
    description: "Learn about the growth mindset and how it can transform your learning.",
  },
  {
    id: "3",
    title: "Inside the Mind of a Master Procrastinator",
    speaker: "Tim Urban",
    role: "Writer & Blogger",
    source: "TED",
    category: "Mindset",
    duration: "14 min",
    thumbnail: "https://img.youtube.com/vi/arj7oStGLkU/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/arj7oStGLkU",
    description: "A hilarious and insightful look into why we procrastinate.",
  },
  {
    id: "4",
    title: "How to Speak So That People Want to Listen",
    speaker: "Julian Treasure",
    role: "Sound Expert",
    source: "TED",
    category: "Skills",
    duration: "10 min",
    thumbnail: "https://img.youtube.com/vi/eIho2S0ZahI/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/eIho2S0ZahI",
    description: "Master the art of communication and become a better speaker.",
  },
  {
    id: "5",
    title: "The Happy Secret to Better Work",
    speaker: "Shawn Achor",
    role: "Positive Psychology Researcher",
    source: "TED",
    category: "Mindset",
    duration: "12 min",
    thumbnail: "https://img.youtube.com/vi/fLJsdqxnZb0/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/fLJsdqxnZb0",
    description: "Discover how happiness inspires productivity, not the other way around.",
  },
  {
    id: "6",
    title: "Grit: The Power of Passion and Perseverance",
    speaker: "Angela Lee Duckworth",
    role: "Psychologist & Author",
    source: "TED",
    category: "Preparation",
    duration: "6 min",
    thumbnail: "https://img.youtube.com/vi/H14bBuluwB8/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/H14bBuluwB8",
    description: "Why grit is a better predictor of success than IQ or talent.",
  },
  {
    id: "7",
    title: "The Skill of Self Confidence",
    speaker: "Dr. Ivan Joseph",
    role: "Athletic Director",
    source: "TEDx",
    category: "Skills",
    duration: "13 min",
    thumbnail: "https://img.youtube.com/vi/w-HYZv6HzAs/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/w-HYZv6HzAs",
    description: "Learn how to build unshakeable self-confidence as a skill.",
  },
  {
    id: "8",
    title: "Your Body Language May Shape Who You Are",
    speaker: "Amy Cuddy",
    role: "Social Psychologist",
    source: "TED",
    category: "Preparation",
    duration: "21 min",
    thumbnail: "https://img.youtube.com/vi/Ks-_Mh1QhMc/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/Ks-_Mh1QhMc",
    description: "How power poses can change your life and career outcomes.",
  },
  {
    id: "9",
    title: "Why the Best Hire Might Not Have the Perfect Resume",
    speaker: "Regina Hartley",
    role: "HR Executive",
    source: "TED",
    category: "Career",
    duration: "10 min",
    thumbnail: "https://img.youtube.com/vi/jiDQDLnEXdA/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/jiDQDLnEXdA",
    description: "Why scrappy fighters often outperform those with perfect backgrounds.",
  },
];

export { podcasts };

export function GuidanceContent() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPodcasts = podcasts.filter((podcast) => {
    const matchesCategory = selectedCategory === "All" || podcast.category === selectedCategory;
    const matchesSearch = podcast.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      podcast.speaker.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8 pt-16 lg:pt-0">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl lg:text-4xl font-display font-bold mb-2">
          Guidance Hub
        </h1>
        <p className="text-muted-foreground text-lg">
          Learn from world-class speakers, professors, and thought leaders.
        </p>
      </motion.div>

      {/* Motivational Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="p-4 rounded-xl bg-secondary/10 border border-secondary/20"
      >
        <p className="text-center text-secondary font-medium italic">
          "The best time to start was yesterday. The next best time is now."
        </p>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search talks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Podcast Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPodcasts.map((podcast, index) => (
          <motion.div
            key={podcast.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            whileHover={{ y: -5 }}
            className="group rounded-2xl bg-card border border-border shadow-soft hover:shadow-card transition-all duration-300 overflow-hidden"
          >
            <Link to={`/guidance/${podcast.id}`}>
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={podcast.thumbnail}
                  alt={podcast.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop";
                  }}
                />
                <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/10 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-primary-foreground ml-1" />
                  </div>
                </div>
                <div className="absolute top-3 left-3 flex gap-2">
                  <Badge variant="secondary">{podcast.category}</Badge>
                  <Badge variant="outline" className="bg-background/80">{podcast.source}</Badge>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {podcast.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {podcast.description}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="w-4 h-4" />
                    <span>{podcast.speaker}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{podcast.duration}</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
