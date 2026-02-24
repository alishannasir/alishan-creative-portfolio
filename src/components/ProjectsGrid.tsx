import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

const projects = [
  { id: 1, title: "RIO LIFE", category: "E-Commerce", image: project1 },
  { id: 2, title: "EDITORIAL", category: "Brand Identity", image: project2 },
  { id: 3, title: "FINTECH APP", category: "Mobile App", image: project3 },
  { id: 4, title: "IMMERSIVE 3D", category: "Web Experience", image: project4 },
];

const ProjectsGrid = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="px-4 md:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex items-baseline justify-between mb-16"
      >
        <h2 className="font-display font-extrabold text-primary text-[8vw] md:text-[4vw] tracking-tight">
          SELECTED WORK
        </h2>
        <Link
          to="/work"
          data-cursor-hover
          className="font-mono text-xs text-primary tracking-widest hover:opacity-60 transition-opacity"
        >
          VIEW ALL →
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.15 }}
          >
            <Link to="/work" data-cursor-plus>
              <motion.div
                className="relative overflow-hidden aspect-square group"
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                animate={{
                  scale: hoveredId === null ? 1 : hoveredId === project.id ? 1.02 : 0.95,
                  filter: hoveredId === null ? "blur(0px)" : hoveredId === project.id ? "blur(0px)" : "blur(4px)",
                  opacity: hoveredId === null ? 1 : hoveredId === project.id ? 1 : 0.5,
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.div>

              <motion.div
                className="mt-3 flex items-center justify-between"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <span className="font-mono text-xs text-primary tracking-widest uppercase">
                  ({i + 1}) {project.title}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
                  {project.category}
                </span>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsGrid;
