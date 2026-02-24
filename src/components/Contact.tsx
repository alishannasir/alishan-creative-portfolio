import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const Contact = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="min-h-[70vh] flex items-center px-4 md:px-8 py-24">
      <div className="w-full max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-extrabold text-primary text-[10vw] md:text-[7vw] leading-[0.95] tracking-tight max-w-4xl mb-16"
        >
          CALL THIS A SIGN, OR JUST GOOD TIMING — LET'S TALK.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-wrap gap-8 md:gap-16 font-mono text-xs tracking-widest uppercase"
        >
          <a
            href="mailto:hello@studio.dev"
            data-cursor-hover
            className="text-primary hover:opacity-60 transition-opacity"
          >
            HELLO@STUDIO.DEV
          </a>
          <a href="#" data-cursor-hover className="text-primary hover:opacity-60 transition-opacity">
            BOOK A CALL
          </a>
          <a href="#" data-cursor-hover className="text-primary hover:opacity-60 transition-opacity">
            LINKEDIN
          </a>
          <a href="#" data-cursor-hover className="text-primary hover:opacity-60 transition-opacity">
            INSTAGRAM
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
