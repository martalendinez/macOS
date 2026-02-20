// src/components/windows/Settings/utils.js
export function downloadResume() {
  const a = document.createElement("a");
  a.href = "/resume.pdf";
  a.download = "Marta_Lendinez_Resume.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export function clampFontScale(v) {
  const n = Number(v);
  if (Number.isNaN(n)) return 1;
  return Math.min(1.25, Math.max(0.85, Number(n.toFixed(2))));
}

export function makeUploadHandler(setWallpaperUrl) {
  return (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setWallpaperUrl?.(URL.createObjectURL(file));
    e.target.value = "";
  };
}