import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import gilgit from "@/assets/work/gilgit.png";
import fieldPulse from "@/assets/work/filed.png";
import qho from "@/assets/work/qho.png";
import uconnect from "@/assets/work/uconnect.png";
import Footer from "@/components/Footer";

const allProjects = [
  { id: 1, title: "Gilgit App", category: "E-Commerce App", year: "2024", description: "A large-scale e-commerce application serving over 1 million users with a seamless and reliable shopping experience.", image: gilgit },
  { id: 2, title: "Field Pulse", category: "Landing Page & CRM", year: "2024", description: "A Svelte-based landing website and CRM integration powered by Strapi, designed for efficient field service management.", image: fieldPulse },
  { id: 3, title: "Qho HR", category: "SaaS Platform", year: "2023", description: "A comprehensive HR management SaaS platform built with Next.js, offering streamlined corporate operations and employee management.", image: qho },
  { id: 4, title: "Uconnect", category: "Corporate Website", year: "2023", description: "The official landing page for Uconnect Technologies, showcasing premium tech solutions and modern service offerings.", image: uconnect },
];

const Work = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <main className="pt-32">
      <section className="px-4 md:px-8 mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-primary text-[12vw] md:text-[8vw] leading-[0.85] tracking-tighter"
        >
          All
          <br />
          <span className="text-stroke">Work</span>
        </motion.h1>
      </section>

      <section ref={ref} className="px-4 md:px-8 pb-24">
        <div className="space-y-16 md:space-y-24">
          {allProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="group"
              data-cursor-plus
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <motion.div
                className="relative overflow-hidden aspect-[16/9] md:aspect-[21/9] mb-6"
                animate={{
                  scale: hoveredId === null ? 1 : hoveredId === project.id ? 1.01 : 0.97,
                  filter: hoveredId === null ? "blur(0px)" : hoveredId === project.id ? "blur(0px)" : "blur(6px)",
                  opacity: hoveredId === null ? 1 : hoveredId === project.id ? 1 : 0.4,
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.div>

              <motion.div
                className="flex flex-col md:flex-row md:items-start justify-between gap-4"
                animate={{
                  opacity: hoveredId === project.id ? 1 : hoveredId === null ? 0.8 : 0.3,
                }}
                transition={{ duration: 0.4 }}
              >
                <div>
                  <h3 className="font-display font-bold text-2xl md:text-4xl text-primary tracking-tight">
                    {project.title}
                  </h3>
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: hoveredId === project.id ? "auto" : 0,
                      opacity: hoveredId === project.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                    className="font-mono text-xs text-muted-foreground tracking-wider mt-2 max-w-md overflow-hidden"
                  >
                    {project.description}
                  </motion.p>
                </div>
                <div className="flex items-center gap-6 font-mono text-xs text-muted-foreground tracking-widest uppercase">
                  <span>{project.category}</span>
                  <span>{project.year}</span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Work;
