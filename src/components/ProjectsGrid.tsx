import { useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gilgit from "@/assets/work/gilgit.png";
import fieldPulse from "@/assets/work/filed.png";
import qho from "@/assets/work/qho.png";
import uconnect from "@/assets/work/uconnect.png";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    { id: 1, title: "GILGIT APP", category: "E-Commerce App", image: gilgit, lg_size: "lg:w-[30%]", lg_justify: "lg:justify-start" },
    { id: 2, title: "FIELD PULSE", category: "Landing Page & CRM", image: fieldPulse, lg_size: "lg:w-[30%]", lg_justify: "lg:justify-center" },
    { id: 3, title: "QHO HR", category: "SaaS Platform", image: qho, lg_size: "lg:w-[30%]", lg_justify: "lg:justify-end" },
    { id: 4, title: "UCONNECT", category: "Corporate Website", image: uconnect, lg_size: "lg:w-[30%]", lg_justify: "lg:justify-center" },
    { id: 5, title: "FIELD PULSE", category: "Landing Page & CRM", image: fieldPulse, lg_size: "lg:w-[30%]", lg_justify: "lg:justify-start" },
];

const ProjectsGrid = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
    const metaRefs = useRef<(HTMLDivElement | null)[]>([]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            /* ── 1. HEADING SCROLL REVEAL ──────────────────── */
            gsap.from(headingRef.current, {
                opacity: 0,
                y: 32,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: headingRef.current,
                    start: "top 88%",
                    once: true,
                },
            });

            /* ── 2. CARD STAGGERED SCROLL REVEALS ─────────── */
            cardRefs.current.forEach((card, i) => {
                if (!card) return;
                gsap.from(card, {
                    opacity: 0,
                    y: 70,
                    duration: 0.85,
                    ease: "power3.out",
                    delay: i * 0.08,
                    scrollTrigger: {
                        trigger: card,
                        start: "top 90%",
                        once: true,
                    },
                });
            });

            /* ── 3. PER-CARD MOUSE PARALLAX + HOVER ───────── */
            const cleanups: (() => void)[] = [];

            cardRefs.current.forEach((card, i) => {
                if (!card) return;
                const img = imgRefs.current[i];
                const meta = metaRefs.current[i];
                if (!img || !meta) return;

                // gsap.quickTo = butter-smooth, lag-free cursor following
                const xTo = gsap.quickTo(img, "x", { duration: 0.95, ease: "power3.out" });
                const yTo = gsap.quickTo(img, "y", { duration: 0.95, ease: "power3.out" });

                const onMove = (e: MouseEvent) => {
                    const rect = card.getBoundingClientRect();
                    const rx = ((e.clientX - rect.left) / rect.width - 0.9) * 200;
                    const ry = ((e.clientY - rect.top) / rect.height - 0.9) * 200;
                    xTo(rx);
                    yTo(ry);
                    gsap.to(meta, { y: ry * 0.3, duration: 0.5, ease: "power2.out" });
                };

                const onEnter = () => {
                    // Dim all sibling cards
                    cardRefs.current.forEach((c, j) => {
                        if (!c || j === i) return;
                        gsap.to(c, {
                            opacity: 0.35,
                            scale: 0.96,
                            filter: "blur(3px)",
                            duration: 0.5,
                            ease: "power2.out",
                        });
                    });
                    // Lift hovered card
                    gsap.to(card, {
                        scale: 1.03,
                        duration: 0.5,
                        ease: "power2.out",
                    });
                    // Slide up + fade in meta
                    gsap.to(meta, {
                        opacity: 1,
                        y: 0,
                        duration: 0.45,
                        ease: "power2.out",
                    });
                };

                const onLeave = () => {
                    // Reset all cards
                    cardRefs.current.forEach((c) => {
                        if (!c) return;
                        gsap.to(c, {
                            opacity: 1,
                            scale: 1,
                            filter: "blur(0px)",
                            duration: 0.55,
                            ease: "power2.inOut",
                        });
                    });
                    xTo(0);
                    yTo(0);
                    gsap.to(meta, {
                        opacity: 0,
                        y: 10,
                        duration: 0.35,
                        ease: "power2.in",
                    });
                };

                card.addEventListener("mousemove", onMove);
                card.addEventListener("mouseenter", onEnter);
                card.addEventListener("mouseleave", onLeave);

                cleanups.push(() => {
                    card.removeEventListener("mousemove", onMove);
                    card.removeEventListener("mouseenter", onEnter);
                    card.removeEventListener("mouseleave", onLeave);
                });
            });

            return () => cleanups.forEach((fn) => fn());

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="px-4 md:px-8 py-24">

            {/* Heading */}
            <div ref={headingRef} className="flex items-baseline justify-between mb-16">
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
            </div>

            {/* Grid */}
            <div className="space-y-16 lg:space-y-0">
                {projects.map((project, i) => (
                    <div key={i} className={`flex w-full mb-12 lg:mb-24 ${project.lg_justify}`}>
                        <Link
                            to={`/work/${project.id}`}
                            data-cursor-plus
                            className={`w-full ${project.lg_size}`}
                        >
                            <div
                                ref={(el) => { cardRefs.current[i] = el; }}
                                className="relative group space-y-10 will-change-transform"
                            >
                                <div className="">
                                    <img
                                        ref={(el) => { imgRefs.current[i] = el; }}
                                        src={project.image}
                                        alt={project.title}
                                        className="h-full w-full object-cover will-change-transform"
                                    />
                                </div>

                                {/* Meta — GSAP controls opacity/y, not CSS */}
                                <div
                                    ref={(el) => { metaRefs.current[i] = el; }}
                                    className="flex items-center justify-between"
                                    style={{ opacity: 0, transform: "translateY(10px)" }}
                                >
                                    <span className="font-mono text-xs text-primary tracking-widest uppercase">
                                        ({String(i + 1).padStart(2, "0")}) {project.title}
                                    </span>
                                    <span className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
                                        {project.category}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProjectsGrid;