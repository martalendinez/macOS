// src/components/windows/Settings/components/SidebarNav.jsx
export default function SidebarNav({ isMac, styles, sections, activeSection, onSelect }) {
  // macOS Settings uses a very subtle divider, not a solid border
  // We simulate it with an inset shadow (works in light + dark)
  const divider = isMac
    ? styles?.textMain?.includes("text-white")
      ? "shadow-[inset_-1px_0_0_rgba(255,255,255,0.08)]"
      : "shadow-[inset_-1px_0_0_rgba(0,0,0,0.06)]"
    : "border-r border-white/10"; // glass can keep a soft border

  return (
    <div className={`w-64 ${styles.sidebarBg} p-4 ${divider}`}>
      <div className={`${styles.textSub} text-xs mb-3`}>Settings</div>

      <div className="space-y-1">
        {sections.map((s) => {
          const active = activeSection === s.id;

          const activeClass = isMac
            ? "bg-[hsl(var(--accent)/0.10)] text-[hsl(var(--accent))] border border-[hsl(var(--accent)/0.35)]"
            : "bg-white/15 text-white/95 border border-white/10";

          // softer macOS hover + text
          const idleClass = isMac
            ? "text-black/70 hover:bg-black/5 hover:text-black/85"
            : "hover:bg-white/10 text-white/80";

          return (
            <div
              key={s.id}
              onClick={() => onSelect(s)}
              className={`px-3 py-2 rounded-lg cursor-pointer transition border ${
                active ? activeClass : `border-transparent ${idleClass}`
              }`}
            >
              {s.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}