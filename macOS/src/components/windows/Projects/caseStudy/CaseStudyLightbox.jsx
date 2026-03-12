import { AnimatePresence, motion } from "framer-motion";

export default function CaseStudyLightbox({ open, src, alt, onClose, theme }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black/60 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="min-h-full p-6 flex items-start justify-center">
            <motion.div
              className={`relative w-full max-w-[1200px] my-8 rounded-3xl overflow-hidden border ${
                theme.isMac
                  ? "border-black/10 bg-white"
                  : theme.isGlassDarkText
                  ? "border-black/10 bg-white/55 backdrop-blur-xl"
                  : "border-white/15 bg-black/30 backdrop-blur-xl"
              }`}
              initial={{ scale: 0.98, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.98, y: 10 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`sticky top-0 z-10 flex items-center justify-between px-5 py-4 border-b ${theme.divider} ${
                  theme.isMac
                    ? "bg-white"
                    : theme.isGlassDarkText
                    ? "bg-white/80 backdrop-blur-xl"
                    : "bg-black/40 backdrop-blur-xl"
                }`}
              >
                <div className={`text-sm font-semibold ${theme.textMain}`}>
                  {alt || "Screenshot"}
                </div>
                <button
                  className={`px-4 py-2 rounded-2xl text-sm border ${theme.buttonClass}`}
                  onClick={onClose}
                >
                  Close
                </button>
              </div>

              <div className="p-5 overflow-x-auto">
                <img
                  src={src}
                  alt={alt}
                  className="w-full h-auto rounded-2xl"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}