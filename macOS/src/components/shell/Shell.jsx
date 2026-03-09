// src/components/shell/Shell.jsx
import { useEffect, useState } from "react";

export default function Shell({
  children,
  fontScale = 1,
  baseTextClass = "",
  wallpaperUrl,
  previewWallpaperUrl,
  loaded = true,
}) {
  const [wallpaperLoaded, setWallpaperLoaded] = useState(false);

  useEffect(() => {
    if (!wallpaperUrl) {
      setWallpaperLoaded(false);
      return;
    }

    setWallpaperLoaded(false);

    const img = new Image();
    img.src = wallpaperUrl;
    img.onload = () => setWallpaperLoaded(true);
  }, [wallpaperUrl]);

  return (
    <div
      className={`relative w-screen h-screen overflow-hidden ${baseTextClass}`}
      style={{ fontSize: `${fontScale}rem` }}
    >
      {/* blurred preview wallpaper */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage: previewWallpaperUrl ? `url(${previewWallpaperUrl})` : "none",
          filter: "blur(22px)",
          transform: "scale(1.06)",
        }}
      />

      {/* soft dark overlay to keep it polished */}
      <div className="absolute inset-0 bg-black/12 pointer-events-none" />

      {/* full wallpaper fades in when loaded */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
          wallpaperLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: wallpaperUrl ? `url(${wallpaperUrl})` : "none",
        }}
      />

      {/* subtle overlay */}
      <div className="absolute inset-0 bg-black/6 pointer-events-none" />

      {/* app content */}
      <div
        className={`relative z-10 w-full h-full transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}