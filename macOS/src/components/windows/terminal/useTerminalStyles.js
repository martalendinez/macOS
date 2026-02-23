// src/components/windows/terminal/useTerminalStyles.js
export default function useTerminalStyles(isMac, theme = "light") {
  const isDark = theme === "dark";

  // macOS Terminal is usually light background with black text,
  // but your portfolio wants dark-mode too — we’ll adapt cleanly.
  if (isMac) {
    return {
      bg: isDark ? "bg-[#0b0b0c]" : "bg-[#fafafa]",
      chip: isDark ? "bg-[#0f0f10]" : "bg-white",
      border: isDark ? "border-white/10" : "border-black/10",
      text: isDark ? "text-white/85" : "text-black/85",
      textDim: isDark ? "text-white/50" : "text-black/50",
      accent: "text-[hsl(var(--accent))]",
    };
  }

  // Glass terminal (dark + light)
  return {
    bg: isDark ? "bg-black/35 backdrop-blur-xl" : "bg-white/8 backdrop-blur-xl",
    chip: isDark ? "bg-white/5" : "bg-white/10",
    border: isDark ? "border-white/10" : "border-white/12",
    text: isDark ? "text-white/90" : "text-white/90",
    textDim: isDark ? "text-white/60" : "text-white/60",
    accent: "text-[hsl(var(--accent))]",
  };
}