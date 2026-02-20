// src/hooks/useGlassContrast.js
import { useEffect, useMemo, useRef, useState } from "react";

function computeImageLuminance(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return reject(new Error("No canvas context"));

        const w = 80;
        const h = 80;
        canvas.width = w;
        canvas.height = h;

        ctx.drawImage(img, 0, 0, w, h);
        const { data } = ctx.getImageData(0, 0, w, h);

        let sum = 0;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i] / 255;
          const g = data[i + 1] / 255;
          const b = data[i + 2] / 255;
          const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
          sum += lum;
        }

        const avg = sum / (data.length / 4);
        resolve(avg);
      } catch (e) {
        reject(e);
      }
    };

    img.onerror = () => reject(new Error("Wallpaper image failed to load"));
    img.src = src;
  });
}

export default function useGlassContrast({ uiTheme, activeWallpaper } = {}) {
  const [glassContrast, setGlassContrast] = useState("light"); // "light" => white text, "dark" => black text
  const cacheRef = useRef(new Map()); // wallpaper -> contrast

  useEffect(() => {
    let cancelled = false;
    if (uiTheme !== "glass") return;

    const cached = cacheRef.current.get(activeWallpaper);
    if (cached) {
      setGlassContrast(cached);
      return;
    }

    (async () => {
      try {
        const lum = await computeImageLuminance(activeWallpaper);
        const next = lum > 0.62 ? "dark" : "light";
        if (!cancelled) {
          setGlassContrast(next);
          cacheRef.current.set(activeWallpaper, next);
        }
      } catch {
        if (!cancelled) setGlassContrast("light");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [activeWallpaper, uiTheme]);

  const baseTextClass = useMemo(() => {
    return uiTheme === "glass" && glassContrast === "dark" ? "text-black" : "text-white";
  }, [uiTheme, glassContrast]);

  return { glassContrast, baseTextClass };
}