// src/components/windows/Settings/components/AccentPicker.jsx
export default function AccentPicker({ isMac, styles, accent, setAccent, options }) {
  return (
    <div className={`rounded-xl ${styles.cardBg} border ${styles.cardBorder} p-4`}>
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <div className={`${styles.textMain} text-sm font-medium`}>Choose your accent</div>
          <div className={`${styles.textSub} text-xs mt-1`}>
            Used across macOS mode highlights, buttons, and selected states.
          </div>
        </div>

        <div
          className="h-7 w-7 rounded-full border border-black/10"
          style={{ backgroundColor: "hsl(var(--accent))" }}
          title="Current accent"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const isActive = accent === opt.key;

          return (
            <button
              key={opt.key}
              type="button"
              onClick={() => setAccent?.(opt.key)}
              className={`px-3 py-2 rounded-xl text-sm border transition ${
                isMac
                  ? isActive
                    ? "bg-[hsl(var(--accent)/0.10)] text-[hsl(var(--accent))] border-[hsl(var(--accent)/0.35)]"
                    : "bg-white text-black/75 border-black/10 hover:bg-black/5"
                  : isActive
                  ? "bg-white/20 text-white border-white/20"
                  : "bg-white/10 text-white/85 border-white/10 hover:bg-white/15"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}