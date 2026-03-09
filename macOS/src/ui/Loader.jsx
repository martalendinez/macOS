// src/components/ui/Loader.jsx
export default function Loader({
  size = 22,
  label = "Loading",
  fullHeight = true,
  glass = true,
}) {
  const lines = Array.from({ length: 12 });

  return (
    <div
      className={[
        "w-full flex items-center justify-center pointer-events-none",
        fullHeight ? "h-full" : "",
      ].join(" ")}
      aria-label={label}
      role="status"
    >
      <div
        className={[
          "flex items-center justify-center rounded-2xl",
          glass ? "backdrop-blur-md bg-white/10 dark:bg-black/20 shadow-lg" : "",
        ].join(" ")}
        style={{
          width: 56,
          height: 56,
        }}
      >
        <div
          className="relative"
          style={{
            width: size,
            height: size,
          }}
        >
          {lines.map((_, i) => {
            const angle = i * 30;
            const opacity = (i + 1) / 12;

            return (
              <span
                key={i}
                className="absolute left-1/2 top-1/2 block animate-[macosSpinner_1s_linear_infinite]"
                style={{
                  width: 2.5,
                  height: size * 0.28,
                  marginLeft: -1.25,
                  marginTop: -(size * 0.5),
                  borderRadius: 999,
                  background: "currentColor",
                  opacity,
                  transform: `rotate(${angle}deg) translateY(${size * -0.32}px)`,
                  animationDelay: `${i * 0.083}s`,
                }}
              />
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes macosSpinner {
          0% { opacity: 1; }
          100% { opacity: 0.18; }
        }
      `}</style>
    </div>
  );
}