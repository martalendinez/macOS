// src/components/windows/Music/MusicWindow.jsx
import { useMemo, useState } from "react";
import { getTokens } from "../../../ui/themeTokens";
import { myPicks } from "./data/myPicks";
import MiniCover from "./components/MiniCover";

function formatDuration(sec) {
  if (!Number.isFinite(sec)) return "—";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

function fallbackAlbumFromArtist(artist = "") {
  // just to populate the table if you don’t want to add album fields yet
  const a = (artist || "Unknown").split(",")[0].trim();
  return a ? `${a}` : "—";
}

function fallbackDate(idx) {
  // deterministic “date added” placeholders
  const base = new Date("2024-08-01T00:00:00Z");
  base.setDate(base.getDate() + idx * 7);
  return base.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export default function MusicWindow({ uiTheme = "glass", glassContrast = "light" }) {
  const t = getTokens(uiTheme, glassContrast);

  // pick ONE playlist like in Spotify
  const playlist = myPicks.find((p) => p.key === "locked-in") ?? myPicks[0];

  // selected track highlight (pure UI)
  const [activeIdx, setActiveIdx] = useState(0);

  const tracks = playlist?.tracks ?? [];
  const activeTrack = tracks[activeIdx] ?? tracks[0];

  const styles = useMemo(() => {
    // We force “Spotify desktop” look (dark) but keep borders readable in mac theme too.
    const isMac = t.isMac;

    return {
      // app shell
      shell: isMac ? "bg-black/95" : "bg-black/90",
      shellBorder: isMac ? "border-black/20" : "border-white/10",

      // left sidebar
      sideBg: "bg-black/95",
      sideBorder: isMac ? "border-white/10" : "border-white/10",
      sideText: "text-white/80",
      sideTextStrong: "text-white",

      // topbar
      topbarBg: "bg-black/70 backdrop-blur-xl",
      inputBg: "bg-white/10",
      inputBorder: "border-white/10",
      inputText: "text-white/90",
      inputPlaceholder: "placeholder:text-white/50",

      // content
      contentBg: "bg-black/70",
      divider: "bg-white/10",
      sub: "text-white/60",
      faint: "text-white/40",
      strong: "text-white",

      // buttons
      playBtn: "bg-green-500 text-black hover:bg-green-400",
      ghostBtn: "bg-white/0 hover:bg-white/10 text-white/80 border border-white/15",

      // table
      rowHover: "hover:bg-white/10",
      rowSelected: "bg-white/12",
    };
  }, [t.isMac]);

  // playlist cover mosaic (2x2) like Spotify screenshot
  const mosaic = tracks.slice(0, 4).map((x) => x.cover).filter(Boolean);

  return (
    <div className={`h-full w-full ${styles.shell} border ${styles.shellBorder} rounded-2xl overflow-hidden`}>
      <div className="h-full grid grid-cols-[260px_1fr]">
        {/* LEFT SIDEBAR (Spotify nav) */}
        <aside className={`h-full ${styles.sideBg} border-r ${styles.sideBorder} p-4`}>
          {/* Top nav */}
          <div className="space-y-2">
            <button
              type="button"
              className={`w-full flex items-center gap-3 rounded-xl px-3 py-2 ${styles.rowHover} ${styles.sideTextStrong}`}
              title="Home"
            >
              <span className="text-lg">⌂</span>
              <span className="text-sm font-semibold">Home</span>
            </button>
            <button
              type="button"
              className={`w-full flex items-center gap-3 rounded-xl px-3 py-2 ${styles.rowHover} ${styles.sideTextStrong}`}
              title="Search"
            >
              <span className="text-lg">⌕</span>
              <span className="text-sm font-semibold">Search</span>
            </button>
          </div>

          <div className={`my-4 h-px ${styles.divider}`} />

          {/* Library */}
          <div className="flex items-center justify-between">
            <div className={`${styles.sideText} text-xs font-semibold tracking-wide`}>YOUR LIBRARY</div>
            <button type="button" className={`rounded-lg px-2 py-1 ${styles.rowHover} ${styles.sideText}`} title="Add">
              +
            </button>
          </div>

          <div className="mt-3 space-y-2">
            <button
              type="button"
              className={`w-full text-left rounded-xl p-3 border border-white/10 ${styles.rowHover}`}
              title="Playlist"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/10 bg-white/5">
                  {mosaic.length ? (
                    <div className="grid grid-cols-2 grid-rows-2 w-full h-full">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="w-full h-full bg-black/30">
                          {mosaic[i] ? (
                            <img src={mosaic[i]} alt="" className="w-full h-full object-cover" loading="lazy" />
                          ) : null}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/50 text-sm">♪</div>
                  )}
                </div>

                <div className="min-w-0">
                  <div className="text-white text-sm font-semibold truncate">{playlist?.title ?? "Playlist"}</div>
                  <div className="text-white/60 text-xs truncate">
                    Playlist • Marta • {tracks.length} songs
                  </div>
                </div>
              </div>
            </button>
          </div>
        </aside>

        {/* MAIN AREA */}
        <main className={`h-full overflow-hidden ${styles.contentBg}`}>
          {/* TOP BAR (search + icons) */}
          <div className={`sticky top-0 z-20 ${styles.topbarBg} border-b border-white/10`}>
            <div className="px-5 py-3 flex items-center gap-3">
              {/* faux back/forward */}
              <div className="flex items-center gap-2">
                <button type="button" className={`w-9 h-9 rounded-full ${styles.ghostBtn}`} title="Back">
                  ←
                </button>
                <button type="button" className={`w-9 h-9 rounded-full ${styles.ghostBtn}`} title="Forward">
                  →
                </button>
              </div>

              {/* search input */}
              <div className="flex-1 flex items-center">
                <div className={`w-full max-w-xl flex items-center gap-2 rounded-full px-4 py-2 ${styles.inputBg} border ${styles.inputBorder}`}>
                  <span className="text-white/70">⌕</span>
                  <input
                    className={`w-full bg-transparent outline-none text-sm ${styles.inputText} ${styles.inputPlaceholder}`}
                    placeholder="What do you want to play?"
                    // purely visual (no search logic)
                    onChange={() => {}}
                  />
                </div>
              </div>

              {/* right icons */}
              <div className="flex items-center gap-2">
                <button type="button" className={`w-9 h-9 rounded-full ${styles.ghostBtn}`} title="Notifications">
                  🔔
                </button>
                <button type="button" className={`w-9 h-9 rounded-full ${styles.ghostBtn}`} title="Profile">
                  M
                </button>
              </div>
            </div>
          </div>

          {/* SCROLL AREA */}
          <div className="h-[calc(100%-64px)] overflow-auto">
            {/* PLAYLIST HEADER (gradient + huge title) */}
            <div className="relative">
              <div
                className="px-6 pt-8 pb-6"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(14,116,144,0.9) 0%, rgba(2,6,23,0.95) 70%)",
                }}
              >
                <div className="flex items-end gap-6">
                  {/* Cover */}
                  <div className="w-44 h-44 rounded-md overflow-hidden shadow-2xl border border-white/10 bg-black/30 shrink-0">
                    {mosaic.length ? (
                      <div className="grid grid-cols-2 grid-rows-2 w-full h-full">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <div key={i} className="w-full h-full bg-black/30">
                            {mosaic[i] ? (
                              <img src={mosaic[i]} alt="" className="w-full h-full object-cover" loading="lazy" />
                            ) : null}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/50 text-lg">♪</div>
                    )}
                  </div>

                  {/* Meta */}
                  <div className="min-w-0 pb-1">
                    <div className="text-white/90 text-sm font-semibold">Public Playlist</div>
                    <div className="text-white text-6xl font-black tracking-tight truncate mt-2">
                      {playlist?.title ?? "playlist"}
                    </div>

                    <div className="mt-4 text-white/80 text-sm">
                      <span className="font-semibold">martalendi</span>
                      <span className="text-white/60"> • </span>
                      <span className="text-white/70">saved 5 times</span>
                      <span className="text-white/60"> • </span>
                      <span className="text-white/70">{tracks.length} songs</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ACTION ROW (play, shuffle, etc) */}
              <div className="px-6 py-4 flex items-center gap-3 bg-black/85 border-b border-white/10">
                <a
                  href={activeTrack?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-black shadow-lg ${styles.playBtn}`}
                  title="Open selected track in Spotify"
                >
                  ▶
                </a>

                <button type="button" className={`w-10 h-10 rounded-full ${styles.ghostBtn}`} title="Shuffle">
                  ⇄
                </button>
                <button type="button" className={`w-10 h-10 rounded-full ${styles.ghostBtn}`} title="Download">
                  ⬇
                </button>
                <button type="button" className={`w-10 h-10 rounded-full ${styles.ghostBtn}`} title="More">
                  ⋯
                </button>

                <div className="ml-auto flex items-center gap-2">
                  <button type="button" className={`rounded-full px-3 py-2 ${styles.ghostBtn}`} title="Search in playlist">
                    ⌕
                  </button>
                  <button type="button" className={`rounded-full px-3 py-2 ${styles.ghostBtn}`} title="Sort">
                    ☰
                  </button>
                </div>
              </div>
            </div>

            {/* TABLE */}
            <div className="px-6 py-3">
              {/* Header row */}
              <div className="grid grid-cols-[48px_1.6fr_1fr_160px_80px] items-center gap-3 px-3 py-2 text-xs text-white/50">
                <div>#</div>
                <div>Title</div>
                <div className="hidden md:block">Album</div>
                <div className="hidden lg:block">Date added</div>
                <div className="text-right">🕒</div>
              </div>

              <div className="h-px bg-white/10" />

              {/* Track rows */}
              <div className="mt-1">
                {tracks.map((tr, idx) => {
                  const selected = idx === activeIdx;

                  const album = tr.album ?? fallbackAlbumFromArtist(tr.artist);
                  const dateAdded = tr.addedAt ?? fallbackDate(idx);
                  const duration = tr.durationSec != null ? formatDuration(tr.durationSec) : "—";

                  return (
                    <a
                      key={`${tr.title}-${idx}`}
                      href={tr.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => setActiveIdx(idx)}
                      className={[
                        "group grid grid-cols-[48px_1.6fr_1fr_160px_80px] items-center gap-3 px-3 py-2 rounded-md transition",
                        styles.rowHover,
                        selected ? styles.rowSelected : "",
                      ].join(" ")}
                      title="Open in Spotify"
                    >
                      {/* # / play indicator */}
                      <div className="text-white/50 text-sm">
                        <span className="group-hover:hidden">{idx + 1}</span>
                        <span className="hidden group-hover:inline text-white/90">▶</span>
                      </div>

                      {/* Title cell */}
                      <div className="min-w-0 flex items-center gap-3">
                        <MiniCover
                          title={tr.title}
                          cover={tr.cover}
                          cardBorder={"border-white/10"}
                          cardBgSoft={"bg-white/5"}
                          textSub2={"text-white/50"}
                        />
                        <div className="min-w-0">
                          <div className="text-white text-sm font-semibold truncate">{tr.title}</div>
                          <div className="text-white/60 text-xs truncate">{tr.artist}</div>
                        </div>
                      </div>

                      {/* Album */}
                      <div className="hidden md:block text-white/60 text-sm truncate">{album}</div>

                      {/* Date added */}
                      <div className="hidden lg:block text-white/60 text-sm truncate">{dateAdded}</div>

                      {/* Duration */}
                      <div className="text-right text-white/60 text-sm">{duration}</div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Bottom padding like Spotify */}
            <div className="h-10" />
          </div>
        </main>
      </div>
    </div>
  );
}