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
  { id: 1, title: "Gilgit App", category: "E-Commerce App", image: gilgit },
  { id: 2, title: "Field Pulse", category: "Landing Page & CRM", image: fieldPulse },
  { id: 3, title: "Qho HR", category: "SaaS Platform", image: qho },
  { id: 4, title: "Uconnect", category: "Corporate Website", image: uconnect },
  { id: 5, title: "Field Pulse", category: "Landing Page & CRM", image: fieldPulse },
];

const ProjectsGrid = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hireMeCursorRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const cursor = hireMeCursorRef.current;
    const section = sectionRef.current;

    let onSectionMove: ((e: MouseEvent) => void) | null = null;
    let onSectionEnter: (() => void) | null = null;
    let onSectionLeave: (() => void) | null = null;

    if (cursor && section) {
      const xTo = gsap.quickTo(cursor, "x", { duration: 0.55, ease: "power3.out" });
      const yTo = gsap.quickTo(cursor, "y", { duration: 0.55, ease: "power3.out" });

      onSectionMove = (e: MouseEvent) => {
        const rect = section.getBoundingClientRect();
        xTo(e.clientX - rect.left);
        yTo(e.clientY - rect.top);
      };
      onSectionEnter = () => {
        gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.7)" });
      };
      onSectionLeave = () => {
        gsap.to(cursor, { opacity: 0, scale: 0.4, duration: 0.3, ease: "power2.in" });
      };

      section.addEventListener("mousemove", onSectionMove);
      section.addEventListener("mouseenter", onSectionEnter);
      section.addEventListener("mouseleave", onSectionLeave);
    }

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const pin = pinRef.current;
      if (!track || !pin) return;

      const isDesktop = window.matchMedia("(min-width: 768px)").matches;

      /* Horizontal scroll pin — desktop only */
      let horizontalTween: gsap.core.Tween | null = null;
      if (isDesktop) {
        const distance = () => track.scrollWidth - window.innerWidth;
        horizontalTween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      }

      /* Per-card hover: expand hovered, compress neighbors */
      const cleanups: (() => void)[] = [];
      cardRefs.current.forEach((card, i) => {
        if (!card) return;

        const onEnter = () => {
          cardRefs.current.forEach((c, j) => {
            if (!c) return;
            if (j === i) {
              gsap.to(c, {
                scale: 1.04,
                y: -12,
                opacity: 1,
                filter: "blur(0px)",
                duration: 0.55,
                ease: "power3.out",
              });
            } else {
              gsap.to(c, {
                scale: 0.94,
                y: 0,
                opacity: 0.45,
                filter: "blur(3px)",
                duration: 0.55,
                ease: "power3.out",
              });
            }
          });
        };

        const onLeave = () => {
          cardRefs.current.forEach((c) => {
            if (!c) return;
            gsap.to(c, {
              scale: 1,
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.6,
              ease: "power2.inOut",
            });
          });
        };

        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mouseleave", onLeave);
        });
      });

      return () => {
        cleanups.forEach((fn) => fn());
        horizontalTween?.kill();
      };
    }, sectionRef);

    return () => {
      ctx.revert();
      if (section) {
        if (onSectionMove) section.removeEventListener("mousemove", onSectionMove);
        if (onSectionEnter) section.removeEventListener("mouseenter", onSectionEnter);
        if (onSectionLeave) section.removeEventListener("mouseleave", onSectionLeave);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 cursor-none">
      {/* Hire Me Cursor */}
      <div
        ref={hireMeCursorRef}
        className="pointer-events-none absolute z-50 -translate-x-1/2 -translate-y-1/2"
        style={{ opacity: 0, scale: 0.4, top: 0, left: 0 }}
      >
        <a
          href="https://www.upwork.com/freelancers/~01108fa2a3313a6ad2"
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-primary-foreground font-mono text-xs font-bold tracking-widest uppercase shadow-lg select-none cursor-pointer"
        >
          Hire Me
        </a>
      </div>

      {/* Pin container */}
      <div ref={pinRef} className="md:h-screen md:flex md:flex-col md:justify-center overflow-hidden">
        {/* Heading row */}
        <div className="px-4 md:px-8 flex items-end justify-between mb-10 md:mb-14">
          <div>
            <h2 className="font-display font-bold text-primary text-[10vw] md:text-[4.5vw] leading-[0.9] tracking-tight">
              Selected Work
            </h2>
            <span className="font-mono text-[11px] text-muted-foreground tracking-[0.3em] uppercase mt-3 hidden md:inline-flex items-center gap-2">
              Scroll <span className="inline-block">→</span>
            </span>
          </div>
          <Link
            to="/work"
            data-cursor-hover
            className="font-mono text-xs text-primary tracking-widest uppercase hover:opacity-60 transition-opacity"
          >
            View All →
          </Link>
        </div>

        {/* Horizontal track (desktop) / vertical stack (mobile) */}
        <div
          ref={trackRef}
          className="flex flex-col md:flex-row gap-12 md:gap-10 px-4 md:px-8 will-change-transform"
        >
          {projects.map((project, i) => (
            <Link
              key={i}
              to={`/work/${project.id}`}
              data-cursor-plus
              className="block shrink-0 w-full md:w-[38vw] lg:w-[34vw]"
            >
              <div
                ref={(el) => { cardRefs.current[i] = el; }}
                className="group will-change-transform"
              >
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between mt-5">
                  <span className="font-mono text-xs text-primary tracking-widest uppercase">
                    ({String(i + 1).padStart(2, "0")}) {project.title}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
                    {project.category}
                  </span>
                </div>
              </div>
            </Link>
          ))}
          {/* Trailing spacer for desktop horizontal scroll */}
          <div className="hidden md:block shrink-0 w-[10vw]" aria-hidden />
        </div>
      </div>
    </section>
  );
};

export default ProjectsGrid;
