import { useState } from "react";

export default function useWindowManager() {
  const [openWindows, setOpenWindows] = useState([]); // array of ids
  const [activeWindow, setActiveWindow] = useState(null);
  const [zMap, setZMap] = useState({});
  const [zTop, setZTop] = useState(200);

  const focusWindow = (id) => {
    setActiveWindow(id);
    setZTop((prev) => {
      const next = prev + 1;
      setZMap((m) => ({ ...m, [id]: next }));
      return next;
    });
  };

  const openWindow = (id) => {
    setOpenWindows((prev) => (prev.includes(id) ? prev : [...prev, id]));
    focusWindow(id);
  };

  const closeWindow = (id) => {
    setOpenWindows((prev) => prev.filter((w) => w !== id));
    setZMap((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
    setActiveWindow((prev) => (prev === id ? null : prev));
  };

  return { openWindows, activeWindow, zMap, openWindow, closeWindow, focusWindow };
}
