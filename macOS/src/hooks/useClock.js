// src/hooks/useClock.js
import { useEffect, useMemo, useState } from "react";

export default function useClock({
  timeZone = "Europe/Stockholm",
  intervalMs = 30_000,
} = {}) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  const currentTime = useMemo(() => {
    return now.toLocaleString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone,
    });
  }, [now, timeZone]);

  return currentTime;
}