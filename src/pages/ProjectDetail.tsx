import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowLeft } from "lucide-react";
import gilgit from "@/assets/work/gilgit.png";
import fieldPulse from "@/assets/work/filed.png";
import qho from "@/assets/work/qho.png";
import uconnect from "@/assets/work/uconnect.png";
import Footer from "@/components/Footer";

const allProjects = [
  {
    id: 1,
    title: "GILGIT APP",
    category: "E-Commerce App",
    year: "2024",
    description: "A large-scale e-commerce application serving over 1 million users with a seamless and reliable shopping experience.",
    longDescription: "Gilgit App is a premier e-commerce platform in the region, designed to handle high-volume traffic and provide a seamless shopping experience. With over 1 million active users, the app focuses on performance, localized payment integrations, and a robust vendor dashboard that empowers local businesses.",
    role: "DESIGN & DEVELOPMENT",
    tools: ["REACT NATIVE", "NODE.JS", "MONGODB", "REDIS", "AWS"],
    image: gilgit,
  },
  {
    id: 2,
    title: "FIELD PULSE",
    category: "Landing Page & CRM",
    year: "2024",
    description: "A Svelte-based landing website and CRM integration powered by Strapi, designed for efficient field service management.",
    longDescription: "Field Pulse provides a modern solution for field service management. We built a high-performance landing page using Svelte for the frontend and Strapi as the headless CMS. The project included custom CRM integrations to automate lead management, service scheduling, and real-time reporting for field teams.",
    role: "FULL-STACK DEVELOPMENT",
    tools: ["SVELTE", "SVELTEKIT", "STRAPI", "POSTGRESQL", "TAILWIND"],
    image: fieldPulse,
  },
  {
    id: 3,
    title: "QHO HR",
    category: "SaaS Platform",
    year: "2023",
    description: "A comprehensive HR management SaaS platform built with Next.js, offering streamlined corporate operations and employee management.",
    longDescription: "QHO HR is a sophisticated SaaS platform designed to streamline corporate HR operations. Built with Next.js for optimal performance and SEO, it features employee onboarding modules, payroll management, and real-time performance tracking with detailed analytics to help HR teams make data-driven decisions.",
    role: "UI/UX & FRONTEND",
    tools: ["NEXT.JS", "TYPESCRIPT", "TAILWIND", "PRISMA", "POSTGRESQL"],
    image: qho,
  },
  {
    id: 4,
    title: "UCONNECT",
    category: "Corporate Website",
    year: "2023",
    description: "The official landing page for Uconnect Technologies, showcasing premium tech solutions and modern service offerings.",
    longDescription: "Uconnect's official corporate website serves as a digital storefront for their premium technology services. The design focuses on a clean, professional aesthetic that highlights their expertise in software development and digital transformation, utilizing modern web standards and custom animations for a premium user experience.",
    role: "BRAND IDENTITY & WEB",
    tools: ["REACT", "FRAMER MOTION", "TYPESCRIPT", "TAILWIND", "GSAP"],
    image: uconnect,
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
