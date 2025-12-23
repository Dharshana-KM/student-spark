import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Users, BookOpen, Lightbulb, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const quotes = [
  "You're not late. Start now.",
  "Everyone starts somewhere.",
  "Learn. Build. Solve. Grow.",
];

const features = [
  {
    icon: Lightbulb,
    title: "Guidance Hub",
    description: "Learn from IIT students and professors through podcasts and videos",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: BookOpen,
    title: "Skill Courses",
    description: "Access career-oriented courses with progress tracking",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: Rocket,
    title: "Impact Board",
    description: "Solve real-world problems from NGOs, startups, and communities",
    color: "bg-accent/20 text-accent-foreground",
  },
  {
    icon: Users,
    title: "Team Up",
    description: "Find students with similar interests and build together",
    color: "bg-success/10 text-success",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 py-20 lg:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Created by students. For students.</span>
          </motion.div>

          {/* Main headline */}
          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold leading-tight mb-6">
            Grow Together.{" "}
            <span className="text-gradient">Build Together.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={itemVariants} className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            A platform where students guide students. Learn from peers, build real projects, 
            solve meaningful problems, and grow into the person you want to become.
          </motion.p>

          {/* Motivational quote */}
          <motion.p variants={itemVariants} className="text-primary font-medium italic mb-10">
            "{quotes[0]}"
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" asChild>
              <Link to="/dashboard">
                Start Your Journey
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="glass" size="xl" asChild>
              <Link to="/guidance">
                Explore Guidance
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export function FeaturesSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
            Everything You Need to <span className="text-gradient">Grow</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From guidance to real-world impact — we've got your back.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 shadow-soft hover:shadow-card transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "This platform helped me find my direction. I went from feeling lost to leading a team solving real problems.",
      name: "Priya Sharma",
      role: "IIT Delhi, 3rd Year",
    },
    {
      quote: "The guidance from seniors and the hands-on projects gave me more confidence than any classroom could.",
      name: "Rahul Verma",
      role: "NIT Trichy, Final Year",
    },
    {
      quote: "I found my team here. We built something meaningful together and it changed how I see my potential.",
      name: "Ananya Reddy",
      role: "BITS Pilani, 2nd Year",
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
            Stories of <span className="text-gradient">Growth</span>
          </h2>
          <p className="text-muted-foreground text-lg">Real students. Real journeys. Real impact.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="p-8 rounded-2xl bg-card border border-border shadow-soft"
            >
              <p className="text-foreground mb-6 italic">"{testimonial.quote}"</p>
              <div>
                <p className="font-display font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="py-24 gradient-primary relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 bg-primary-foreground/10 rounded-full blur-2xl" />
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-primary-foreground/10 rounded-full blur-2xl" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8">
            Join thousands of students who are learning, building, and growing together.
          </p>
          <Button variant="glass" size="xl" className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/30" asChild>
            <Link to="/dashboard">
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="py-12 bg-muted/50 border-t border-border">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg">GrowthPath</span>
          </div>
          <p className="text-muted-foreground text-sm">
            Created by students. For students. © 2024
          </p>
          <div className="flex gap-6">
            <Link to="/guidance" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Guidance</Link>
            <Link to="/courses" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Courses</Link>
            <Link to="/impact" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Impact</Link>
            <Link to="/teams" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Teams</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
