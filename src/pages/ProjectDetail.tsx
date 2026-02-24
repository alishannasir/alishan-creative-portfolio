import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowLeft } from "lucide-react";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import Footer from "@/components/Footer";

const allProjects = [
  {
    id: 1,
    title: "RIO LIFE",
    category: "E-Commerce",
    year: "2024",
    description: "A premium e-commerce platform with custom product configurator and seamless checkout experience.",
    longDescription: "Rio Life is a luxury e-commerce brand that demanded an experience as premium as their products. We crafted a fully custom product configurator that lets users design their perfect piece in real-time, with WebGL-powered 3D previews and buttery-smooth transitions throughout the entire shopping journey.",
    role: "DESIGN & DEVELOPMENT",
    tools: ["REACT", "THREE.JS", "GSAP", "STRIPE"],
    image: project1,
  },
  {
    id: 2,
    title: "EDITORIAL MAG",
    category: "Brand Identity",
    year: "2024",
    description: "Complete brand identity system including editorial design, typography, and visual language.",
    longDescription: "Editorial Mag needed a digital presence that matched the sophistication of their print publication. We developed a comprehensive brand identity system — from custom typography pairings to a modular design system that scales beautifully across web, mobile, and print.",
    role: "BRAND IDENTITY & WEB",
    tools: ["FIGMA", "NEXT.JS", "FRAMER MOTION", "CMS"],
    image: project2,
  },
  {
    id: 3,
    title: "FINTECH DASH",
    category: "Mobile App",
    year: "2023",
    description: "A fintech dashboard reimagined with intuitive data visualization and delightful micro-interactions.",
    longDescription: "Fintech Dash challenged us to make complex financial data feel accessible and even enjoyable. We designed an intuitive dashboard with custom data visualizations, gesture-based navigation, and micro-interactions that make users actually want to check their finances.",
    role: "UI/UX & FRONTEND",
    tools: ["REACT NATIVE", "D3.JS", "TAILWIND", "NODE.JS"],
    image: project3,
  },
  {
    id: 4,
    title: "IMMERSIVE 3D",
    category: "Web Experience",
    year: "2023",
    description: "An immersive 3D web experience pushing the boundaries of WebGL and real-time rendering.",
    longDescription: "Immersive 3D is where art meets technology. We built a fully interactive 3D web experience with real-time rendering, particle systems, and spatial audio — creating a digital environment that users can explore, interact with, and lose themselves in.",
    role: "CREATIVE DEVELOPMENT",
    tools: ["THREE.JS", "WEBGL", "GLSL", "GSAP"],
    image: project4,
  },
];

const ProjectDetail = () => {
  const { id } = useParams();
  const project = allProjects.find((p) => p.id === Number(id));
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  if (!project) {
    return (
      <main className="pt-32 px-4 md:px-8 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display font-extrabold text-primary text-4xl mb-4">PROJECT NOT FOUND</h1>
          <Link to="/work" className="font-mono text-xs text-muted-foreground tracking-widest hover:text-primary transition-colors">
            ← BACK TO WORK
          </Link>
        </div>
      </main>
    );
  }

  const nextProject = allProjects.find((p) => p.id === (project.id % allProjects.length) + 1);

  return (
    <main>
      {/* Hero */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ scale: imageScale, opacity: imageOpacity }}
        >
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/30" />
        </motion.div>

        <motion.div
          className="relative z-10 h-full flex flex-col justify-end px-4 md:px-8 pb-16"
          style={{ y: titleY }}
        >
          <Link
            to="/work"
            data-cursor-hover
            className="font-mono text-xs text-primary-foreground tracking-widest uppercase mb-8 inline-flex items-center gap-2 hover:opacity-60 transition-opacity"
          >
            <ArrowLeft size={14} /> BACK
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-extrabold text-primary-foreground text-[14vw] md:text-[10vw] leading-[0.85] tracking-tighter"
          >
            {project.title}
          </motion.h1>
        </motion.div>
      </section>

      {/* Meta */}
      <section className="px-4 md:px-8 py-24">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-3">(CATEGORY)</p>
            <p className="font-display font-bold text-primary text-lg">{project.category}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-3">(ROLE)</p>
            <p className="font-display font-bold text-primary text-lg">{project.role}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-3">(YEAR)</p>
            <p className="font-display font-bold text-primary text-lg">{project.year}</p>
          </motion.div>
        </div>
      </section>

      {/* Description */}
      <section className="px-4 md:px-8 pb-24">
        <div className="max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display font-bold text-primary text-2xl md:text-4xl leading-tight mb-12"
          >
            {project.description}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-mono text-sm text-muted-foreground leading-relaxed tracking-wider"
          >
            {project.longDescription}
          </motion.p>
        </div>
      </section>

      {/* Tools */}
      <section className="px-4 md:px-8 pb-24 border-t border-border pt-16">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-8">(TOOLS & TECH)</p>
          <div className="flex flex-wrap gap-3">
            {project.tools.map((tool, i) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="px-6 py-3 border border-border font-mono text-xs tracking-widest text-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                data-cursor-hover
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Full Image */}
      <section className="px-4 md:px-8 pb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="aspect-[16/9] overflow-hidden"
        >
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        </motion.div>
      </section>

      {/* Next Project */}
      {nextProject && (
        <section className="px-4 md:px-8 pb-24">
          <Link to={`/work/${nextProject.id}`} data-cursor-plus className="block group">
            <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-4">(NEXT PROJECT)</p>
            <motion.h2
              whileHover={{ x: 20 }}
              transition={{ duration: 0.4 }}
              className="font-display font-extrabold text-primary text-[8vw] md:text-[5vw] tracking-tighter group-hover:opacity-60 transition-opacity"
            >
              {nextProject.title} →
            </motion.h2>
          </Link>
        </section>
      )}

      <Footer />
    </main>
  );
};

export default ProjectDetail;
