import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Clock, 
  Video,
  Play,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { courses } from "./courseData";
import { useCourseProgress } from "@/hooks/useCourseProgress";
import { toast } from "sonner";

export function CourseDetailContent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCourseProgress, startCourse, updateProgress } = useCourseProgress();
  
  const course = courses.find(c => c.id === id);
  const userProgress = id ? getCourseProgress(id) : undefined;
  const progress = userProgress?.progress || 0;
  const status = userProgress?.status || "not_started";
  
  if (!course) {
    return (
      <div className="max-w-4xl mx-auto pt-16 lg:pt-0 text-center">
        <h1 className="text-2xl font-bold mb-4">Course not found</h1>
        <Button onClick={() => navigate("/courses")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Courses
        </Button>
      </div>
    );
  }

  const handleStartCourse = async () => {
    if (!id) return;
    
    const result = await startCourse(id);
    if (result) {
      toast.success("Course started! Good luck on your learning journey.");
    }
  };

  const handleContinueLearning = async () => {
    if (!id || !userProgress) {
      await handleStartCourse();
      return;
    }
    
    // Simulate progress increase
    const newProgress = Math.min(progress + 10, 100);
    await updateProgress(id, newProgress);
    
    if (newProgress >= 100) {
      toast.success("Congratulations! You've completed this course! 🎉");
    } else {
      toast.success("Progress saved!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pt-16 lg:pt-0">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Button variant="ghost" onClick={() => navigate("/courses")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Courses
        </Button>
      </motion.div>

      {/* Course Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{course.category}</Badge>
          <Badge variant="outline">{course.level}</Badge>
        </div>
        
        <h1 className="text-3xl lg:text-4xl font-display font-bold">
          {course.title}
        </h1>

        <p className="text-lg text-muted-foreground">
          {course.description}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5" />
            <span>{course.videoCount} videos</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span>{course.estimatedHours} hours</span>
          </div>
        </div>
      </motion.div>

      {/* Video Player */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="rounded-2xl overflow-hidden bg-card border border-border shadow-card"
      >
        <div className="aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${course.youtubeId}?rel=0&modestbranding=1`}
            title={course.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </motion.div>

      {/* Progress & Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="p-6 rounded-2xl bg-card border border-border"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Your Progress</span>
            <span className="text-sm text-muted-foreground">{progress}%</span>
          </div>
          <Progress value={progress} className="h-3" />
          
          <Button size="lg" className="w-full" onClick={handleContinueLearning}>
            <Play className="w-4 h-4 mr-2" />
            {status === "not_started" ? "Start Course" : "Continue Learning"}
          </Button>
        </div>
      </motion.div>

      {/* What You'll Learn */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="p-6 rounded-2xl bg-card border border-border"
      >
        <h2 className="text-xl font-display font-semibold mb-4">What You'll Learn</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {course.tags.map((tag, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{tag}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-center text-sm text-muted-foreground py-4"
      >
        Created by the Students
      </motion.div>
    </div>
  );
}
