// src/components/windows/Settings/components/SidebarNav.jsx
import { useMemo, useState } from "react";
import { getTokens } from "../../../../ui/themeTokens";

/**
 * Finder-style sidebar icons:
 * - monochrome / single-accent blue
 * - thin stroke, minimal
 * - no colored background tile
 */
function FinderIcon({ name }) {
  const cls = "w-[18px] h-[18px]";
  const stroke = "currentColor";
  const sw = 2;

  switch (name) {
    case "home":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none">
          <path
            d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinejoin="round"
          />
        </svg>
      );
    case "doc":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none">
          <path d="M7 3h7l3 3v15H7V3Z" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
          <path d="M14 3v4h4" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
        </svg>
      );
    case "pics":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none">
          <path d="M5 6h14v12H5V6Z" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
          <path d="M8 14l2-2 3 3 2-2 2 2" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
          <path d="M9 10h.01" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        </svg>
      );
    case "dl":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none">
          <path d="M12 3v10" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
          <path d="M8 10l4 4 4-4" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
          <path d="M5 21h14" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        </svg>
      );
    case "apps":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none">
          <path d="M6 7h3v3H6V7Z" stroke={stroke} strokeWidth={sw} />
          <path d="M10.5 7h3v3h-3V7Z" stroke={stroke} strokeWidth={sw} />
          <path d="M15 7h3v3h-3V7Z" stroke={stroke} strokeWidth={sw} />
          <path d="M6 11.5h3v3H6v-3Z" stroke={stroke} strokeWidth={sw} />
          <path d="M10.5 11.5h3v3h-3v-3Z" stroke={stroke} strokeWidth={sw} />
          <path d="M15 11.5h3v3h-3v-3Z" stroke={stroke} strokeWidth={sw} />
        </svg>
      );
    default:
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none">
          <path d="M12 8v8" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
          <path d="M8 12h8" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        </svg>
      );
  }
}

export default function SidebarNav({
  uiTheme = "macos",
  glassContrast = "light",
  theme = "light",
  activeSection,
  sections = [],
  onSelect,
  onOpenWindow,
}) {
  const t = getTokens(uiTheme, glassContrast);
  const isMac = t.isMac;
  const isDark = theme === "dark";
  const [query, setQuery] = useState("");

  // Finder sidebar surface + text
  const bg = isMac
    ? isDark
      ? "bg-[#141416] border-r border-white/10"
      : "bg-[#f6f6f6] border-r border-black/10"
    : isDark
    ? "bg-black/15 border-r border-white/10 backdrop-blur-xl"
    : "bg-white/8 border-r border-white/12 backdrop-blur-xl";

  const headerText = isMac ? (isDark ? "text-white/55" : "text-black/55") : "text-white/70";
  const rowText = isMac ? (isDark ? "text-white/90" : "text-black/80") : "text-white/90";
  const iconBlue = isMac ? (isDark ? "text-[#4ea1ff]" : "text-[#0a84ff]") : "text-[#7dd3fc]";

  const activePill = isMac
    ? isDark
      ? "bg-white/10"
      : "bg-black/10"
    : "bg-white/12";

  const hoverPill = isMac
    ? isDark
      ? "hover:bg-white/8"
      : "hover:bg-black/5"
    : "hover:bg-white/10";

  const divider = isMac ? (isDark ? "bg-white/10" : "bg-black/10") : "bg-white/10";

  // Sidebar groups: make these match your screenshot labels
  const favorites = useMemo(() => [{ id: "home", label: "Home", icon: "home", onClick: () => onSelect?.(sections[0]) }], [
    onSelect,
    sections,
  ]);

  const locations = useMemo(
    () => [
      { id: "docs", label: "Documents", icon: "doc", onClick: () => onOpenWindow?.("projects") },
      { id: "pics", label: "Pictures", icon: "pics", onClick: () => onOpenWindow?.("map") },
      { id: "downloads", label: "Downloads", icon: "dl", onClick: () => onOpenWindow?.("music") },
      { id: "apps", label: "Applications", icon: "apps", onClick: () => onOpenWindow?.("terminal") },
    ],
    [onOpenWindow]
  );

  const preferences = useMemo(
    () =>
      sections.map((s) => ({
        id: s.id,
        label: s.title,
        onClick: () => onSelect?.(s),
      })),
    [sections, onSelect]
  );

  const q = query.trim().toLowerCase();

  const filterList = (list) => (!q ? list : list.filter((x) => (x.label || "").toLowerCase().includes(q)));

  const favFiltered = filterList(favorites);
  const locFiltered = filterList(locations);
  const prefFiltered = filterList(preferences);

  return (
    <div className={`w-[280px] shrink-0 h-full flex flex-col ${bg}`}>
      {/* Search */}
      <div className="p-3">
        <div
          className={[
            "rounded-xl px-3 py-2 border flex items-center gap-2",
            isMac
              ? isDark
                ? "bg-white/5 border-white/10"
                : "bg-white border-black/10"
              : isDark
              ? "bg-white/5 border-white/10"
              : "bg-white/10 border-white/12",
          ].join(" ")}
        >
          <span className={isMac ? (isDark ? "text-white/60" : "text-black/50") : "text-white/60"}>⌕</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className={[
              "w-full bg-transparent outline-none text-[15px]",
              isMac
                ? isDark
                  ? "text-white placeholder:text-white/35"
                  : "text-black placeholder:text-black/35"
                : "text-white placeholder:text-white/40",
            ].join(" ")}
          />
        </div>
      </div>

      {/* Lists */}
      <div className="flex-1 overflow-auto px-2 pb-3">
        {/* FAVORITES */}
        <div className={`px-2 pt-1 pb-2 text-[11px] font-semibold tracking-wide ${headerText}`}>FAVORITES</div>

        <div className="space-y-1">
          {favFiltered.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={item.onClick}
              className={[
                "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition",
                activePill,
                rowText,
              ].join(" ")}
            >
              <span className={`${iconBlue}`}>
                <FinderIcon name={item.icon} />
              </span>
              <span className="text-[15px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        <div className={`my-3 h-px ${divider}`} />

        {/* LOCATIONS */}
        <div className={`px-2 pt-1 pb-2 text-[11px] font-semibold tracking-wide ${headerText}`}>LOCATIONS</div>

        <div className="space-y-1">
          {locFiltered.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={item.onClick}
              className={[
                "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition",
                hoverPill,
                rowText,
              ].join(" ")}
            >
              <span className={`${iconBlue}`}>
                <FinderIcon name={item.icon} />
              </span>
              <span className="text-[15px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        <div className={`my-3 h-px ${divider}`} />

        {/* ✅ PREFERENCES (this was missing — now forced visible) */}
        <div className={`px-2 pt-1 pb-2 text-[11px] font-semibold tracking-wide ${headerText}`}>PREFERENCES</div>

        <div className="space-y-1">
          {prefFiltered.map((item) => {
            const active = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={item.onClick}
                className={[
                  "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition",
                  active ? activePill : hoverPill,
                  rowText,
                ].join(" ")}
              >
                <span className={`${iconBlue}`}>
                  <FinderIcon name="apps" />
                </span>
                <span className="text-[15px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}