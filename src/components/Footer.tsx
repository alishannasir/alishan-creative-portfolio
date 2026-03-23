import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import filmImage from "@/assets/shan1.jpg";
import { Github, Linkedin, Youtube, Instagram, ExternalLink } from "lucide-react";

const Footer = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const socialLinks = [
    { Icon: Github, href: "https://github.com/alishannasir", label: "GitHub" },
    { Icon: Linkedin, href: "https://www.linkedin.com/in/ali-shan-a85721272/", label: "LinkedIn" },
    { Icon: Youtube, href: "https://www.youtube.com/watch?v=JmKbirRvlKk", label: "YouTube" },
    { Icon: Instagram, href: "https://www.instagram.com/iamleshan_/", label: "Instagram" },
    { Icon: ExternalLink, href: "https://www.upwork.com/freelancers/~01108fa2a3313a6ad2", label: "Upwork" },
  ];
  return (
    <footer ref={ref} className="border-t border-border px-4 md:px-8 py-16 overflow-hidden">
      <div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h3 className="font-display text-foreground text-[14vw] md:text-[10vw] font-bold leading-[1] uppercase tracking-tight">
            LET'S{" "}
            <span className="inline-block relative">
              <img
                src={filmImage}
                alt="Creative work"
                className="w-28 h-28 md:w-28 md:h-28 inline-block align-middle"
              />
            </span>{" "}
            WORK
            <br />
            <span className="text-stroke">TOGETHER</span>
          </h3>
          <p className="font-mono text-xs text-muted-foreground tracking-wider mt-6 italic">
            Code, creativity, and a whole lot of caffeine.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-border pt-8">
          <a href="mailto:alishannasirwork@gmail.com" className="font-mono text-xs text-foreground tracking-wider hover:text-primary transition-colors" data-cursor-hover>
            alishannasirwork@gmail.com
          </a>

          <div className="flex items-center gap-4">
            {socialLinks.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
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
