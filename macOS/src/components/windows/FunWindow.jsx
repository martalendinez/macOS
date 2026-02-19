// src/components/windows/FunWindow.jsx
import { useMemo } from "react";
import { getTokens } from "../../ui/themeTokens";

export default function FunWindow({ uiTheme = "glass", glassContrast = "light", onOpenWindow }) {
  const { isMac, textMain, textSub, textBody, pageCard, softCard, pillClass, buttonClass, divider } =
+    getTokens(uiTheme, glassContrast);

  const styles = useMemo(() => {
    return {
      // text
      textMain: isMac ? "text-black/80" : "text-white/90",
      textStrong: isMac ? "text-black" : "text-white",
      textSub: isMac ? "text-black/60" : "text-white/70",

      // surfaces
      pageBg: isMac ? "bg-transparent" : "",
      tileBg: isMac ? "bg-white" : "bg-white/8 backdrop-blur-xl",
      tileBorder: isMac ? "border-black/10" : "border-white/12",
      divider: isMac ? "bg-black/10" : "bg-white/10",

      // ✅ button uses global accent on hover (macOS)
      pillBtn: isMac
        ? "bg-white border border-black/10 text-black/80 hover:bg-[hsl(var(--accent)/0.10)] hover:border-[hsl(var(--accent)/0.35)]"
        : "bg-white/10 border border-white/12 text-white/90 hover:bg-white/15",

      // tip
      tipBg: isMac ? "bg-white" : "bg-white/8 backdrop-blur-xl",
      tipBorder: isMac ? "border-black/10" : "border-white/12",
    };
  }, [isMac]);

  const apps = useMemo(
    () => [
      {
        key: "music",
        emoji: "🎵",
        title: "Music",
        desc: "Explore my go-to songs and hit play on one.",
        cta: "Open Music",
        onClick: () => onOpenWindow?.("music"),
        // ✅ accent blob (macOS)
       
      },
      {
        key: "map",
        emoji: "🗺️",
        title: "Interactive Map",
        desc: "Explore my little life-map — where I’ve lived and learned.",
        cta: "Open Map",
        onClick: () => onOpenWindow?.("map"),
       
      },
      {
        key: "terminal",
        emoji: "🧑‍💻",
        title: "Terminal",
        desc: "Enter the nerd zone. Code. Explore. Play.",
        cta: "Open Terminal",
        onClick: () => onOpenWindow?.("terminal"),
       
      },
    ],
    [onOpenWindow, isMac]
  );

  return (
    <div className={`h-full flex flex-col ${styles.pageBg} ${styles.textMain}`}>
      {/* Header */}
      <div className="px-6 pt-5 pb-3">
        <div className={`${styles.textStrong} text-lg font-semibold`}>Extras & Fun</div>
        <div className={`${styles.textSub} text-sm mt-1`}>
          Welcome to the playground! This is where the fun little apps live 😊
        </div>
        <div className={`mt-4 h-px ${styles.divider}`} />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-6 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {apps.map((a) => (
            <VisualTile key={a.key} styles={styles} {...a} />
          ))}
        </div>

        <div className={`mt-6 rounded-2xl ${styles.tipBg} border ${styles.tipBorder} p-5`}>
          <div className={`${styles.textStrong} font-semibold`}>💡 Tip</div>
          <div className={`${styles.textSub} text-sm mt-1 leading-relaxed`}>
            You can keep Music open while exploring other windows — it’s designed to feel like a tiny OS!
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- UI bits ---------------- */
function VisualTile({ styles, emoji, title, desc, cta, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        text-left
        rounded-2xl
        border
        p-6
        transition-all
        ${styles.tileBg}
        ${styles.tileBorder}
        hover:-translate-y-[2px]
        hover:shadow-md
        relative overflow-hidden
      `}
    >
     

      {/* Top row */}
      <div className="relative text-3xl">{emoji}</div>

      {/* Title */}
      <div className={`relative mt-4 font-semibold ${styles.textStrong}`}>{title}</div>

      {/* Description */}
      <div className={`relative mt-1 text-sm leading-relaxed ${styles.textSub}`}>{desc}</div>

      {/* Button */}
      <div className="relative mt-6">
        <span
          className={`inline-flex w-fit items-center justify-center rounded-xl px-4 py-2 text-sm transition ${styles.pillBtn}`}
        >
          {cta} <span className="ml-2 opacity-60">↗</span>
        </span>
      </div>
    </button>
  );
}
