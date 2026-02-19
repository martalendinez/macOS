// src/components/notifications/ToastStack.jsx
import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";

export default function ToastStack({ uiTheme = "glass", toasts = [], onDismiss }) {
  const isMac = uiTheme === "macos";

  const toastClass = useMemo(() => {
    return uiTheme === "macos"
      ? "bg-white/95 border border-black/10 text-black shadow-lg"
      : "bg-black/55 border border-white/15 text-white shadow-lg backdrop-blur-xl";
  }, [uiTheme]);

  const titleClass = isMac ? "text-black/85" : "text-white/90";
  const subClass = isMac ? "text-black/55" : "text-white/60";

  return (
    <div className="fixed top-12 right-4 z-[90] w-[360px] max-w-[92vw] pointer-events-none">
      <AnimatePresence initial={false}>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            className={`pointer-events-auto mb-2 rounded-2xl overflow-hidden ${toastClass}`}
            initial={{ opacity: 0, y: -10, x: 8 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -10, x: 8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-4 py-3 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className={`text-sm font-semibold ${titleClass} truncate`}>
                  {t.title}
                </div>
                {t.message && (
                  <div className={`mt-1 text-xs ${subClass} leading-relaxed`}>
                    {t.message}
                  </div>
                )}
              </div>

              <button
                className={`shrink-0 text-xs px-2 py-1 rounded-lg ${
                  isMac ? "bg-black/5 hover:bg-black/10" : "bg-white/10 hover:bg-white/15"
                }`}
                onClick={() => onDismiss?.(t.id)}
                title="Dismiss"
              >
                ✕
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
