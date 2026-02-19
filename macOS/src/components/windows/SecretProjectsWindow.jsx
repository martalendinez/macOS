// src/components/windows/SecretProjectsWindow.jsx
import { useMemo, useState } from "react";
import { motion } from "framer-motion";

export default function SecretProjectsWindow({ uiTheme = "glass", onOpenWindow }) {
  const isMac = uiTheme === "macos";
  const [activeTag, setActiveTag] = useState("All");

  const projects = useMemo(
    () => [
      {
        id: "behindTheButton", // ✅ windowId we will open
        title: "Behind the Button",
        subtitle: "Interactive micro-lessons that teach privacy & consent through real app moments",
        tags: ["WIP", "Concept", "UX", "Education", "Privacy"],
        overview: [
          "2–4 min micro-lessons based on familiar moments (cookies, permissions, sign-in).",
          "Playback after each click: what data was requested, who gets it, and why.",
          "Plain-language policy viewer with risk level + reasoning.",
        ],
      },
      // later you can add more secret projects here:
      // { id:"myOtherSecret", title:"...", ... }
    ],
    []
  );

  const allTags = useMemo(() => {
    const set = new Set(["All"]);
    projects.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [projects]);

  const filtered = useMemo(() => {
    if (activeTag === "All") return projects;
    return projects.filter((p) => p.tags.includes(activeTag));
  }, [projects, activeTag]);

  const cardClass = isMac
    ? "bg-white/80 border border-black/10"
    : "bg-black/40 border border-white/15 backdrop-blur-xl";

  const chipClass = isMac
    ? "bg-white text-black/80 border border-black/10 hover:bg-[hsl(var(--accent)/0.12)] hover:border-[hsl(var(--accent)/0.35)] transition"
    : "bg-white/10 text-white/90 border border-white/15";

  const textMain = isMac ? "text-black/90" : "text-white/95";
  const textSub = isMac ? "text-black/60" : "text-white/70";

  const btnClass = isMac
    ? "bg-white text-black/80 border border-black/10 hover:bg-[hsl(var(--accent)/0.12)] hover:border-[hsl(var(--accent)/0.35)] hover:text-[hsl(var(--accent))] transition"
    : "bg-white/10 hover:bg-white/15 text-white/90 border border-white/15";

  return (
    <div className={`h-full w-full ${isMac ? "bg-transparent" : ""}`}>
      <div className="h-full overflow-y-auto p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className={`text-2xl font-semibold ${textMain}`}>
              Secret Projects{" "}
              <span className={`${textSub} text-sm align-middle`}>(work in progress)</span>
            </div>

            <div className={`mt-1 text-sm ${textSub}`}>
              This is a <span className="font-medium">WIP vault</span> — unfinished concepts and
              “to-do next” ideas. Open any card to see the full draft in its own window.
            </div>

            {!isMac && (
              <div className="mt-3 rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs">
                <span style={{ color: "hsl(var(--accent))" }}>STATUS</span>{" "}
                <span className="text-white/70">WIP · prototypes pending · research queued</span>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 justify-end">
            {allTags.map((tag) => {
              const active = tag === activeTag;
              return (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm transition-all ${
                    active
                      ? isMac
                        ? "bg-[hsl(var(--accent)/0.12)] text-[hsl(var(--accent))] border border-[hsl(var(--accent)/0.35)]"
                        : "bg-white/20 text-white"
                      : chipClass
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map((p) => (
            <motion.div
              key={p.id}
              className={`rounded-2xl p-5 shadow-sm ${cardClass}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className={`text-lg font-semibold ${textMain}`}>{p.title}</div>
                  <div className={`mt-1 text-sm ${textSub}`}>{p.subtitle}</div>
                </div>

                <div className="flex flex-wrap gap-2 justify-end">
                  {p.tags.slice(0, 3).map((t) => (
                    <span key={t} className={`px-2 py-[3px] rounded-full text-xs ${chipClass}`}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <ul className={`mt-4 space-y-2 text-sm ${textMain}`}>
                {p.overview.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className={`${textSub}`}>•</span>
                    <span className={`${isMac ? "text-black/80" : "text-white/85"}`}>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-center gap-2">
                <button
                  onClick={() => onOpenWindow?.(p.id)}
                  className={`px-3 py-2 rounded-xl text-sm transition-all ${btnClass}`}
                >
                  Open
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="h-6" />
      </div>
    </div>
  );
}
