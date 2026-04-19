import { useRef, useLayoutEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import heroImage from "@/assets/shan.jpeg";

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  /* GSAP mouse-follow on portrait */
  useLayoutEffect(() => {
    const container = imgContainerRef.current;
    const img = imgRef.current;
    if (!container || !img) return;

    const xTo = gsap.quickTo(img, "x", { duration: 0.8, ease: "power3.out" });
    const yTo = gsap.quickTo(img, "y", { duration: 0.8, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      xTo(nx * 12);
      yTo(ny * 12);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const headline = "I build websites that feel alive & unreal.";
  const words = headline.split(" ");

  const wordVariants = {
    hidden: { y: "110%", opacity: 0 },
    visible: (i: number) => ({
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.9,
        delay: 0.4 + i * 0.06,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 md:px-8 pt-32 pb-24"
    >
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 w-full max-w-[1100px] mx-auto flex flex-col items-center text-center"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-mono text-[11px] md:text-xs text-muted-foreground tracking-[0.3em] uppercase mb-10 flex items-center gap-3"
        >
          <span className="w-8 h-px bg-muted-foreground/60" />
          Creative Web Developer
          <span className="w-8 h-px bg-muted-foreground/60" />
        </motion.div>

        {/* Headline — word reveal */}
        <h1 className="font-display font-bold text-primary leading-[0.95] tracking-tight text-[10vw] md:text-[7vw] lg:text-[6.2vw] max-w-[18ch]">
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom">
              <motion.span
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className="inline-block pr-[0.25em]"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Portrait */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 md:mt-16"
        >
          <div
            ref={imgContainerRef}
            className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] overflow-hidden rounded-full ring-1 ring-primary/20"
          >
            <img
              ref={imgRef}
              src={heroImage}
              alt="Alishan — creative web developer"
              className="w-full h-full object-cover will-change-transform scale-110"
            />
          </div>
        </motion.div>

        {/* Intro paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.7 }}
          className="font-mono text-sm md:text-base text-foreground/80 leading-relaxed mt-10 max-w-xl"
        >
          Turning ideas into immersive digital experiences — crafted with code,
          motion, and an obsession for detail.
        </motion.p>

        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.6 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground"
        >
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Available for work
          </span>
          <span className="opacity-30">/</span>
          <span>Based remotely</span>
          <span className="opacity-30">/</span>
          <span>Worldwide</span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
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
