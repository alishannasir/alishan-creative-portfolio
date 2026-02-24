import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isPlus, setIsPlus] = useState(false);
  const [isText, setIsText] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor-plus]")) {
        setIsPlus(true);
        setIsHovering(true);
        setIsText(false);
      } else if (target.closest("a, button, [data-cursor-hover]")) {
        setIsHovering(true);
        setIsPlus(false);
        setIsText(false);
      } else if (
        target.closest("h1, h2, h3, h4, h5, h6, p, span, li, label, blockquote") &&
        !target.closest("a, button")
      ) {
        setIsText(true);
        setIsHovering(false);
        setIsPlus(false);
      } else {
        setIsHovering(false);
        setIsPlus(false);
        setIsText(false);
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleOver);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleOver);
    };
  }, []);

  // When hovering text: show opposite theme color
  // Light mode primary is red (7 100% 50%), dark mode primary is blue (215 80% 55%)
  // Opposite: on light mode show dark-mode blue, on dark mode show light-mode red
  const isTextOrHover = isText || isHovering;
  const size = isHovering ? 48 : isText ? 32 : 12;

  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
      animate={{
        x: pos.x - size / 2,
        y: pos.y - size / 2,
        width: size,
        height: size,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
    >
      <div
        className={`w-full h-full rounded-full flex items-center justify-center transition-colors duration-300 ${
          isText
            ? "bg-accent-cursor mix-blend-difference"
            : "bg-foreground mix-blend-difference"
        }`}
      >
        {isPlus && (
          <motion.span
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            className="text-background text-lg font-bold font-display"
          >
            +
          </motion.span>
        )}
      </div>
    </motion.div>
  );
};

export default CustomCursor;
