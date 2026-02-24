import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface Shape {
  id: number;
  type: "circle" | "square" | "triangle" | "diamond";
  x: number;
  y: number;
  size: number;
  filled: boolean;
  rotation: number;
}

const generateShapes = (count: number): Shape[] => {
  const types: Shape["type"][] = ["circle", "square", "triangle", "diamond"];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    type: types[Math.floor(Math.random() * types.length)],
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 20 + Math.random() * 50,
    filled: Math.random() > 0.5,
    rotation: Math.random() * 360,
  }));
};

const ShapeElement = ({ shape, mouseX, mouseY }: { shape: Shape; mouseX: number; mouseY: number }) => {
  const dx = (mouseX - shape.x) / 100;
  const dy = (mouseY - shape.y) / 100;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const push = Math.max(0, 1 - dist * 2);
  const offsetX = -dx * push * 30;
  const offsetY = -dy * push * 30;

  const common = `transition-all duration-700 ease-out`;

  if (shape.type === "circle") {
    return (
      <motion.div
        className={`absolute rounded-full ${common} ${
          shape.filled ? "bg-primary/15" : "border border-primary/30"
        }`}
        style={{
          left: `${shape.x}%`,
          top: `${shape.y}%`,
          width: shape.size,
          height: shape.size,
          transform: `translate(${offsetX}px, ${offsetY}px)`,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: shape.id * 0.05, duration: 0.8 }}
      />
    );
  }

  if (shape.type === "square") {
    return (
      <motion.div
        className={`absolute ${common} ${
          shape.filled ? "bg-primary/10" : "border border-primary/25"
        }`}
        style={{
          left: `${shape.x}%`,
          top: `${shape.y}%`,
          width: shape.size,
          height: shape.size,
          transform: `translate(${offsetX}px, ${offsetY}px) rotate(${shape.rotation + push * 20}deg)`,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: shape.id * 0.05, duration: 0.8 }}
      />
    );
  }

  if (shape.type === "triangle") {
    const borderStyle = shape.filled
      ? { borderLeft: `${shape.size / 2}px solid transparent`, borderRight: `${shape.size / 2}px solid transparent`, borderBottom: `${shape.size}px solid hsl(var(--primary) / 0.12)` }
      : { borderLeft: `${shape.size / 2}px solid transparent`, borderRight: `${shape.size / 2}px solid transparent`, borderBottom: `${shape.size}px solid hsl(var(--primary) / 0.25)` };

    return (
      <motion.div
        className={`absolute ${common}`}
        style={{
          left: `${shape.x}%`,
          top: `${shape.y}%`,
          width: 0,
          height: 0,
          ...borderStyle,
          transform: `translate(${offsetX}px, ${offsetY}px) rotate(${shape.rotation + push * 15}deg)`,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: shape.id * 0.05, duration: 0.8 }}
      />
    );
  }

  // Diamond
  return (
    <motion.div
      className={`absolute ${common} ${
        shape.filled ? "bg-primary/10" : "border border-primary/25"
      }`}
      style={{
        left: `${shape.x}%`,
        top: `${shape.y}%`,
        width: shape.size * 0.7,
        height: shape.size * 0.7,
        transform: `translate(${offsetX}px, ${offsetY}px) rotate(${45 + push * 20}deg)`,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: shape.id * 0.05, duration: 0.8 }}
    />
  );
};

const FloatingShapes = () => {
  const [shapes] = useState(() => generateShapes(12));
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMouse({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape) => (
        <ShapeElement key={shape.id} shape={shape} mouseX={mouse.x} mouseY={mouse.y} />
      ))}
    </div>
  );
};

export default FloatingShapes;
