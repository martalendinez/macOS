// src/components/windows/Settings/SettingsWindow.jsx
import { useMemo, useRef, useState } from "react";

import { getTokens } from "../../../ui/themeTokens";
import useSettingsStyles from "./useSettingsStyles";
import { ACCENT_OPTIONS, GLASS_WALLPAPERS, MAC_WALLPAPERS, SECTIONS } from "./constants";
import { downloadResume } from "./utils";

import SidebarNav from "./components/SidebarNav";
import Section from "./components/Section";
import AccentPicker from "./components/AccentPicker";
import WallpaperSection from "./components/WallpaperSection";
import QuickActionsSection from "./components/QuickActionsSection";

function Row({ label, right }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="text-[14px]">{label}</div>
      <div className="text-[14px]">{right}</div>
    </div>
  );
}

export default function SettingsWindow({
  uiTheme,
  setUiTheme,
  iconTheme,
  setIconTheme,
  theme = "light",
  setTheme,
  wallpaperUrl,
  setWallpaperUrl,
  accent,
  setAccent,
  onOpenWindow,
  notify,
  resetLayout,
  glassContrast = "light",
}) {
  const t = getTokens(uiTheme, glassContrast);
  const isMac = t.isMac;
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

  const sections = useMemo(() => {
    const allowed = new Set(["theme", "accent", "wallpapers", "quick"]);
    return SECTIONS.filter((s) => allowed.has(s.id)).map((s) => ({ ...s, ref: sectionRefs[s.id] }));
  }, [sectionRefs]);

  function scrollToSection(section) {
    setActiveSection(section.id);
    section.ref?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const isSelected = (src) => wallpaperUrl === src;
  const pickWallpaper = (src) => setWallpaperUrl?.(src);
  const clearCustom = () => setWallpaperUrl?.(null);

  // Surfaces
  const rightBg = isMac
    ? isDark
      ? "bg-[#1c1c1e]"
      : "bg-[#f5f5f7]"
    : isDark
    ? "bg-black/10"
    : "bg-white/5";

  const card = isMac
    ? isDark
      ? "bg-white/5 border border-white/10"
      : "bg-white/80 border border-black/10"
    : isDark
    ? "bg-white/6 border border-white/10"
    : "bg-white/8 border border-white/12";

  const divider = isMac ? (isDark ? "bg-white/10" : "bg-black/10") : "bg-white/10";
  const titleText = isMac ? (isDark ? "text-white/90" : "text-black/80") : "text-white/90";
  const muted = isMac ? (isDark ? "text-white/55" : "text-black/50") : "text-white/60";

  return (
    <div className={`h-full flex ${t.textMain}`}>
      <SidebarNav
        uiTheme={uiTheme}
        glassContrast={glassContrast}
        theme={theme}
        activeSection={activeSection}
        sections={sections}
        onSelect={scrollToSection}
        onOpenWindow={onOpenWindow}
      />

      <div className={`flex-1 h-full flex flex-col ${rightBg}`}>
        {/* Toolbar */}
        <div className={`h-14 px-6 flex items-center ${isMac ? (isDark ? "border-b border-white/10" : "border-b border-black/10") : "border-b border-white/10"}`}>
          <div className={`text-[20px] font-semibold ${titleText}`}>Appearance</div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto px-6 py-6 space-y-6">
          {/* Appearance card (like screenshot top) */}
          <div className={`rounded-3xl ${card} p-6 ${!isMac ? "backdrop-blur-xl" : ""}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className={`text-[16px] font-semibold ${titleText}`}>Appearance</div>
                <div className={`text-sm mt-1 ${muted}`}>Choose light/dark and window style.</div>
              </div>

              {/* Light / Dark toggle (clean) */}
              <div className="flex gap-2">
                <button
                  type="button"
                  className={`${styles.btnBase} ${theme === "light" ? styles.btnSelected : styles.btnUnselected}`}
                  onClick={() => setTheme?.("light")}
                >
                  Light
                </button>
                <button
                  type="button"
                  className={`${styles.btnBase} ${theme === "dark" ? styles.btnSelected : styles.btnUnselected}`}
                  onClick={() => setTheme?.("dark")}
                >
                  Dark
                </button>
              </div>
            </div>

            <div className={`mt-5 h-px ${divider}`} />

            <div className="mt-2">
              <Row
                label="Window style"
                right={
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
                }
              />

              <div className={`h-px ${divider}`} />

              <Row
                label="Icon style"
                right={
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className={`${styles.btnBase} ${iconTheme === "glass" ? styles.btnSelected : styles.btnUnselected}`}
                      onClick={() => setIconTheme?.("glass")}
                    >
                      Glass
                    </button>
                    <button
                      type="button"
                      className={`${styles.btnBase} ${iconTheme === "macos" ? styles.btnSelected : styles.btnUnselected}`}
                      onClick={() => setIconTheme?.("macos")}
                    >
                      macOS
                    </button>
                  </div>
                }
              />
            </div>
          </div>

          {/* Theme Color */}
          <div className={`rounded-3xl ${card} p-6 ${!isMac ? "backdrop-blur-xl" : ""}`}>
            <div className={`text-[16px] font-semibold ${titleText}`}>Theme</div>
            <div className={`text-sm mt-1 ${muted}`}>Pick your accent color.</div>
            <div className={`mt-5 h-px ${divider}`} />
            <div className="mt-5">
              <Section id="accent" title="" titleClass="" refObj={accentRef}>
                <AccentPicker
                  isMac={isMac}
                  styles={styles}
                  accent={accent ?? "sky"}
                  setAccent={setAccent}
                  options={ACCENT_OPTIONS}
                />
              </Section>
            </div>
          </div>

          {/* Wallpapers */}
          <div className={`rounded-3xl ${card} p-6 ${!isMac ? "backdrop-blur-xl" : ""}`}>
            <div className={`text-[16px] font-semibold ${titleText}`}>Wallpapers</div>
            <div className={`text-sm mt-1 ${muted}`}>Switch your desktop background.</div>
            <div className={`mt-5 h-px ${divider}`} />
            <div className="mt-5">
              <Section id="wallpapers" title="" titleClass="" refObj={wallpapersRef}>
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
            </div>
          </div>

          {/* Quick actions */}
          <div className={`rounded-3xl ${card} p-6 ${!isMac ? "backdrop-blur-xl" : ""}`}>
            <div className={`text-[16px] font-semibold ${titleText}`}>Quick actions</div>
            <div className={`text-sm mt-1 ${muted}`}>Shortcuts & tools.</div>
            <div className={`mt-5 h-px ${divider}`} />
            <div className="mt-5">
              <Section id="quick" title="" titleClass="" refObj={quickRef}>
                <QuickActionsSection
                  uiTheme={uiTheme}
                  theme={theme}
                  onDownloadResume={downloadResume}
                  onOpenWindow={onOpenWindow}
                  onToggleTheme={() => setTheme?.(theme === "dark" ? "light" : "dark")}
                  notify={notify}
                  onResetLayout={resetLayout}
                />
              </Section>
            </div>
          </div>

          <div className="h-2" />
        </div>
      </div>
    </div>
  );
}