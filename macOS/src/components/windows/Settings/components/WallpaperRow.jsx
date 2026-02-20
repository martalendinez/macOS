// src/components/windows/Settings/components/WallpaperRow.jsx
export default function WallpaperRow({ title, textClass, wallpapers, onPick, isSelected, uiTheme }) {
  const isMac = uiTheme === "macos";

  return (
    <div>
      <div className={`${textClass} text-sm font-medium mb-3`}>{title}</div>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {wallpapers.map((src) => (
          <button
            key={src}
            onClick={() => onPick(src)}
            className={`rounded-2xl overflow-hidden border transition ${
              isSelected(src)
                ? isMac
                  ? "border-[hsl(var(--accent)/0.55)] ring-2 ring-[hsl(var(--accent)/0.25)]"
                  : "border-white/40 ring-2 ring-white/30"
                : isMac
                ? "border-black/10 hover:border-black/20"
                : "border-white/10 hover:border-white/20"
            }`}
            style={{ width: 150, height: 96 }}
          >
            <img src={src} className="w-full h-full object-cover" alt="" />
          </button>
        ))}
      </div>
    </div>
  );
}