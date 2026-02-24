import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";

const reasons = [
  {
    number: "01",
    title: "OBSESSED WITH CRAFT",
    desc: "Every detail matters. Every pixel tells a story. I don't ship until it feels right — in the gut, in the grid, in the code.",
    keyword: "CRAFT",
  },
  {
    number: "02",
    title: "CODE + DESIGN",
    desc: "I bridge the gap between vision and execution. Design systems, motion, architecture — all from one mind.",
    keyword: "BRIDGE",
  },
  {
    number: "03",
    title: "STORY-DRIVEN",
    desc: "Filmmaker's eye meets developer's precision. Every project deserves a narrative that pulls people in.",
    keyword: "STORY",
  },
  {
    number: "04",
    title: "FUTURE-FOCUSED",
    desc: "Building today for tomorrow's digital landscape. Cutting-edge tech with timeless design principles.",
    keyword: "VISION",
  },
];

const WhyWorkWithMe = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const marqueeX = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const marqueeX2 = useTransform(scrollYProgress, [0, 1], ["-10%", "20%"]);

  return (
    <section ref={containerRef} className="py-32 overflow-hidden">
      {/* Double Marquee */}
      <div className="mb-20 space-y-2">
        <motion.div style={{ x: marqueeX }} className="flex whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="font-display font-extrabold text-[12vw] md:text-[10vw] text-stroke tracking-tighter mx-4"
            >
              WHY WORK WITH ME
            </span>
          ))}
        </motion.div>
        <motion.div style={{ x: marqueeX2 }} className="flex whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="font-display font-extrabold text-[12vw] md:text-[10vw] tracking-tighter mx-4 text-primary/10"
            >
              WHY WORK WITH ME
            </span>
          ))}
        </motion.div>
      </div>

      {/* Interactive Accordion Rows */}
      <div className="px-4 md:px-8">
        {reasons.map((reason, i) => (
          <motion.div
            key={reason.number}
            initial={{ opacity: 0, y: 60 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.12 }}
            className="border-t border-border last:border-b"
            onMouseEnter={() => setActiveIndex(i)}
            onMouseLeave={() => setActiveIndex(null)}
            data-cursor-hover
          >
            <div className="py-6 md:py-8 flex items-center gap-4 md:gap-8 relative overflow-hidden">
              {/* Background keyword on hover */}
              <AnimatePresence>
                {activeIndex === i && (
                  <motion.span
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 0.05, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="absolute right-4 md:right-8 font-display font-extrabold text-[20vw] md:text-[15vw] text-foreground pointer-events-none select-none leading-none"
                  >
                    {reason.keyword}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Number */}
              <motion.span
                className="font-mono text-xs text-muted-foreground tracking-widest shrink-0 w-12"
                animate={{
                  color: activeIndex === i ? "hsl(var(--primary))" : undefined,
                }}
                transition={{ duration: 0.3 }}
              >
                ({reason.number})
              </motion.span>

              {/* Title */}
              <motion.h3
                className="font-display font-extrabold text-2xl md:text-4xl lg:text-5xl text-foreground relative z-10"
                animate={{
                  x: activeIndex === i ? 16 : 0,
                  color: activeIndex === i ? "hsl(var(--primary))" : "hsl(var(--foreground))",
                }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0, 1] }}
              >
                {reason.title}
              </motion.h3>

              {/* Arrow indicator */}
              <motion.div
                className="ml-auto shrink-0 relative z-10"
                animate={{
                  rotate: activeIndex === i ? -45 : 0,
                  scale: activeIndex === i ? 1.2 : 1,
                }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0, 1] }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-muted-foreground"
                >
                  <path
                    d="M7 17L17 7M17 7H7M17 7V17"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            </div>

            {/* Expandable description */}
            <AnimatePresence>
              {activeIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-8 pl-16 md:pl-20 max-w-xl">
                    <p className="font-mono text-xs text-muted-foreground tracking-wider leading-relaxed">
                      {reason.desc}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyWorkWithMe;
