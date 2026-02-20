// src/hooks/useNotifications.js
import { useMemo, useState } from "react";

function makeTimeLabel(d = new Date()) {
  return d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

export default function useNotifications() {
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [toasts, setToasts] = useState([]);

  function notify({ title, message = "", toast = true } = {}) {
    const id = `${Date.now()}_${Math.random().toString(16).slice(2)}`;
    const item = {
      id,
      title: title || "Notification",
      message,
      createdAt: Date.now(),
      timeLabel: makeTimeLabel(),
      read: false,
    };

    setNotifications((prev) => [item, ...prev]);

    if (toast) {
      setToasts((prev) => [item, ...prev]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3200);
    }

    return id;
  }

  function notifyOnce(key, payload) {
    const storageKey = `notif_once:${key}`;
    if (localStorage.getItem(storageKey)) return;
    notify(payload);
    localStorage.setItem(storageKey, "1");
  }

  function unlockAchievement(key, title, message = "") {
    const storageKey = `ach:${key}`;
    if (localStorage.getItem(storageKey)) return;

    notify({
      title: title || "Achievement unlocked",
      message,
      toast: true,
    });

    localStorage.setItem(storageKey, "1");
  }

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  function dismissToast(id) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  function clearAllNotifications() {
    setNotifications([]);
    setToasts([]);
  }

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function removeOneNotification(id) {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  return {
    notifOpen,
    setNotifOpen,
    notifications,
    toasts,
    unreadCount,
    notify,
    notifyOnce,
    unlockAchievement,
    dismissToast,
    clearAllNotifications,
    markAllRead,
    removeOneNotification,
  };
}