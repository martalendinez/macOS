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
  const a = (artist || "Unknown").split(",")[0].trim();
  return a ? `${a}` : "—";
}

function fallbackDate(idx) {
  const base = new Date("2024-08-01T00:00:00Z");
  base.setDate(base.getDate() + idx * 7);
  return base.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function mosaicCovers(tracks) {
  return (tracks ?? []).slice(0, 4).map((x) => x.cover).filter(Boolean);
}

export default function MusicWindow({ uiTheme = "glass", glassContrast = "light" }) {
  const t = getTokens(uiTheme, glassContrast);

  // ✅ show ALL playlists (myPicks) in sidebar
  const [activePlaylistKey, setActivePlaylistKey] = useState(myPicks[0]?.key ?? "locked-in");
  const playlist = myPicks.find((p) => p.key === activePlaylistKey) ?? myPicks[0];

  // selected track highlight (UI only)
  const [activeIdx, setActiveIdx] = useState(0);

  const tracks = playlist?.tracks ?? [];
  const activeTrack = tracks[activeIdx] ?? tracks[0];

  const styles = useMemo(() => {
    // Dark green Spotify-ish palette (not fully black)
    // - base: deep green/teal
    // - surfaces: slightly lighter green overlays
    return {
      // WIDER shell (so it feels more like the real desktop layout)
      // You can increase/decrease these safely.
      shellMax: "max-w-[1220px]",
      shellW: "w-full",

      // app shell
      shell: "bg-[#071613]", // deep green-black
      shellBorder: "border-white/10",

      // left sidebar
      sideBg: "bg-[#06110F]", // slightly darker
      sideBorder: "border-white/10",
      sideText: "text-white/75",
      sideTextStrong: "text-white",

      // topbar
      topbarBg: "bg-[#071613]/75 backdrop-blur-xl",
      inputBg: "bg-white/10",
      inputBorder: "border-white/10",
      inputText: "text-white/90",
      inputPlaceholder: "placeholder:text-white/45",

      // content
      contentBg: "bg-[#071613]",
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
      pill: "bg-white/10 text-white border-white/10",
    };
  }, []);

  const headerGradient = useMemo(() => {
    // Green gradient like Spotify playlist header, but darker + classy
    return {
      background:
        "linear-gradient(90deg, rgba(12,74,54,0.95) 0%, rgba(7,22,19,0.98) 70%)",
    };
  }, []);

  const playlistMosaic = mosaicCovers(tracks);

  return (
    <div className="h-full w-full flex justify-center">
      {/* ✅ Wider window shell */}
      <div
        className={[
          "h-full rounded-2xl overflow-hidden border",
          styles.shellBorder,
          styles.shell,
          styles.shellW,
          styles.shellMax,
        ].join(" ")}
      >
        <div className="h-full grid grid-cols-[280px_1fr]">
          {/* LEFT SIDEBAR */}
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

            {/* Library header */}
            <div className="flex items-center justify-between">
              <div className={`${styles.sideText} text-xs font-semibold tracking-wide`}>YOUR LIBRARY</div>
              <button type="button" className={`rounded-lg px-2 py-1 ${styles.rowHover} ${styles.sideText}`} title="Add">
                +
              </button>
            </div>

            {/* ✅ All playlists */}
            <div className="mt-3 space-y-2">
              {myPicks.map((p) => {
                const isActive = p.key === activePlaylistKey;
                const covers = mosaicCovers(p.tracks);

                return (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => {
                      setActivePlaylistKey(p.key);
                      setActiveIdx(0);
                    }}
                    className={[
                      "w-full text-left rounded-xl p-3 border transition",
                      "border-white/10",
                      styles.rowHover,
                      isActive ? "bg-white/10" : "bg-white/0",
                    ].join(" ")}
                    title={p.title}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/10 bg-white/5 shrink-0">
                        {covers.length ? (
                          <div className="grid grid-cols-2 grid-rows-2 w-full h-full">
                            {Array.from({ length: 4 }).map((_, i) => (
                              <div key={i} className="w-full h-full bg-black/30">
                                {covers[i] ? (
                                  <img src={covers[i]} alt="" className="w-full h-full object-cover" loading="lazy" />
                                ) : null}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/50 text-sm">♪</div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="text-white text-sm font-semibold truncate">{p.title}</div>
                        <div className="text-white/60 text-xs truncate">{p.subtitle}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* MAIN AREA */}
          <main className={`h-full overflow-hidden ${styles.contentBg}`}>
            {/* TOP BAR */}
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

                {/* search input (visual only) */}
                <div className="flex-1 flex items-center">
                  <div
                    className={`w-full max-w-xl flex items-center gap-2 rounded-full px-4 py-2 ${styles.inputBg} border ${styles.inputBorder}`}
                  >
                    <span className="text-white/70">⌕</span>
                    <input
                      className={`w-full bg-transparent outline-none text-sm ${styles.inputText} ${styles.inputPlaceholder}`}
                      placeholder="What do you want to play?"
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
              {/* HEADER (gradient + huge title) */}
              <div className="relative">
                <div className="px-6 pt-8 pb-6" style={headerGradient}>
                  <div className="flex items-end gap-6">
                    {/* Cover mosaic */}
                    <div className="w-44 h-44 rounded-md overflow-hidden shadow-2xl border border-white/10 bg-black/30 shrink-0">
                      {playlistMosaic.length ? (
                        <div className="grid grid-cols-2 grid-rows-2 w-full h-full">
                          {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="w-full h-full bg-black/30">
                              {playlistMosaic[i] ? (
                                <img
                                  src={playlistMosaic[i]}
                                  alt=""
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
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
                        <span className="text-white/70">{tracks.length} songs</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ACTION ROW */}
                <div className="px-6 py-4 flex items-center gap-3 bg-[#06110F]/85 border-b border-white/10">
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
                    <span className={`text-xs px-3 py-2 rounded-full border ${styles.pill}`}>{playlist?.subtitle}</span>
                  </div>
                </div>
              </div>

              {/* TABLE */}
              <div className="px-6 py-3">
                <div className="grid grid-cols-[48px_1.6fr_1fr_160px_80px] items-center gap-3 px-3 py-2 text-xs text-white/50">
                  <div>#</div>
                  <div>Title</div>
                  <div className="hidden md:block">Album</div>
                  <div className="hidden lg:block">Date added</div>
                  <div className="text-right">🕒</div>
                </div>

                <div className="h-px bg-white/10" />

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
                        <div className="text-white/50 text-sm">
                          <span className="group-hover:hidden">{idx + 1}</span>
                          <span className="hidden group-hover:inline text-white/90">▶</span>
                        </div>

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

                        <div className="hidden md:block text-white/60 text-sm truncate">{album}</div>
                        <div className="hidden lg:block text-white/60 text-sm truncate">{dateAdded}</div>
                        <div className="text-right text-white/60 text-sm">{duration}</div>
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="h-10" />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}