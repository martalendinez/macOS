// src/components/windows/Settings/components/WallpaperSection.jsx
import WallpaperRow from "./WallpaperRow";

export default function WallpaperSection({
  isMac,
  styles,
  uiTheme,
  onUpload,
  onReset,
  macWallpapers,
  glassWallpapers,
  isSelected,
  onPick,
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <label className={`${styles.btnBase} ${styles.btnUnselected} cursor-pointer`}>
          Upload image
          <input type="file" accept="image/*" className="hidden" onChange={onUpload} />
        </label>

        <button type="button" onClick={onReset} className={`${styles.btnBase} ${styles.btnUnselected}`}>
          Reset
        </button>
      </div>

      <WallpaperRow
        title="macOS wallpapers"
        textClass={styles.textMain}
        wallpapers={macWallpapers}
        onPick={onPick}
        isSelected={isSelected}
        uiTheme={uiTheme}
      />

      <div className="mt-6" />

      <WallpaperRow
        title="Glass wallpapers"
        textClass={styles.textMain}
        wallpapers={glassWallpapers}
        onPick={onPick}
        isSelected={isSelected}
        uiTheme={uiTheme}
      />
    </div>
  );
}