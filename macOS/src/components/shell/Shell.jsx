// src/components/shell/Shell.jsx
import { motion } from "framer-motion";

export default function Shell({
  fontScale = 1,
  baseTextClass = "text-white",
  wallpaperUrl,
  loaded,
  children,
}) {
  return (
    <div style={{ fontSize: `${(fontScale ?? 1) * 16}px` }}>
      <motion.div
        className={`min-h-screen bg-cover bg-center font-sans ${baseTextClass} relative`}
        style={{ backgroundImage: `url(${wallpaperUrl})` }}
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={loaded ? { opacity: 1, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}