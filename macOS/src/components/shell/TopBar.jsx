// src/components/shell/TopBar.jsx
import { motion } from "framer-motion";

export default function TopBar({
  loaded,
  theme,
  setTheme,
  onOpenSettings,
  notifOpen,
  setNotifOpen,
  unreadCount = 0,
  currentTime,
  moonIcon,
  gearIcon,
  notificationIcon,
}) {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-10 bg-white/10 backdrop-blur-md flex items-center justify-end px-6 text-sm text-white shadow-sm"
      initial={{ opacity: 0, y: -12 }}
      animate={loaded ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-3">
        {/* Theme toggle */}
        <div
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="w-7 h-7 flex items-center justify-center rounded-[8px] transition-all duration-150 hover:bg-white/20 hover:scale-105 cursor-pointer"
          title="Toggle wallpaper theme"
        >
          <img src={moonIcon} alt="Toggle wallpaper" className="w-4 h-4" />
        </div>

        {/* Settings */}
        <div
          onClick={onOpenSettings}
          className="w-7 h-7 flex items-center justify-center rounded-[8px] transition-all duration-150 hover:bg-white/20 hover:scale-105 cursor-pointer"
          title="Settings"
        >
          <img src={gearIcon} alt="Settings" className="w-4 h-4" />
        </div>

        {/* Notifications */}
        <div
          onClick={() => setNotifOpen((v) => !v)}
          className="relative w-7 h-7 flex items-center justify-center rounded-[8px] transition-all duration-150 hover:bg-white/20 hover:scale-105 cursor-pointer"
          title="Notifications"
        >
          <img src={notificationIcon} alt="Notifications" className="w-4 h-4" />

          {!!unreadCount && (
            <div
              className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 rounded-full text-[10px] flex items-center justify-center"
              style={{ backgroundColor: "hsl(var(--accent))", color: "white" }}
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </div>
          )}
        </div>

        {/* Clock */}
        <span>{currentTime}</span>
      </div>
    </motion.div>
  );
}