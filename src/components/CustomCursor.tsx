import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isText, setIsText] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("h1, h2, h3, h4, h5, h6, p, span, li, label, blockquote, a, button") &&
        !target.closest("[data-no-cursor]")
      ) {
        setIsText(true);
        setIsHovering(false);
      } else if (target.closest("[data-cursor-hover]")) {
        setIsHovering(true);
        setIsText(false);
      } else {
        setIsText(false);
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleOver);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleOver);
    };
  }, []);

  const size = isText ? 70 : isHovering ? 40 : 14;

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
      {isText ? (
        <div className="w-full h-full rounded-full border-2 border-foreground" />
      ) : (
        <div className="w-full h-full rounded-full bg-foreground" />
      )}
    </motion.div>
  );
};

export default CustomCursor;
