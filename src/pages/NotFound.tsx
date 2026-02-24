import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 md:px-8 relative overflow-hidden">
      {/* Giant background 404 */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="font-display font-extrabold text-primary text-[50vw] leading-none tracking-tighter">
          404
        </span>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-mono text-xs text-muted-foreground tracking-[0.3em] uppercase mb-6"
        >
          Page not found
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-extrabold text-primary text-[12vw] md:text-[8vw] leading-[0.85] tracking-tighter mb-8"
        >
          LOST IN
          <br />
          <span className="text-stroke">THE VOID</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="font-mono text-xs text-muted-foreground tracking-wider max-w-sm mx-auto mb-12"
        >
          THE PAGE YOU'RE LOOKING FOR DOESN'T EXIST — BUT HEY, AT LEAST YOU FOUND SOMETHING COOL.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <Link
            to="/"
            data-cursor-hover
            className="inline-block font-mono text-xs tracking-widest uppercase border border-primary text-primary px-8 py-4 hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
          >
            TAKE ME HOME →
          </Link>
        </motion.div>
      </div>

      {/* Animated line */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="w-32 h-px bg-primary/30" />
      </motion.div>
    </main>
  );
};

export default NotFound;
