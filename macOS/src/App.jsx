import moonIcon from './imgs/moon.png';
import gearIcon from './imgs/gear.png';
import notificationIcon from './imgs/notification.png';

export default function App() {
  const currentTime = new Date().toLocaleString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Stockholm",
  });

  return (
    <div
      className="min-h-screen bg-cover bg-center font-sans text-white relative"
      style={{ backgroundImage: "url('./Background.jpg')" }}
    >
      {/* Top Menu Bar — full width like macOS */}
      <div className="fixed top-0 left-0 right-0 z-50 h-10 bg-white/10 backdrop-blur-md flex items-center justify-end px-6 text-sm text-white shadow-sm">
        <div className="flex items-center gap-4">
          <img src={moonIcon} alt="Moon" className="w-5 h-5" />
          <img src={gearIcon} alt="Settings" className="w-5 h-5" />
          <img src={notificationIcon} alt="Notifications" className="w-5 h-5" />
          <span>{currentTime}</span>
        </div>
      </div>
    </div>
  );
}
