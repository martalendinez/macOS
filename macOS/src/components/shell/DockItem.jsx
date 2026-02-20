// src/components/shell/DockItem.jsx
import { motion } from "framer-motion";

export default function DockItem({
  item,
  index,
  mouseX,
  total,
  loaded,
  onOpenWindow,
}) {
  const distanceFactor = 180;

  const getCenter = (i) => {
    const itemWidth = 60;
    const dockLeft = window.innerWidth / 2 - (total * itemWidth) / 2;
    return dockLeft + i * itemWidth + itemWidth / 2;
  };

  const scale = mouseX
    ? Math.min(
        1.35,
        1 + Math.max(0, 1 - Math.abs(mouseX - getCenter(index)) / distanceFactor)
      )
    : 1;

  const handleClick = () => {
    if (item.windowId) {
      onOpenWindow?.(item.windowId);
    }
  };

  return (
    <motion.div
      className="group relative flex flex-col items-center cursor-pointer"
      onClick={handleClick}
      initial={{ opacity: 0, y: 10 }}
      animate={loaded ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: 0.45 + index * 0.08,
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
        animate={{ scale, y: scale > 1 ? -10 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="flex flex-col items-center"
      >
        <div className="w-15 h-15 flex items-center justify-center rounded-[8px] transition-all duration-150">
          <img
            src={item.icon}
            alt={item.label}
            className="w-15 h-15 object-contain"
          />
        </div>
      </motion.div>

      <div
        className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white text-black text-[15px] px-3 py-[4px] rounded-[6px] shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap tracking-tight"
        style={{ fontFamily: "Lustria" }}
      >
        {item.label}
      </div>
    </motion.div>
  );
}