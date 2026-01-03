import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { getSafeProfileErrorMessage } from "@/lib/errorMessages";
import { 
  Rocket, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Sparkles,
  Code,
  Palette,
  TrendingUp,
  Database,
  Beaker,
  Users,
  Linkedin,
  Github
} from "lucide-react";

const interests = [
  { id: "coding", label: "Coding & Development", icon: Code },
  { id: "design", label: "Design & UX", icon: Palette },
  { id: "business", label: "Business & Entrepreneurship", icon: TrendingUp },
  { id: "data-science", label: "Data Science & AI", icon: Database },
  { id: "research", label: "Research & Academia", icon: Beaker },
  { id: "community", label: "Community & Social Impact", icon: Users },
];

const skills = [
  "JavaScript", "Python", "React", "Node.js", "Machine Learning",
  "Data Analysis", "UI/UX Design", "Figma", "Product Management",
  "Content Writing", "Public Speaking", "Leadership", "Project Management",
];

const careerGoals = [
  "Software Engineer at a top company",
  "Start my own company",
  "Work in AI/ML research",
  "Product Manager",
  "Designer at a creative agency",
  "Data Scientist",
  "Still exploring",
];

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [careerGoal, setCareerGoal] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [college, setCollege] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      }
    };
    checkSession();
  }, [navigate]);

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { error } = await supabase
        .from("profiles")
        .update({
          interests: selectedInterests,
          skills: selectedSkills,
          career_goal: careerGoal,
          linkedin_url: linkedinUrl,
          github_url: githubUrl,
          college,
          graduation_year: graduationYear,
        })
        .eq("user_id", user.id);

      if (error) throw error;

      toast({
        title: "Profile complete!",
        description: "Let's start your growth journey.",
      });
      navigate("/welcome");
    } catch (error: unknown) {
      toast({
        title: "Error",
        description: getSafeProfileErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const canProceed = () => {
    if (step === 1) return selectedInterests.length > 0;
    if (step === 2) return selectedSkills.length > 0;
    if (step === 3) return careerGoal !== "";
    return true;
  };

  const totalSteps = 4;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
            <Rocket className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-display font-bold mb-2">
            Let's personalize your journey
          </h1>
          <p className="text-muted-foreground">
            Help us understand you better so we can guide you right.
          </p>
        </div>

        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-2 rounded-full transition-colors ${
                i < step ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>

        {/* Steps */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-2">What interests you?</h2>
                <p className="text-muted-foreground text-sm">Select all that apply</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {interests.map((interest) => (
                  <button
                    key={interest.id}
                    onClick={() => toggleInterest(interest.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      selectedInterests.includes(interest.id)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <interest.icon
                      className={`w-6 h-6 mb-2 ${
                        selectedInterests.includes(interest.id)
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                    <span className="font-medium text-sm">{interest.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-2">What skills do you have?</h2>
                <p className="text-muted-foreground text-sm">
                  Select your current skills (you can always learn more!)
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-4 py-2 rounded-full border transition-all ${
                      selectedSkills.includes(skill)
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-2">What's your career goal?</h2>
                <p className="text-muted-foreground text-sm">
                  No pressure — it's okay to be still exploring!
                </p>
              </div>
              <div className="space-y-3">
                {careerGoals.map((goal) => (
                  <button
                    key={goal}
                    onClick={() => setCareerGoal(goal)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between ${
                      careerGoal === goal
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <span>{goal}</span>
                    {careerGoal === goal && (
                      <Check className="w-5 h-5 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-2">Connect globally</h2>
                <p className="text-muted-foreground text-sm">
                  Share your profiles so others can connect with you
                </p>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="college">College / University</Label>
                  <Input
                    id="college"
                    placeholder="e.g., IIT Delhi, Stanford, MIT"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gradYear">Graduation Year</Label>
                  <Input
                    id="gradYear"
                    placeholder="e.g., 2025"
                    value={graduationYear}
                    onChange={(e) => setGraduationYear(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                    LinkedIn Profile URL
                  </Label>
                  <Input
                    id="linkedin"
                    placeholder="https://linkedin.com/in/yourprofile"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github" className="flex items-center gap-2">
                    <Github className="w-4 h-4" />
                    GitHub Profile URL
                  </Label>
                  <Input
                    id="github"
                    placeholder="https://github.com/yourusername"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => setStep((s) => s - 1)}
            disabled={step === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          {step < totalSteps ? (
            <Button onClick={() => setStep((s) => s + 1)} disabled={!canProceed()}>
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleComplete} disabled={loading}>
              {loading ? (
                "Setting up..."
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Start My Journey
                </>
              )}
            </Button>
          )}
        </div>

        {/* Motivation */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-muted-foreground text-sm mt-8 italic"
        >
          "Everyone starts somewhere. You're already ahead by being here."
        </motion.p>
      </motion.div>
    </div>
  );
}
