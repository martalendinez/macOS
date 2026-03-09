// src/components/windows/Fun/data/funApps.js

// -----------------------------
// GLASS icons
// -----------------------------
import glassTerminal from "/icons/glass/terminalGlass.png";
import glassMaps from "/icons/glass/mapsGlass.png";
import glassMusic from "/icons/glass/MediaGlass.png";

// -----------------------------
// MAC icons
// -----------------------------
import macTerminal from "/icons/mac/terminalMac.webp";
import macMaps from "/icons/mac/mapsMac.png";
import macMusic from "/icons/mac/musicMap.svg";

const ICONS = {
  glass: {
    terminal: glassTerminal,
    map: glassMaps,
    music: glassMusic,
  },
  macos: {
    terminal: macTerminal,
    map: macMaps,
    music: macMusic,
  },
};

function pickIcon(iconTheme, iconKey) {
  const normalized = String(iconTheme || "").toLowerCase();
  const themeKey = normalized === "macos" ? "macos" : "glass";
  return ICONS[themeKey]?.[iconKey] ?? ICONS.glass?.[iconKey] ?? null;
}

/**
 * @param {(key: string) => void} onOpenWindow
 * @param {"glass"|"macos"} iconTheme
 */
export function getFunApps(onOpenWindow, iconTheme = "glass") {
  return [
    {
      key: "terminal",
      title: "Terminal",
      subtitle: "Play games & commands",
      group: "tools",
      icon: pickIcon(iconTheme, "terminal"),
      onClick: () => onOpenWindow?.("terminal"),
    },
    {
      key: "map",
      title: "Maps",
      subtitle: "The places I've called home",
      group: "tools",
      icon: pickIcon(iconTheme, "map"),
      onClick: () => onOpenWindow?.("map"),
    },
    {
      key: "music",
      title: "Music",
      subtitle: "My favorite tunes",
      group: "tools",
      icon: pickIcon(iconTheme, "music"),
      onClick: () => onOpenWindow?.("music"),
    },
  ];
}