import { motion } from "framer-motion";

export default function ProjectCard({ item, styles, mode = "projects", onAction }) {
  const lines = mode === "secret" ? item.overview ?? [] : item.bullets ?? [];

  return (
    <motion.div
      className={`rounded-2xl p-5 shadow-sm ${styles.cardClass}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className={`text-lg font-semibold ${styles.textMain}`}>{item.title}</div>
          <div className={`mt-1 text-sm ${styles.textSub}`}>{item.subtitle}</div>
        </div>

        <div className="flex flex-wrap gap-2 justify-end">
          {(item.tags ?? []).slice(0, mode === "secret" ? 3 : 99).map((t) => (
            <span key={t} className={`px-2 py-[3px] rounded-full text-xs ${styles.chipClass}`}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {!!lines.length && (
        <ul className={`mt-4 space-y-2 text-sm ${styles.textMain}`}>
          {lines.map((b) => (
            <li key={b} className="flex gap-2">
              <span className={`${styles.textSub}`}>•</span>
              <span className={`${styles.isMac ? "text-black/80" : "text-white/85"}`}>{b}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5 flex items-center gap-2 flex-wrap">
        {mode === "secret" ? (
          <button
            onClick={() => onAction?.({ action: "openSecretWindow", id: item.id })}
            className={`px-3 py-2 rounded-xl text-sm transition-all ${styles.linkBtnClass}`}
          >
            Open
          </button>
        ) : (
          (item.links ?? []).map((l) => (
            <button
              key={l.label}
              onClick={() => onAction?.(l)}
              className={`px-3 py-2 rounded-xl text-sm transition-all ${styles.linkBtnClass}`}
            >
              {l.label}
            </button>
          ))
        )}
      </div>
    </motion.div>
  );
}