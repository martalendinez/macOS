// src/components/shell/Dock.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import DockItem from "./DockItem";

export default function Dock({ loaded, items = [], onOpenWindow }) {
  const [mouseX, setMouseX] = useState(null);

  return (
    <motion.div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl shadow-lg flex gap-6 z-50"
      onMouseMove={(e) => setMouseX(e.clientX)}
      onMouseLeave={() => setMouseX(null)}
      initial={{ opacity: 0, y: 14 }}
      animate={loaded ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {items.map((item, index) => (
        <DockItem
          key={item.label}
          item={item}
          index={index}
          mouseX={mouseX}
          total={items.length}
          loaded={loaded}
          onOpenWindow={onOpenWindow}
        />
      ))}
    </motion.div>
  );
}