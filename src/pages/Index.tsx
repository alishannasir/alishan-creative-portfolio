import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ProjectsGrid from "@/components/ProjectsGrid";
import WhyWorkWithMe from "@/components/WhyWorkWithMe";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingShapes from "@/components/FloatingShapes";

const Index = () => {
  return (
    <main>
      <div className="relative">
        <FloatingShapes />
        <Hero />
      </div>
      <Services />
      <ProjectsGrid />
      <div className="relative">
        <FloatingShapes />
        <WhyWorkWithMe />
      </div>
      <div className="relative">
        <FloatingShapes />
        <Contact />
      </div>
      <Footer />
    </main>
  );
};

export default Index;
