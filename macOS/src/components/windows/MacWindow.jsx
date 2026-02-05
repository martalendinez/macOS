import { motion } from "framer-motion";

export default function MacWindow({
  id,
  title,
  isActive,
  zIndex,
  onFocus,
  onClose,
  width = 860,
  height = 560,
  initialPos = { x: 220, y: 90 },
  children,
}) {
  return (
    <motion.div
      onMouseDown={() => onFocus(id)}
      className={`fixed rounded-2xl overflow-hidden shadow-2xl border border-white/15 backdrop-blur-xl ${
        isActive ? "ring-1 ring-white/20" : "opacity-95"
      }`}
      style={{
        width,
        height,
        zIndex,
        left: initialPos.x,
        top: initialPos.y,
        background: "rgba(255,255,255,0.10)",
      }}
      initial={{ opacity: 0, scale: 0.98, y: 10, filter: "blur(8px)" }}
      animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.98, y: 10, filter: "blur(8px)" }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Title bar */}
      <div className="h-12 px-4 flex items-center justify-between bg-white/10">
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose(id);
            }}
            className="w-3 h-3 rounded-full bg-red-400 hover:brightness-110"
            aria-label="Close"
            title="Close"
          />
          <div className="w-3 h-3 rounded-full bg-yellow-400 opacity-70" />
          <div className="w-3 h-3 rounded-full bg-green-400 opacity-70" />
        </div>

        <div className="text-[14px] font-medium text-white/90 select-none">
          {title}
        </div>

        <div className="w-[52px]" />
      </div>

      {/* Content */}
      <div className="h-[calc(100%-3rem)]">{children}</div>
    </motion.div>
  );
}
