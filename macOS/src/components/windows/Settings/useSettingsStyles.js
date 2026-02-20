// src/components/windows/Settings/useSettingsStyles.js
import { useMemo } from "react";

export default function useSettingsStyles(isMac) {
  return useMemo(() => {
    const textMain = isMac ? "text-black/80" : "text-white/90";
    const textSub = isMac ? "text-black/60" : "text-white/70";

    const sidebarBg = isMac ? "bg-[#efefec]" : "bg-white/5";
    const sidebarBorder = isMac ? "border-black/10" : "border-white/10";

    const mainBg = isMac ? "bg-[#f7f7f4]" : "";
    const cardBg = isMac ? "bg-white" : "bg-white/6";
    const cardBorder = isMac ? "border-black/10" : "border-white/10";

    const btnBase = "px-3 py-2 rounded-xl text-sm transition";
    const btnSelected = isMac ? "bg-black/10 text-black/90" : "bg-white/20 text-white";
    const btnUnselected = isMac
      ? "bg-white text-black/80 border border-black/10 hover:bg-black/5"
      : "bg-white/10 text-white/85 hover:bg-white/15";

    return {
      textMain,
      textSub,
      sidebarBg,
      sidebarBorder,
      mainBg,
      cardBg,
      cardBorder,
      btnBase,
      btnSelected,
      btnUnselected,
    };
  }, [isMac]);
}