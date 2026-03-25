import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const services = [
    {
        id: "01",
        title: "WEB DEVELOPMENT\nDESIGN",
        description:
            "EVERY PIXEL CARRIES INTENTION. I CRAFT WEBSITES THAT FEEL INEVITABLE — WHERE BEAUTY AND FUNCTION BECOME ONE.",
        items: [
            "RESPONSIVE LAYOUTS",
            "UI/UX DESIGN",
            "WIREFRAMING & PROTOTYPING",
            "DESIGN SYSTEMS",
            "VISUAL IDENTITY",
            "ART DIRECTION",
        ],
    },
    {
        id: "02",
        title: "FRONTEND\nDEVELOPMENT",
        description:
            "CODE IS MY CANVAS. I BUILD PERFORMANT, PIXEL-PERFECT INTERFACES THAT PUSH BOUNDARIES AND DELIGHT USERS.",
        items: [
            "REACT & NEXT.JS",
            "TYPESCRIPT",
            "ANIMATION & INTERACTION",
            "PERFORMANCE OPTIMIZATION",
            "RESPONSIVE DEVELOPMENT",
            "ACCESSIBILITY (A11Y)",
        ],
    },
    {
        id: "03",
        title: "CREATIVE\nEXPERIENCES",
        description:
            "WHERE TECHNOLOGY MEETS ARTISTRY. I CREATE IMMERSIVE WEB EXPERIENCES WITH MOTION, 3D, AND INTERACTIVE STORYTELLING.",
        items: [
            "MOTION DESIGN (FRAMER MOTION)",
            "WEBGL & THREE.JS",
            "SCROLL-DRIVEN ANIMATIONS",
            "INTERACTIVE PROTOTYPES",
            "CMS INTEGRATION",
            "API DEVELOPMENT",
        ],
    },
];
const Services = () => {
    const [current, setCurrent] = useState(0);
    const [isDescHovered, setIsDescHovered] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    const prev = () => setCurrent((c) => (c === 0 ? services.length - 1 : c - 1));
    const next = () => setCurrent((c) => (c === services.length - 1 ? 0 : c + 1));

    const service = services[current];

    return (
        <section ref={ref} className="min-h-screen flex items-center px-4 md:px-8 py-24 relative overflow-hidden">
            <div className="w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    {/* Left Column: Title and Items */}
                    <div className="relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`content-left-${current}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: inView ? 1 : 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                {/* Title with word animation */}
                                <motion.h2
                                    className="font-display font-extrabold text-primary text-[10vw] md:text-[6vw] lg:text-[5vw] leading-[0.9] tracking-tight whitespace-pre-line mb-12"
                                >
                                    <motion.span
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6 }}
                                        className="text-stroke-thin block md:inline-block"
                                    >
                                        ({service.id})
                                    </motion.span>{" "}
                                    {service.title.split(/(\s+)/).map((word, i) => (
                                        <motion.span
                                            key={`${current}-word-${i}`}
                                            initial={{ opacity: 0, y: 60, rotateX: -40 }}
                                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                            transition={{
                                                duration: 0.7,
                                                delay: 0.1 + i * 0.06,
                                                ease: [0.16, 1, 0.3, 1],
                                            }}
                                            className="inline-block"
                                        >
                                            {word === "\n" ? <br /> : word}
                                        </motion.span>
                                    ))}
                                </motion.h2>

                                {/* Items with scroll-triggered slide-right animation */}
                                <motion.ul
                                    className="space-y-3 font-mono text-[10px] md:text-xs tracking-[0.2em] text-primary"
                                >
                                    {service.items.map((item, i) => (
                                        <motion.li
                                            key={item}
                                            initial={{ opacity: 0, x: -30 }}
                                            animate={inView ? { opacity: 1, x: 0 } : {}}
                                            transition={{
                                                delay: 0.4 + i * 0.08,
                                                duration: 0.6,
                                                ease: [0.16, 1, 0.3, 1],
                                            }}
                                            whileHover={{ x: 12 }}
                                            className="flex items-center gap-3 group"
                                            data-cursor-hover
                                        >
                                            <motion.span
                                                className="text-primary opacity-50"
                                                whileHover={{ x: 6, scale: 1.3 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                →
                                            </motion.span>
                                            <motion.span
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                                transition={{
                                                    delay: 0.5 + i * 0.08,
                                                    duration: 0.5,
                                                    ease: [0.16, 1, 0.3, 1],
                                                }}
                                            >
                                                {item}
                                            </motion.span>
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right Column: Description */}
                    <div className="flex flex-col lg:pb-32">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`content-right-${current}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                onMouseEnter={() => setIsDescHovered(true)}
                                onMouseLeave={() => setIsDescHovered(false)}
                                data-cursor-hover
                                className="relative lg:max-w-md ml-auto"
                            >
                                <motion.p
                                    className="font-mono text-xs md:text-sm leading-relaxed tracking-wider text-primary max-w-md transition-all duration-500 text-right"
                                    style={{
                                        filter: isDescHovered ? "blur(4px)" : "blur(0px)",
                                    }}
                                >
                                    {service.description}
                                </motion.p>
                                <AnimatePresence>
                                    {isDescHovered && (
                                        <motion.span
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{ duration: 0.3 }}
                                            className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase mt-3 block text-right"
                                        >
                                            ( hover to reveal )
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
                {/* Fixed Navigation Controls (Absolute to section) */}
                <div className="absolute bottom-12 left-4 right-4 md:left-8 md:right-8 flex items-center justify-between pointer-events-none">
                    <div className="hidden lg:block h-[1px] bg-primary/10 flex-grow mr-12" />
                    <div className="flex items-center gap-8 pointer-events-auto">
                        <span className="font-mono text-xs text-muted-foreground tracking-[0.3em]">
                            {service.id} — 0{services.length}
                        </span>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={prev}
                                data-cursor-hover
                                className="text-primary hover:text-primary/50 transition-colors p-2 -m-2"
                            >
                                <ArrowLeft size={20} />
                            </button>
                            <button
                                onClick={next}
                                data-cursor-hover
                                className="text-primary hover:text-primary/50 transition-colors p-2 -m-2"
                            >
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
