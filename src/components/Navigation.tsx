import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";

interface NavigationProps {
  theme: string;
  toggleTheme: () => void;
}

const Navigation = ({ theme, toggleTheme }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Work", path: "/work" },
    { label: "About", path: "/about" },
  ];

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 w-full z-50 px-4 md:px-8"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <AnimatePresence mode="wait">
          {!isScrolled ? (
            <motion.nav
              key="full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-between py-6"
            >
              <Link to="/" className="font-display font-bold text-primary text-xl md:text-2xl tracking-tight">
                Alishan
              </Link>

              <div className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest absolute left-1/2 -translate-x-1/2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative text-primary hover:opacity-70 transition-opacity ${
                      location.pathname === item.path ? "opacity-100" : "opacity-60"
                    }`}
                  >
                    {item.label}
                    {location.pathname === item.path && (
                      <motion.div layoutId="nav-indicator" className="absolute -bottom-1 left-0 w-full h-px bg-primary" />
                    )}
                  </Link>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={toggleTheme}
                  data-cursor-hover
                  className="w-8 h-8 rounded-full border border-primary flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
                </button>

                <button
                  onClick={() => setMenuOpen(true)}
                  data-cursor-hover
                  className="md:hidden flex flex-col gap-1.5 items-end"
                >
                  <div className="w-6 h-px bg-primary" />
                  <div className="w-4 h-px bg-primary" />
                  <div className="w-6 h-px bg-primary" />
                </button>
              </div>
            </motion.nav>
          ) : (
            <motion.nav
              key="compact"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-between py-3"
            >
              <Link to="/" className="font-display font-extrabold text-primary text-lg">
                عالی شان
              </Link>

              <div className="hidden md:flex items-center gap-1 bg-card/80 backdrop-blur-md border border-border px-1 py-1 rounded-full absolute left-1/2 -translate-x-1/2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest rounded-full transition-colors ${
                      location.pathname === item.path
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={toggleTheme}
                  data-cursor-hover
                  className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  {theme === "dark" ? <Sun size={12} /> : <Moon size={12} />}
                </button>

                <button
                  onClick={() => setMenuOpen(true)}
                  data-cursor-hover
                  className="md:hidden flex flex-col gap-1 items-end"
                >
                  <div className="w-5 h-px bg-foreground" />
                  <div className="w-3 h-px bg-foreground" />
                </button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] bg-primary flex flex-col items-center justify-center gap-8"
          >
            <button
              onClick={() => setMenuOpen(false)}
              data-cursor-hover
              className="absolute top-6 right-6 text-primary-foreground font-mono text-sm tracking-widest uppercase"
            >
              Close
            </button>
            {navItems.map((item, i) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
              >
                <Link
                  to={item.path}
                  className="font-display text-5xl md:text-7xl font-bold text-primary-foreground hover:opacity-70 transition-opacity"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
