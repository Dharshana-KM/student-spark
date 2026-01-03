import { HeroSection, FeaturesSection, TestimonialsSection, CTASection, Footer } from "@/components/landing/LandingSections";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Grow Together, Build Together - Student Platform</title>
        <meta name="description" content="A student-led platform for learning, building teams, and solving real-world problems. Created by students, for students." />
      </Helmet>
      <main className="min-h-screen">
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CTASection />
        <Footer />
      </main>
    </>
  );
};

export default Index;
