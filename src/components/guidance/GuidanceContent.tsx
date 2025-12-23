import { motion } from "framer-motion";
import { Play, Clock, User, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useState } from "react";

const categories = ["All", "Career", "Skills", "Preparation", "Mindset"];

const podcasts = [
  {
    id: "1",
    title: "Finding Your Path After Graduation",
    speaker: "Dr. Ananya Singh",
    role: "Professor, IIT Delhi",
    category: "Career",
    duration: "32 min",
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
    description: "A candid conversation about career choices and finding your true calling.",
  },
  {
    id: "2",
    title: "Building Real Skills That Matter",
    speaker: "Rahul Mehra",
    role: "4th Year, IIT Bombay",
    category: "Skills",
    duration: "28 min",
    thumbnail: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop",
    description: "How I learned programming and built my first startup as a student.",
  },
  {
    id: "3",
    title: "Mental Health for Students",
    speaker: "Dr. Priya Patel",
    role: "Counselor, IIT Madras",
    category: "Mindset",
    duration: "45 min",
    thumbnail: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=300&fit=crop",
    description: "Strategies for managing stress, anxiety, and maintaining balance during college.",
  },
  {
    id: "4",
    title: "Cracking Technical Interviews",
    speaker: "Vikram Kumar",
    role: "Google Engineer, IIT Kanpur Alumnus",
    category: "Preparation",
    duration: "52 min",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    description: "My journey from campus placements to FAANG, and tips that actually work.",
  },
  {
    id: "5",
    title: "The Power of Saying Yes",
    speaker: "Neha Sharma",
    role: "3rd Year, IIT Kharagpur",
    category: "Mindset",
    duration: "24 min",
    thumbnail: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop",
    description: "How stepping out of my comfort zone changed everything.",
  },
  {
    id: "6",
    title: "Open Source for Beginners",
    speaker: "Arjun Reddy",
    role: "2nd Year, NIT Warangal",
    category: "Skills",
    duration: "38 min",
    thumbnail: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop",
    description: "Your first contribution to open source — a step-by-step guide.",
  },
];

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
          Learn from IIT students and professors who've walked the path before you.
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
            placeholder="Search podcasts..."
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
                />
                <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/10 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-primary-foreground ml-1" />
                  </div>
                </div>
                <Badge className="absolute top-3 left-3" variant="secondary">
                  {podcast.category}
                </Badge>
              </div>
              <div className="p-5">
                <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
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
