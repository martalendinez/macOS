export default function VideosWindow({ uiTheme }) {
  const isMac = uiTheme === "macos";

  return (
    <div
      className={`h-full flex items-center justify-center ${
        isMac ? "text-black/70" : "text-white/80"
      }`}
    >
      <div className="text-center space-y-2">
        <div className="text-2xl">🎬</div>
        <div className="text-sm font-medium">Videos</div>
        <div className="text-xs opacity-70">
          Coming soon
        </div>
      </div>
    </div>
  );
}
