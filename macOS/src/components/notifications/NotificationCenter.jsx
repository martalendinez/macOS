// src/components/notifications/NotificationCenter.jsx
import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";

export default function NotificationCenter({
  uiTheme = "glass",
  isOpen,
  onClose,
  items = [],
  onClearAll,
  onMarkAllRead,
  onRemoveOne,
}) {
  const isMac = uiTheme === "macos";

  const styles = useMemo(() => {
    return {
      panel:
        uiTheme === "macos"
          ? "bg-white/90 border border-black/10 text-black"
          : "bg-black/40 border border-white/15 text-white backdrop-blur-xl",
      title: isMac ? "text-black/80" : "text-white/90",
      sub: isMac ? "text-black/50" : "text-white/60",
      item:
        uiTheme === "macos"
          ? "bg-white border border-black/10"
          : "bg-white/10 border border-white/15 backdrop-blur-xl",
      btn:
        uiTheme === "macos"
          ? "bg-white border border-black/10 text-black/80 hover:bg-[hsl(var(--accent)/0.12)] hover:border-[hsl(var(--accent)/0.35)]"
          : "bg-white/10 border border-white/15 text-white/90 hover:bg-white/15",
    };
  }, [uiTheme, isMac]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* overlay */}
          <motion.div
            className="fixed inset-0 z-[70]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* panel */}
          <motion.aside
            className={`fixed top-12 right-4 z-[80] w-[380px] max-w-[92vw] rounded-2xl shadow-xl overflow-hidden ${styles.panel}`}
            initial={{ opacity: 0, y: -8, x: 12 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -8, x: 12 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`px-4 py-3 flex items-center justify-between border-b ${isMac ? "border-black/10" : "border-white/10"}`}>
              <div>
                <div className={`text-sm font-semibold ${styles.title}`}>Notifications</div>
                <div className={`text-xs ${styles.sub}`}>{items.length ? `${items.length} total` : "All caught up"}</div>
              </div>

              <div className="flex items-center gap-2">
                {!!items.length && (
                  <>
                    <button onClick={onMarkAllRead} className={`px-2 py-1 rounded-lg text-xs ${styles.btn}`}>
                      Mark all read
                    </button>
                    <button onClick={onClearAll} className={`px-2 py-1 rounded-lg text-xs ${styles.btn}`}>
                      Clear all
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="max-h-[62vh] overflow-y-auto p-3 space-y-2">
              {!items.length ? (
                <div className={`p-4 rounded-xl ${styles.sub}`}>
                  No notifications right now ✨
                </div>
              ) : (
                items.map((n) => (
                  <div key={n.id} className={`rounded-xl p-3 ${styles.item}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          {!n.read && (
                            <span
                              className="inline-block w-2 h-2 rounded-full"
                              style={{ backgroundColor: "hsl(var(--accent))" }}
                            />
                          )}
                          <div className={`text-sm font-semibold ${styles.title} truncate`}>
                            {n.title}
                          </div>
                        </div>

                        {n.message && (
                          <div className={`mt-1 text-xs ${styles.sub} leading-relaxed`}>
                            {n.message}
                          </div>
                        )}

                        <div className={`mt-2 text-[11px] ${styles.sub}`}>
                          {n.timeLabel}
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveOne?.(n.id)}
                        className={`shrink-0 px-2 py-1 rounded-lg text-xs ${styles.btn}`}
                        title="Dismiss"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
