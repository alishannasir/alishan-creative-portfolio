import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface Shape {
  id: number;
  type: "circle" | "square" | "triangle" | "diamond";
  x: number;
  y: number;
  size: number;
  filled: boolean;
  rotation: number;
  vx: number;
  vy: number;
}

const generateShapes = (count: number): Shape[] => {
  const types: Shape["type"][] = ["circle", "square", "triangle", "diamond"];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    type: types[Math.floor(Math.random() * types.length)],
    x: Math.random() * window.innerWidth,
    y: Math.random() * document.documentElement.scrollHeight,
    size: 18 + Math.random() * 45,
    filled: Math.random() > 0.5,
    rotation: Math.random() * 360,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
  }));
};

const REPEL_RADIUS = 150;
const REPEL_FORCE = 8;

const FloatingShapes = () => {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [mouse, setMouse] = useState({ x: -9999, y: -9999 });

  useEffect(() => {
    setShapes(generateShapes(20));
  }, []);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY + window.scrollY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const animate = useCallback(() => {
    setShapes((prev) =>
      prev.map((s) => {
        let { x, y, vx, vy } = s;
        const dx = x - mouse.x;
        const dy = y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < REPEL_RADIUS && dist > 0) {
          const force = ((REPEL_RADIUS - dist) / REPEL_RADIUS) * REPEL_FORCE;
          vx += (dx / dist) * force;
          vy += (dy / dist) * force;
        }

        // drift
        vx += (Math.random() - 0.5) * 0.05;
        vy += (Math.random() - 0.5) * 0.05;

        // damping
        vx *= 0.96;
        vy *= 0.96;

        x += vx;
        y += vy;

        // wrap around
        const pageH = document.documentElement.scrollHeight;
        const pageW = window.innerWidth;
        if (x < -s.size) x = pageW + s.size;
        if (x > pageW + s.size) x = -s.size;
        if (y < -s.size) y = pageH + s.size;
        if (y > pageH + s.size) y = -s.size;

        return { ...s, x, y, vx, vy };
      })
    );
  }, [mouse]);

  useEffect(() => {
    let raf: number;
    const loop = () => {
      animate();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [animate]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0" style={{ position: "fixed", top: 0, left: 0 }}>
      {shapes.map((shape) => (
        <ShapeEl key={shape.id} shape={shape} />
      ))}
    </div>
  );
};

const ShapeEl = ({ shape }: { shape: Shape }) => {
  const top = shape.y - window.scrollY;
  const style: React.CSSProperties = {
    position: "fixed",
    left: shape.x,
    top,
    width: shape.size,
    height: shape.size,
  };

  if (shape.type === "circle") {
    return (
      <div
        className={`rounded-full ${shape.filled ? "bg-primary/12" : "border border-primary/25"}`}
        style={style}
      />
    );
  }

  if (shape.type === "square") {
    return (
      <div
        className={shape.filled ? "bg-primary/10" : "border border-primary/20"}
        style={{ ...style, transform: `rotate(${shape.rotation}deg)` }}
      />
    );
  }

  if (shape.type === "triangle") {
    return (
      <div
        style={{
          position: "fixed",
          left: shape.x,
          top,
          width: 0,
          height: 0,
          borderLeft: `${shape.size / 2}px solid transparent`,
          borderRight: `${shape.size / 2}px solid transparent`,
          borderBottom: `${shape.size}px solid hsl(var(--primary) / ${shape.filled ? 0.12 : 0.2})`,
          transform: `rotate(${shape.rotation}deg)`,
        }}
      />
    );
  }

  // diamond
  return (
    <div
      className={shape.filled ? "bg-primary/10" : "border border-primary/20"}
      style={{
        ...style,
        width: shape.size * 0.7,
        height: shape.size * 0.7,
        transform: `rotate(45deg)`,
      }}
    />
  );
};

export default FloatingShapes;
