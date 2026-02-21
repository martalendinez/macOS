// src/components/windows/Settings/SettingsWindow.jsx
import { useMemo, useRef, useState } from "react";

import useSettingsStyles from "./useSettingsStyles";
import { ACCENT_OPTIONS, GLASS_WALLPAPERS, MAC_WALLPAPERS, SECTIONS } from "./constants";
import { downloadResume } from "./utils";

import SidebarNav from "./components/SidebarNav";
import Section from "./components/Section";
import AccentPicker from "./components/AccentPicker";
import WallpaperSection from "./components/WallpaperSection";
import QuickActionsSection from "./components/QuickActionsSection";

export default function SettingsWindow({
  uiTheme,
  setUiTheme,
  iconTheme,
  setIconTheme,
  theme = "light",
  setTheme, // ✅ used by quick actions
  wallpaperUrl,
  setWallpaperUrl,
  accent,
  setAccent,
  onOpenWindow,
  notify,

  // ✅ NEW: reset all windows (comes from appApi)
  resetLayout,
}) {
  const isMac = uiTheme === "macos";
  const isDark = theme === "dark";

  const styles = useSettingsStyles(isMac, isDark);

  const [activeSection, setActiveSection] = useState("theme");

  const themeRef = useRef(null);
  const accentRef = useRef(null);
  const wallpapersRef = useRef(null);
  const quickRef = useRef(null);

  const sectionRefs = useMemo(
    () => ({
      theme: themeRef,
      accent: accentRef,
      wallpapers: wallpapersRef,
      quick: quickRef,
    }),
    []
  );

  // Only include sections that exist here (in case constants still contains "font")
  const sections = useMemo(() => {
    const allowed = new Set(["theme", "accent", "wallpapers", "quick"]);
    return SECTIONS.filter((s) => allowed.has(s.id)).map((s) => ({ ...s, ref: sectionRefs[s.id] }));
  }, [sectionRefs]);

  function scrollToSection(section) {
    setActiveSection(section.id);
    section.ref?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // wallpaper logic
  const isSelected = (src) => wallpaperUrl === src;
  const pickWallpaper = (src) => setWallpaperUrl?.(src);
  const clearCustom = () => setWallpaperUrl?.(null);

  const labelClass = isDark ? "text-white/60 text-xs" : `${styles.textSub} text-xs`;
  const titleClass = isDark ? "text-white/65 text-xs" : `${styles.textSub} text-xs`;

  return (
    <div
      className={[
        // ✅ smaller base typography + nicer rhythm
        "no-darkwin h-full flex text-[14px] leading-[1.4]",
        isDark ? "text-white" : isMac ? "text-black" : "text-white",
      ].join(" ")}
    >
      <SidebarNav
        isMac={isMac}
        styles={styles}
        sections={sections}
        activeSection={activeSection}
        onSelect={scrollToSection}
      />

      <div
        className={[
          "flex-1 p-6 overflow-auto space-y-10",
          isDark ? "bg-[#1c1c1e]" : styles.mainBg,
        ].join(" ")}
      >
        {/* THEME */}
        <Section id="theme" title="Theme" titleClass={titleClass} refObj={themeRef}>
          <div className="space-y-3">
            <div className={labelClass}>Window style</div>
            <div className="flex gap-2">
              <button
                type="button"
                className={`${styles.btnBase} ${uiTheme === "glass" ? styles.btnSelected : styles.btnUnselected}`}
                onClick={() => setUiTheme?.("glass")}
              >
                Glass
              </button>
              <button
                type="button"
                className={`${styles.btnBase} ${uiTheme === "macos" ? styles.btnSelected : styles.btnUnselected}`}
                onClick={() => setUiTheme?.("macos")}
              >
                macOS
              </button>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <div className={labelClass}>Icon style</div>
            <div className="flex gap-2">
              <button
                type="button"
                className={`${styles.btnBase} ${iconTheme === "glass" ? styles.btnSelected : styles.btnUnselected}`}
                onClick={() => setIconTheme?.("glass")}
              >
                Glass icons
              </button>
              <button
                type="button"
                className={`${styles.btnBase} ${iconTheme === "macos" ? styles.btnSelected : styles.btnUnselected}`}
                onClick={() => setIconTheme?.("macos")}
              >
                macOS icons
              </button>
            </div>
          </div>
        </Section>

        {/* ACCENT */}
        <Section id="accent" title="Accent color" titleClass={titleClass} refObj={accentRef}>
          <AccentPicker
            isMac={isMac}
            styles={styles}
            accent={accent ?? "sky"}
            setAccent={setAccent}
            options={ACCENT_OPTIONS}
          />
        </Section>

        {/* WALLPAPERS */}
        <Section id="wallpapers" title="Wallpapers" titleClass={titleClass} refObj={wallpapersRef}>
          <WallpaperSection
            styles={styles}
            theme={theme}
            onReset={clearCustom}
            macWallpapers={MAC_WALLPAPERS}
            glassWallpapers={GLASS_WALLPAPERS}
            isSelected={isSelected}
            onPick={pickWallpaper}
          />
        </Section>

        {/* QUICK */}
        <Section id="quick" title="Quick actions" titleClass={titleClass} refObj={quickRef}>
          <QuickActionsSection
            uiTheme={uiTheme}
            theme={theme}
            onDownloadResume={downloadResume}
            onOpenWindow={onOpenWindow}
            onToggleTheme={() => setTheme?.(theme === "dark" ? "light" : "dark")}
            notify={notify}
            onResetLayout={resetLayout} // ✅ NEW
          />
        </Section>
      </div>
    </div>
  );
}