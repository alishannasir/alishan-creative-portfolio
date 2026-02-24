import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isPlus, setIsPlus] = useState(false);
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
      } else if (target.closest("a, button, [data-cursor-hover]")) {
        setIsHovering(true);
        setIsPlus(false);
      } else {
        setIsHovering(false);
        setIsPlus(false);
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleOver);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleOver);
    };
  }, []);

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        animate={{
          x: pos.x - (isHovering ? 24 : 6),
          y: pos.y - (isHovering ? 24 : 6),
          width: isHovering ? 48 : 12,
          height: isHovering ? 48 : 12,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      >
        <div className="w-full h-full rounded-full bg-foreground flex items-center justify-center">
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
    </>
  );
};

export default CustomCursor;
