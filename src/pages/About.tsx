import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import aboutImage from "@/assets/about-image.jpg";
import filmImage from "@/assets/filmmaking-image.jpg";
import Footer from "@/components/Footer";

const skills = [
  "REACT", "NEXT.JS", "TYPESCRIPT", "THREE.JS",
  "FRAMER MOTION", "GSAP", "FIGMA", "WEBGL",
  "NODE.JS", "TAILWIND", "PREMIERE PRO", "AFTER EFFECTS",
];

const About = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const filmRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const filmInView = useInView(filmRef, { once: true, margin: "-100px" });
  const skillsInView = useInView(skillsRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll();
  const marqueeX = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <main className="pt-32">
      {/* Title */}
      <section className="px-4 md:px-8 mb-24">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-extrabold text-primary text-[12vw] md:text-[8vw] leading-[0.85] tracking-tighter"
        >
          ABOUT
          <br />
          <span className="text-stroke">ME</span>
        </motion.h1>
      </section>

      {/* Bio */}
      <section ref={heroRef} className="px-4 md:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="aspect-square overflow-hidden"
          >
            <img src={aboutImage} alt="Developer workspace" className="w-full h-full object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-6">
              (WHO I AM)
            </p>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-primary leading-tight mb-8">
              I BUILD THINGS THAT FEEL ALIVE.
            </h2>
            <div className="space-y-4 font-mono text-sm text-muted-foreground leading-relaxed tracking-wider">
              <p>
                I'm a creative developer who lives at the intersection of design, code, and cinema. 
                My work is driven by a belief that digital experiences should move people — literally and emotionally.
              </p>
              <p>
                With a background in both software engineering and filmmaking, I bring a unique perspective 
                to every project. I don't just write code; I craft stories through pixels and interactions.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filmmaking */}
      <section ref={filmRef} className="py-24 overflow-hidden">
        <motion.div style={{ x: marqueeX }} className="flex whitespace-nowrap mb-16">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="font-display font-extrabold text-[12vw] text-stroke tracking-tighter mx-4">
              FILMMAKER × DEVELOPER
            </span>
          ))}
        </motion.div>

        <div className="px-4 md:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={filmInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center order-2 lg:order-1"
          >
            <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-6">
              (MY OTHER PASSION)
            </p>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-primary leading-tight mb-8">
              STORIES DON'T JUST LIVE ON SCREENS — THEY BREATHE THROUGH THEM.
            </h2>
            <div className="space-y-4 font-mono text-sm text-muted-foreground leading-relaxed tracking-wider">
              <p>
                When I'm not coding, I'm behind a camera. Filmmaking taught me that 
                every frame is intentional, every cut carries emotion, and pacing is everything.
              </p>
              <p>
                These principles flow directly into my development work — creating digital experiences 
                with cinematic rhythm, dramatic reveals, and narratives that unfold as users scroll.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={filmInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="aspect-square overflow-hidden order-1 lg:order-2"
          >
            <img src={filmImage} alt="Filmmaking" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      {/* Skills marquee */}
      <section ref={skillsRef} className="py-24 border-t border-border">
        <div className="px-4 md:px-8 mb-12">
          <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase">(TOOLS & TECH)</p>
        </div>
        <div className="flex flex-wrap gap-3 px-4 md:px-8 max-w-7xl mx-auto">
          {skills.map((skill, i) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={skillsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              data-cursor-hover
              className="px-6 py-3 border border-border font-mono text-xs tracking-widest text-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;
