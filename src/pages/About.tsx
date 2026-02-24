import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import aboutImage from "@/assets/about-image.jpg";
import vertical1 from "@/assets/about-vertical-1.jpg";
import vertical2 from "@/assets/about-vertical-2.jpg";
import vertical3 from "@/assets/about-vertical-3.jpg";
import Footer from "@/components/Footer";

const skills = [
  "APP DESIGN", "WEB DESIGN", "BRANDING & GRAPHIC DESIGN",
  "FILMMAKING", "MOTION DESIGN", "PHOTOGRAPHY",
];

const About = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const skillsInView = useInView(skillsRef, { once: true, margin: "-100px" });
  const imagesInView = useInView(imagesRef, { once: true, margin: "-50px" });

  const { scrollYProgress } = useScroll();
  const marqueeX = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <main className="pt-32">
      {/* Title - Reference style: WAIT. WHO THIS GUY? */}
      <section className="px-4 md:px-8 mb-12 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-extrabold text-primary text-[12vw] md:text-[8vw] leading-[0.85] tracking-tighter"
        >
          WAIT.
          <br />
          <span className="text-stroke">WHO THIS GUY?</span>
        </motion.h1>
      </section>

      {/* Profile image */}
      <section className="flex justify-center mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden"
        >
          <img src={aboutImage} alt="Profile" className="w-full h-full object-cover" />
        </motion.div>
      </section>

      {/* Bio */}
      <section ref={heroRef} className="px-4 md:px-8 pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="font-mono text-xs md:text-sm text-muted-foreground leading-relaxed tracking-wider uppercase">
              I'M A CREATIVE DEVELOPER WITH A SERIOUS OBSESSION
              FOR USER EXPERIENCE DESIGN. I SPECIALIZE IN MOTION, VISUAL DESIGN, AND
              INTERACTIONS — BASICALLY, TURNING YOUR IDEAS INTO SOMETHING YOU CAN
              ACTUALLY USE WITHOUT NEEDING A MANUAL THE SIZE OF A DICTIONARY.
            </p>
            <p className="font-mono text-xs text-muted-foreground tracking-wider leading-relaxed">
              When I'm not coding, I'm behind a camera. Filmmaking taught me that
              every frame is intentional, every cut carries emotion, and pacing is everything.
              These principles flow directly into my development work.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <section className="py-16 overflow-hidden">
        <motion.div style={{ x: marqueeX }} className="flex whitespace-nowrap">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="font-display font-extrabold text-[12vw] text-stroke tracking-tighter mx-4">
              FILMMAKER × DEVELOPER
            </span>
          ))}
        </motion.div>
      </section>

      {/* Stuff I Do */}
      <section ref={skillsRef} className="py-24 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={skillsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-display font-extrabold text-primary text-3xl md:text-5xl tracking-tight mb-16"
          >
            STUFF I DO
          </motion.h2>

          <div className="space-y-0">
            {skills.map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, x: -30 }}
                animate={skillsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="border-b border-border py-6 flex items-center justify-between group"
                data-cursor-hover
              >
                <h3 className="font-display font-bold text-primary text-lg md:text-2xl tracking-tight group-hover:translate-x-4 transition-transform duration-500">
                  {skill}
                </h3>
                <span className="font-mono text-xs text-muted-foreground tracking-widest">
                  ({String(i + 1).padStart(2, "0")})
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Big statement */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display font-extrabold text-primary text-xl md:text-3xl leading-tight tracking-tight"
          >
            WITH 5 YEARS IN DESIGN, I'VE JOINED FORCES WITH FOUNDERS, PRODUCT LEADERS, AND COMPANIES
            ACROSS SAAS, E-COMMERCE, BLOCKCHAIN, AND FIN-TECH.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-mono text-xs text-muted-foreground tracking-wider mt-6"
          >
            WELL, ASIDE FROM BEING AN EMPLOYEE, I'VE ALSO PLAYED A VITAL ROLE IN MAKING DEVELOPERS
            SWEAT FROM TIME TO TIME.
          </motion.p>
        </div>
      </section>

      {/* Vertical Images Grid at bottom */}
      <section ref={imagesRef} className="px-4 md:px-8 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-6xl mx-auto">
          {[vertical1, vertical2, vertical3].map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              animate={imagesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className={`overflow-hidden ${i === 2 ? "col-span-2 md:col-span-1" : ""}`}
            >
              <motion.img
                src={img}
                alt={`Creative work ${i + 1}`}
                className="w-full h-full object-cover aspect-[3/4]"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;
