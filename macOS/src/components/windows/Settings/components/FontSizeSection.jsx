// src/components/windows/Settings/components/FontSizeSection.jsx
export default function FontSizeSection({ isMac, styles, value, onChange, btnBase }) {
  const label = value <= 0.95 ? "Small" : value >= 1.1 ? "Large" : "Default";

  const dec = () => onChange(value - 0.05);
  const inc = () => onChange(value + 0.05);
  const reset = () => onChange(1);

  return (
    <div className={`rounded-xl ${styles.cardBg} border ${styles.cardBorder} p-4`}>
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <div className={`${styles.textMain} text-sm font-medium`}>Font scale</div>
          <div className={`${styles.textSub} text-xs mt-1`}>Adjust the UI text size</div>
        </div>

        <div className={`${styles.textSub} text-xs text-right`}>
          <div>{label}</div>
          <div className="tabular-nums">{Math.round(value * 100)}%</div>
        </div>
      </div>

      <div className={`rounded-lg ${isMac ? "bg-black/5" : "bg-white/5"} p-3 mb-4`}>
        <div className={`${styles.textSub} text-[11px] mb-1`}>Preview</div>
        <div className={`${styles.textMain}`} style={{ fontSize: `${value * 14}px` }}>
          The quick brown fox jumps over the lazy dog.
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={dec}
          className={`h-9 w-9 rounded-xl flex items-center justify-center transition ${
            isMac
              ? "bg-white border border-black/10 text-black/70 hover:bg-black/5"
              : "bg-white/10 border border-white/10 text-white/80 hover:bg-white/15"
          }`}
          aria-label="Decrease font size"
        >
          A
        </button>

        <div
          className={`flex-1 rounded-full px-3 py-2 ${
            isMac ? "bg-black/5 border border-black/10" : "bg-white/5 border border-white/10"
          }`}
        >
          <input
            type="range"
            min="0.85"
            max="1.25"
            step="0.05"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className={`w-full h-2 appearance-none bg-transparent cursor-pointer slider ${
              isMac ? "slider-mac" : "slider-glass"
            }`}
            aria-label="Font scale"
          />
        </div>

        <button
          type="button"
          onClick={inc}
          className={`h-9 w-9 rounded-xl flex items-center justify-center transition ${
            isMac
              ? "bg-white border border-black/10 text-black/80 hover:bg-black/5"
              : "bg-white/10 border border-white/10 text-white hover:bg-white/15"
          }`}
          aria-label="Increase font size"
        >
          <span className="text-base">A</span>
        </button>
      </div>

      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={reset}
          className={`${btnBase} ${
            isMac ? "bg-black/5 text-black/70 hover:bg-black/10" : "bg-white/5 text-white/70 hover:bg-white/10"
          }`}
        >
          Reset
        </button>
      </div>
    </div>
  );
}