import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const reasons = [
  { number: "01", title: "OBSESSED WITH CRAFT", desc: "Every detail matters. Every pixel tells a story." },
  { number: "02", title: "CODE + DESIGN", desc: "I bridge the gap between vision and execution." },
  { number: "03", title: "STORY-DRIVEN", desc: "Filmmaker's eye meets developer's precision." },
  { number: "04", title: "FUTURE-FOCUSED", desc: "Building today for tomorrow's digital landscape." },
];

const WhyWorkWithMe = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const marqueeX = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section ref={containerRef} className="py-32 overflow-hidden">
      {/* Marquee */}
      <motion.div style={{ x: marqueeX }} className="flex whitespace-nowrap mb-24">
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="font-display font-extrabold text-[15vw] text-stroke tracking-tighter mx-4"
          >
            WHY WORK WITH ME
          </span>
        ))}
      </motion.div>

      <div className="px-4 md:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.number}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-background p-8 md:p-12 group"
              data-cursor-hover
            >
              <span className="font-mono text-xs text-muted-foreground tracking-widest block mb-6">
                ({reason.number})
              </span>
              <h3 className="font-display font-extrabold text-2xl md:text-3xl text-primary mb-4 group-hover:translate-x-2 transition-transform duration-500">
                {reason.title}
              </h3>
              <p className="font-mono text-xs text-muted-foreground tracking-wider leading-relaxed">
                {reason.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyWorkWithMe;
