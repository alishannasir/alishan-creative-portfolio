import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const letterVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: (i: number) => ({
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.5 + i * 0.03,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    }),
  };

  const line1 = "I BUILD";
  const line2 = "WEBSITES";
  const line3 = "THAT FEEL";
  const line4 = "ALIVE &";
  const line5 = "UNREAL";

  const renderLine = (text: string, lineIndex: number, isStroke = false) => (
    <div className="overflow-hidden">
      <motion.div className="flex flex-wrap">
        {text.split("").map((char, i) => (
          <motion.span
            key={`${lineIndex}-${i}`}
            custom={lineIndex * 5 + i}
            variants={letterVariants}
            initial="hidden"
            animate="visible"
            className={`inline-block ${isStroke ? "text-stroke" : ""}`}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden px-4 md:px-8 pt-24">
      <motion.div style={{ y: textY, opacity }} className="relative z-10 w-full">
        <div className="font-display font-extrabold text-primary leading-[0.85] tracking-tighter text-[12vw] md:text-[9vw] lg:text-[8vw]">
          {renderLine(line1, 0)}
          {renderLine(line2, 1)}
          {renderLine(line3, 2, true)}

          <div className="relative">
            <motion.div
              className="absolute right-0 md:right-[10%] top-[0%] md:top-[-10%] w-[50vw] md:w-[35vw] lg:w-[30vw] aspect-[16/10] overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ y: imageY }}
            >
              <img
                src={heroImage}
                alt="Creative developer in misty field with torch"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {renderLine(line4, 3)}
            {renderLine(line5, 4, true)}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="font-mono text-xs md:text-sm text-muted-foreground uppercase tracking-widest mt-12 max-w-md"
        >
          Creative Web Developer — turning ideas into immersive digital experiences
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-primary/40"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
