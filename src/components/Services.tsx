import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const services = [
  {
    id: "01",
    title: "BRAND\nSTRATEGY",
    description:
      "CLARITY IS A RADICAL ACT. WE DIVE DEEP TOGETHER TO UNCOVER WHAT YOUR BRAND TRULY STANDS FOR — NOT JUST TO SAY IT, BUT TO LIVE IT.",
    items: [
      "RESEARCH & COMPETITOR ANALYSIS",
      "BRAND AUDIT",
      "VALUE PROPOSITION",
      "BRAND BEHAVIOUR",
      "TONE OF VOICE",
      "MANIFESTO",
    ],
  },
  {
    id: "02",
    title: "DIGITAL\nDESIGN",
    description:
      "EVERY PIXEL CARRIES INTENTION. WE CREATE EXPERIENCES THAT FEEL INEVITABLE — WHERE BEAUTY AND FUNCTION ARE INSEPARABLE.",
    items: [
      "WEB DESIGN",
      "UI/UX DESIGN",
      "MOTION DESIGN",
      "DESIGN SYSTEMS",
      "PROTOTYPING",
      "ART DIRECTION",
    ],
  },
  {
    id: "03",
    title: "CREATIVE\nDEVELOPMENT",
    description:
      "CODE IS OUR CANVAS. WE BUILD DIGITAL PRODUCTS THAT PUSH BOUNDARIES AND DELIGHT USERS AT EVERY INTERACTION.",
    items: [
      "FRONTEND DEVELOPMENT",
      "ANIMATION & INTERACTION",
      "CMS INTEGRATION",
      "PERFORMANCE",
      "RESPONSIVE DESIGN",
      "ACCESSIBILITY",
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
    <section ref={ref} className="min-h-screen flex items-center px-4 md:px-8 py-24">
      <div className="w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={service.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24"
          >
            <div>
              {/* Title with word animation */}
              <motion.h2
                key={`title-${current}`}
                className="font-display font-extrabold text-primary text-[10vw] md:text-[6vw] lg:text-[5vw] leading-[0.9] tracking-tight whitespace-pre-line mb-12"
              >
                <motion.span
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-stroke-thin inline-block"
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
                key={`items-${current}`}
                className="space-y-2 font-mono text-xs tracking-widest text-primary"
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
                      className="text-primary"
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
            </div>

            <div className="flex flex-col justify-between">
              {/* Description with blur on hover */}
              <motion.div
                onMouseEnter={() => setIsDescHovered(true)}
                onMouseLeave={() => setIsDescHovered(false)}
                data-cursor-hover
              >
                <motion.p
                  key={`desc-${current}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="font-mono text-xs md:text-sm leading-relaxed tracking-wider text-primary max-w-md transition-all duration-500"
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
                      className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase mt-3 block"
                    >
                      ( hover to reveal )
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>

              <div className="flex items-center gap-4 mt-12 lg:mt-0 self-end">
                <span className="font-mono text-xs text-muted-foreground tracking-widest">
                  {service.id}-0{services.length}
                </span>
                <button
                  onClick={prev}
                  data-cursor-hover
                  className="text-primary hover:opacity-60 transition-opacity"
                >
                  <ArrowLeft size={18} />
                </button>
                <button
                  onClick={next}
                  data-cursor-hover
                  className="text-primary hover:opacity-60 transition-opacity"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Services;
