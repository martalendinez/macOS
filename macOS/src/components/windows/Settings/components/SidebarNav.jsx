// src/components/windows/Settings/components/SidebarNav.jsx
export default function SidebarNav({ isMac, styles, sections, activeSection, onSelect }) {
  return (
    <div className={`w-64 border-r ${styles.sidebarBorder} ${styles.sidebarBg} p-4`}>
      <div className={`${styles.textSub} text-xs mb-3`}>Settings</div>

      <div className="space-y-1">
        {sections.map((s) => (
          <div
            key={s.id}
            onClick={() => onSelect(s)}
            className={`px-3 py-2 rounded-lg cursor-pointer transition ${
              activeSection === s.id
                ? isMac
                  ? "bg-[hsl(var(--accent)/0.10)] text-[hsl(var(--accent))] border border-[hsl(var(--accent)/0.35)]"
                  : "bg-white/15 text-white/95"
                : isMac
                ? "hover:bg-black/5 text-black/70"
                : "hover:bg-white/10 text-white/80"
            }`}
          >
            {s.label}
          </div>
        ))}
      </div>
    </div>
  );
}