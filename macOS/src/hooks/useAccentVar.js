// src/hooks/useAccentVar.js
import { useEffect } from "react";
import { ACCENTS } from "../config/accents";

export default function useAccentVar(accent) {
  useEffect(() => {
    const v = ACCENTS[accent] ?? ACCENTS.emerald;
    document.documentElement.style.setProperty("--accent", v);
  }, [accent]);
}