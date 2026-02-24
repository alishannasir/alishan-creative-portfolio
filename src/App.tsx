import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Index from "./pages/Index";
import Work from "./pages/Work";
import About from "./pages/About";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";
import Navigation from "./components/Navigation";
import CustomCursor from "./components/CustomCursor";
import SmoothScroll from "./components/SmoothScroll";

const queryClient = new QueryClient();

const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, clipPath: "inset(10% 10% 10% 10%)" }}
    animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
    exit={{ opacity: 0, clipPath: "inset(5% 5% 5% 5%)", scale: 0.97 }}
    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/work" element={<PageTransition><Work /></PageTransition>} />
        <Route path="/work/:id" element={<PageTransition><ProjectDetail /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <SmoothScroll />
          <CustomCursor />
          <Navigation theme={theme} toggleTheme={toggleTheme} />
          <AnimatedRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
