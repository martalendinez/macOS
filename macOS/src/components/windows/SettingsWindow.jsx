export default function SettingsWindow() {
  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <div className="w-64 border-r border-white/10 bg-white/5 p-4">
        <div className="text-white/70 text-xs mb-3">Settings</div>

        <div className="space-y-2">
          {[
            "General",
            "Appearance",
            "Desktop & Dock",
            "Wallpaper",
            "Notifications",
            "Privacy & Security",
          ].map((item) => (
            <div
              key={item}
              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition text-white/90 text-sm cursor-pointer"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 p-6">
        <div className="text-white text-xl font-semibold mb-4">General</div>

        <div className="grid grid-cols-2 gap-4">
          {[
            "About",
            "Software Update",
            "Storage",
            "AirDrop & Handoff",
            "Login Items",
            "Language & Region",
            "Date & Time",
            "Sharing",
          ].map((row) => (
            <div
              key={row}
              className="rounded-2xl bg-white/6 border border-white/10 p-4 text-white/90 text-sm hover:bg-white/10 transition cursor-pointer"
            >
              {row}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
