// src/components/shell/LeftRail.jsx
import { motion } from "framer-motion";

export default function LeftRail({ loaded, items = [], onOpenWindow }) {
  return (
    <motion.div
      className="fixed top-12 left-4 z-40 flex flex-col gap-6 text-white text-xs font-medium"
      initial={{ opacity: 0, x: -18 }}
      animate={loaded ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {items.map(({ icon, label, windowId }, idx) => (
        <motion.div
          key={label}
          className="flex flex-col items-start gap-1 cursor-pointer hover:scale-105 transition-transform duration-150 origin-top-left"
          onClick={() => windowId && onOpenWindow?.(windowId)}
          initial={{ opacity: 0, y: 10 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{
            delay: 0.32 + idx * 0.08,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <img src={icon} alt={label} className="w-15 h-15 object-contain" />
          <div className="bg-white/20 px-2 py-[3px] rounded-[6px] backdrop-blur-sm text-white text-[13px] whitespace-nowrap shadow-sm">
            {label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}