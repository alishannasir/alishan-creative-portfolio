import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import contactImage from "@/assets/contact-image.jpg";

const Contact = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section ref={ref} className="min-h-[70vh] flex items-center px-4 md:px-8 py-24">
      <div className="w-full flex flex-col md:flex-row items-center gap-12 md:gap-16">
        <div className="flex-1">
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-extrabold text-primary text-[10vw] md:text-[5vw] leading-[0.95] tracking-tight max-w-4xl mb-16"
          >
            GOT A PROJECT IN MIND? LET'S BUILD SOMETHING INCREDIBLE TOGETHER.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap gap-8 md:gap-16 font-mono text-xs tracking-widest uppercase"
          >
            <a href="mailto:alishannasirwork@gmail.com.com" data-cursor-hover className="text-primary hover:opacity-60 transition-opacity">
              EMAIL ME
            </a>
            <a href="https://www.linkedin.com/in/ali-shan-a85721272/" target="_blank" rel="noopener noreferrer" data-cursor-hover className="text-primary hover:opacity-60 transition-opacity">
              LINKEDIN
            </a>
            <a href="https://github.com/alishannasir" target="_blank" rel="noopener noreferrer" data-cursor-hover className="text-primary hover:opacity-60 transition-opacity">
              GITHUB
            </a>
            <a href="https://www.upwork.com/freelancers/~01108fa2a3313a6ad2" target="_blank" rel="noopener noreferrer" data-cursor-hover className="text-primary hover:opacity-60 transition-opacity">
              UPWORK
            </a>

          </motion.div>
        </div>

        {/* Parallax image - web only */}
        <motion.div
          className="hidden md:block w-[300px] lg:w-[350px] aspect-[3/4] overflow-hidden flex-shrink-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.img
            src={contactImage}
            alt="Creative workspace"
            className="w-full h-full object-cover"
            style={{ y: imageY }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
