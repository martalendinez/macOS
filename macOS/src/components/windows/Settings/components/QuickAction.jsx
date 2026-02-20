// src/components/windows/Settings/components/QuickAction.jsx
export default function QuickAction({ uiTheme, label, icon, onClick }) {
  const isMac = uiTheme === "macos";

  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between rounded-xl px-4 py-3 transition cursor-pointer ${
        isMac ? "bg-white border border-black/10 hover:bg-black/5" : "bg-white/6 border border-white/10 hover:bg-white/10"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isMac ? "bg-black/5 text-black/70" : "bg-white/10 text-white/85"}`}>
          {icon}
        </div>
        <span className={`text-sm font-medium ${isMac ? "text-black/80" : "text-white/90"}`}>{label}</span>
      </div>
      <span className={`${isMac ? "text-black/30" : "text-white/40"}`}>›</span>
    </div>
  );
}