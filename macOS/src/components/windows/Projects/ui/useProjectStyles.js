import { useMemo } from "react";

/**
 * variant:
 * - "projects": normal projects window (lighter glass cards)
 * - "secret": hacker vault (darker glass cards)
 */
export default function useProjectStyles(uiTheme, variant = "projects") {
  const isMac = uiTheme === "macos";

  return useMemo(() => {
    const isSecret = variant === "secret";

    const cardClass = isMac
      ? "bg-white/80 border border-black/10"
      : isSecret
      ? "bg-black/40 border border-white/15 backdrop-blur-xl"
      : "bg-white/10 border border-white/15 backdrop-blur-xl";

    const chipClass = isMac
      ? "bg-white text-black/80 border border-black/10 hover:bg-[hsl(var(--accent)/0.12)] hover:border-[hsl(var(--accent)/0.35)] transition"
      : "bg-white/10 text-white/90 border border-white/15";

    const textMain = isMac ? "text-black/90" : "text-white/95";
    const textSub = isMac ? "text-black/60" : "text-white/70";

    const linkBtnClass = isMac
      ? "bg-white text-black/80 border border-black/10 hover:bg-[hsl(var(--accent)/0.12)] hover:border-[hsl(var(--accent)/0.35)] hover:text-[hsl(var(--accent))] transition"
      : "bg-white/10 hover:bg-white/15 text-white/90 border border-white/15";

    const activeTagClass = isMac
      ? "bg-[hsl(var(--accent)/0.12)] text-[hsl(var(--accent))] border border-[hsl(var(--accent)/0.35)]"
      : "bg-white/20 text-white";

    return { isMac, cardClass, chipClass, textMain, textSub, linkBtnClass, activeTagClass };
  }, [uiTheme, variant]);
}