import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import filmImage from "@/assets/filmmaking-image.jpg";
import { Github, Linkedin, Globe, Youtube } from "lucide-react";

const Footer = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer ref={ref} className="border-t border-border px-4 md:px-8 py-16">
      <div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h3 className="font-display text-primary text-[12vw] md:text-[8vw] font-bold leading-[1.1]">
            Let's{" "}
            <span className="inline-block relative mx-2">
              <img
                src={filmImage}
                alt="Creative work"
                className="w-16 h-16 md:w-24 md:h-24 object-cover inline-block align-middle rotate-[-3deg]"
              />
            </span>{" "}
            work
            <br />
            together
          </h3>
          <p className="font-mono text-xs text-muted-foreground tracking-wider mt-6 italic">
            Pixels and pictures — both are my love language.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-border pt-8">
          <a href="mailto:hello@studio.dev" className="font-mono text-xs text-foreground tracking-wider hover:text-primary transition-colors" data-cursor-hover>
            hello@studio.dev
          </a>

          <div className="flex items-center gap-4">
            {[Github, Linkedin, Youtube, Globe].map((Icon, i) => (
              <a
                key={i}
                href="#"
                data-cursor-hover
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
