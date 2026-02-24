import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import aboutImage from "@/assets/about-image.jpg";
import vertical1 from "@/assets/about-vertical-1.jpg";
import vertical2 from "@/assets/about-vertical-2.jpg";
import vertical3 from "@/assets/about-vertical-3.jpg";
import Footer from "@/components/Footer";

const skills = [
  "WEB DESIGN", "FRONTEND DEVELOPMENT", "REACT & NEXT.JS",
  "MOTION & ANIMATION", "UI/UX DESIGN", "RESPONSIVE DEVELOPMENT",
];

const sliderImages = [vertical1, vertical2, vertical3, vertical1, vertical2];

const About = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const skillsInView = useInView(skillsRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll();
  const marqueeX = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  // Horizontal scroll-driven slider
  const { scrollYProgress: sliderScrollProgress } = useScroll({
    target: sliderRef,
    offset: ["start start", "end end"],
  });
  const sliderX = useTransform(
    sliderScrollProgress,
    [0, 1],
    ["0%", `-${(sliderImages.length - 1) * 100}vw`]
  );

  return (
    <main className="pt-32">
      {/* Title */}
      <section className="px-4 md:px-8 mb-12 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-extrabold text-primary text-[12vw] md:text-[8vw] leading-[0.85] tracking-tighter"
        >
          HEY,
          <br />
          <span className="text-stroke">I'M ALISHAN</span>
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
        <div className="max-w-3xl mx-auto md:mx-0 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="font-mono text-xs md:text-sm text-muted-foreground leading-relaxed tracking-wider uppercase">
              I'M A CREATIVE WEB DEVELOPER WHO LIVES AT THE INTERSECTION
              OF DESIGN AND CODE. I SPECIALIZE IN BUILDING BEAUTIFUL, PERFORMANT
              WEBSITES WITH REACT, TYPESCRIPT, AND MODERN FRONTEND TOOLS — TURNING
              YOUR VISION INTO PIXEL-PERFECT, INTERACTIVE REALITY.
            </p>
            <p className="font-mono text-xs text-muted-foreground tracking-wider leading-relaxed">
              I obsess over smooth animations, clean component architecture, and
              responsive layouts that feel effortless. Whether it's a landing page
              or a full-scale web app, I bring both the design eye and the dev chops.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <section className="py-16 overflow-hidden">
        <motion.div style={{ x: marqueeX }} className="flex whitespace-nowrap">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="font-display font-extrabold text-[12vw] text-stroke tracking-tighter mx-4">
              DESIGNER × DEVELOPER
            </span>
          ))}
        </motion.div>
      </section>

      {/* Stuff I Do */}
      <section ref={skillsRef} className="py-24 px-4 md:px-8">
        <div>
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
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display font-extrabold text-primary text-xl md:text-3xl leading-tight tracking-tight"
          >
            WITH YEARS OF BUILDING FOR THE WEB, I'VE PARTNERED WITH STARTUPS, AGENCIES, AND PRODUCT TEAMS
            ACROSS SAAS, E-COMMERCE, FINTECH, AND BEYOND.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-mono text-xs text-muted-foreground tracking-wider mt-6"
          >
            I DON'T JUST BUILD WEBSITES — I CRAFT EXPERIENCES THAT USERS REMEMBER
            AND DEVELOPERS ADMIRE.
          </motion.p>
        </div>
      </section>

      {/* Scroll-driven horizontal image slider */}
      <section
        ref={sliderRef}
        style={{ height: `${sliderImages.length * 100}vh` }}
        className="relative"
      >
        <div className="sticky top-0 h-screen w-screen overflow-hidden">
          <motion.div
            style={{ x: sliderX }}
            className="flex h-full"
          >
            {sliderImages.map((img, i) => (
              <div
                key={i}
                className="w-screen h-screen flex-shrink-0"
              >
                <img
                  src={img}
                  alt={`Creative work ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;
