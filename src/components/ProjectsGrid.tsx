import { useState, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import gilgit from "@/assets/work/gilgit.png";
import fieldPulse from "@/assets/work/filed.png";
import qho from "@/assets/work/qho.png";
import uconnect from "@/assets/work/uconnect.png";

const projects = [
    { id: 1, title: "GILGIT APP", category: "E-Commerce App", image: gilgit, size: "w-[55%]" },
    { id: 2, title: "FIELD PULSE", category: "Landing Page & CRM", image: fieldPulse, size: "w-[40%]" },
    { id: 3, title: "QHO HR", category: "SaaS Platform", image: qho, size: "w-[42%]" },
    { id: 4, title: "UCONNECT", category: "Corporate Website", image: uconnect, size: "w-[52%]" },
];

const layouts = [
    { justify: "justify-start", aspect: "" },
    { justify: "justify-end", aspect: "" },
    { justify: "justify-center", aspect: "" },
    { justify: "justify-end", aspect: "" },
];

const ProjectsGrid = () => {
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    const [mousePos, setMousePos] = useState<Record<number, { x: number; y: number }>>({});

    const handleMouseMove = useCallback((e: React.MouseEvent, id: number) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
        setMousePos((prev) => ({ ...prev, [id]: { x, y } }));
    }, []);

    const handleMouseLeave = useCallback((id: number) => {
        setHoveredId(null);
        setMousePos((prev) => ({ ...prev, [id]: { x: 0, y: 0 } }));
    }, []);

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

            <div className="">
                {projects.map((project, i) => {
                    const layout = layouts[i];
                    const pos = mousePos[project.id] || { x: 0, y: 0 };
                    const isHovered = hoveredId === project.id;

                    return (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 60 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, delay: i * 0.15 }}
                            className={`flex ${layout.justify}`}
                        >
                            <Link to={`/work/${project.id}`} data-cursor-plus className={`${project.size} block space-y-10`}>
                                <motion.div
                                    className={`relative overflow-hidden ${layout.aspect} group`}
                                    onMouseEnter={() => setHoveredId(project.id)}
                                    onMouseMove={(e) => handleMouseMove(e, project.id)}
                                    onMouseLeave={() => handleMouseLeave(project.id)}
                                    animate={{
                                        scale: hoveredId === null ? 1 : isHovered ? 1.03 : 0.95,
                                        filter: hoveredId === null ? "blur(0px)" : isHovered ? "blur(0px)" : "blur(4px)",
                                        opacity: hoveredId === null ? 1 : isHovered ? 1 : 0.4,
                                    }}
                                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <motion.img
                                        src={project.image}
                                        alt={project.title}
                                        className="h-full w-full object-contain"
                                        animate={{
                                            x: isHovered ? pos.x : 0,
                                            y: isHovered ? pos.y : 0,
                                            scale: isHovered ? 1.08 : 1,
                                        }}
                                        transition={{ type: "spring", stiffness: 150, damping: 20 }}
                                    />
                                </motion.div>

                                <motion.div
                                    className="flex items-center justify-between"
                                    animate={{
                                        opacity: hoveredId === null ? 0.8 : isHovered ? 1 : 0.3,
                                    }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <span className="font-mono text-xs text-primary tracking-widest uppercase">
                                        ({String(i + 1).padStart(2, "0")}) {project.title}
                                    </span>
                                    <span className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
                                        {project.category}
                                    </span>
                                </motion.div>
                            </Link>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};

export default ProjectsGrid;
