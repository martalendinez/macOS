// src/ui/themeTokens.js
export function getTokens(uiTheme = "glass", glassContrast = "light") {
  const isMac = uiTheme === "macos";
  const isGlass = uiTheme === "glass";
  const isGlassDarkText = isGlass && glassContrast === "dark";

  const textMain = isMac
    ? "text-black/85"
    : isGlassDarkText
    ? "text-black/90"
    : "text-white/95";

  const textSub = isMac
    ? "text-black/55"
    : isGlassDarkText
    ? "text-black/60"
    : "text-white/70";

  const textBody = isMac
    ? "text-black/70"
    : isGlassDarkText
    ? "text-black/80"
    : "text-white/85";

  const pageCard = isMac
    ? "bg-white border border-black/10"
    : isGlassDarkText
    ? "bg-white/35 border border-black/10 backdrop-blur-xl"
    : "bg-white/10 border border-white/15 backdrop-blur-xl";

  const softCard = isMac
    ? "bg-white border border-black/10"
    : isGlassDarkText
    ? "bg-white/25 border border-black/10"
    : "bg-white/6 border border-white/10";

  const pillClass = isMac
    ? "bg-white text-black/70 border border-black/10"
    : isGlassDarkText
    ? "bg-white/25 text-black/75 border border-black/10"
    : "bg-white/10 text-white/90 border border-white/15";

  const buttonClass = isMac
    ? "bg-white text-black/75 border border-black/10 hover:bg-[hsl(var(--accent)/0.10)] hover:border-[hsl(var(--accent)/0.35)] focus:outline-none focus:ring-4 focus:ring-[hsl(var(--accent)/0.25)]"
    : isGlassDarkText
    ? "bg-white/25 hover:bg-white/35 text-black/80 border border-black/10"
    : "bg-white/10 hover:bg-white/15 text-white/90 border border-white/15";

  const divider = isMac ? "border-black/10" : isGlassDarkText ? "border-black/10" : "border-white/10";

  return {
    isMac,
    isGlass,
    isGlassDarkText,
    textMain,
    textSub,
    textBody,
    pageCard,
    softCard,
    pillClass,
    buttonClass,
    divider,
  };
}
