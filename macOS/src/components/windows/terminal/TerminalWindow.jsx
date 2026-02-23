// src/components/windows/terminal/TerminalWindow.jsx
import { useMemo, useRef, useState } from "react";
import GameHost from "./GameHost";

import { COMMANDS, buildWelcomeLines, runTerminalCommand } from "./terminalCommands";
import useTerminalStyles from "./useTerminalStyles";
import renderTerminalLine from "./renderTerminalLine";
import useBlockGameScroll from "./useBlockGameScroll";
import { promptText } from "./utils";

export default function TerminalWindow({
  uiTheme = "glass",
  theme = "light", // ✅ NEW (from appApi)
  onOpenWindow,
  trackTerminalCommand,
  trackGameLaunch,
}) {
  const isMac = uiTheme === "macos";
  const isDark = theme === "dark";

  // ✅ Make styles aware of theme (update useTerminalStyles to accept theme too)
  const styles = useTerminalStyles(isMac, theme);

  const [lines, setLines] = useState(() => buildWelcomeLines());
  const [input, setInput] = useState("");

  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [draftInput, setDraftInput] = useState("");

  const [activeGame, setActiveGame] = useState(null);

  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useBlockGameScroll({ activeGame, scrollRef });

  function appendLines(newLines) {
    const normalized = (newLines ?? []).map((x) => x);
    setLines((prev) => [...prev, ...normalized]);
  }

  function startGame(name) {
    setActiveGame(name);
    trackGameLaunch?.();
    appendLines([{ type: "accent", text: `(launching ${name}... Esc to exit)` }, ""]);
  }

  function exitGame() {
    setActiveGame(null);
    appendLines([{ type: "accent", text: "(exited game)" }, ""]);
    window.setTimeout(() => inputRef.current?.focus(), 0);
  }

  function handleTabAutocomplete() {
    const raw = input;
    const v = raw.trim().toLowerCase();
    if (!v) return;

    const all = Object.keys(COMMANDS);
    const matches = all.filter((c) => c.startsWith(v));

    if (matches.length === 1) {
      setInput(matches[0] + " ");
      return;
    }

    if (matches.length > 1) {
      appendLines([{ type: "prompt", text: promptText(raw) }, { type: "dim", text: matches.join("   ") }, ""]);
      return;
    }

    appendLines([{ type: "warn", text: `(no matches for "${v}")` }, ""]);
  }

  function runCommand(cmdRaw) {
    const raw = cmdRaw ?? "";
    const cmd = raw.trim();
    if (!cmd) return;

    trackTerminalCommand?.();

    setHistory((prev) => [...prev, raw]);
    setHistoryIndex(-1);
    setDraftInput("");

    appendLines([{ type: "prompt", text: promptText(raw) }]);

    runTerminalCommand({
      raw,
      cmd,
      activeGame,
      setLines,
      appendLines,
      onOpenWindow,
      startGame,
      exitGame,
    });
  }

  // ✅ Chrome matches “real Terminal” (macOS) but adapts to theme + glass
  const chrome = useMemo(() => {
    if (isMac) {
      // macOS Terminal: light paper OR dark paper
      return {
        shellBg: isDark ? "bg-[#0b0b0c]" : "bg-[#fbfbfb]",
        shellText: isDark ? "text-white/90" : "text-black",
        border: isDark ? "border-white/10" : "border-black/10",
        headerBg: isDark ? "bg-[#0b0b0c]" : "bg-[#fbfbfb]",
        headerText: isDark ? "text-white/70" : "text-black/70",
        inset: isDark
          ? "shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
          : "shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]",
        caret: isDark ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.7)",
      };
    }

    // glass window style terminal
    return {
      shellBg: isDark ? "bg-black/35 backdrop-blur-xl" : "bg-white/10 backdrop-blur-xl",
      shellText: "text-white/90",
      border: isDark ? "border-white/10" : "border-white/12",
      headerBg: isDark ? "bg-black/25" : "bg-white/8",
      headerText: isDark ? "text-white/70" : "text-white/75",
      inset: "",
      caret: "rgba(255,255,255,0.75)",
    };
  }, [isMac, isDark]);

  const inputTextClass = isMac ? (isDark ? "text-white/90" : "text-black") : "text-white/90";

  return (
    <div className={`h-full flex flex-col ${chrome.shellBg} ${chrome.shellText}`}>
      {/* Optional header bar */}
      <div className={`px-4 py-2 border-b ${chrome.border} ${chrome.headerBg}`}>
        <div className={`text-[13px] font-semibold ${chrome.headerText}`}>terminal — zsh</div>
      </div>

      {/* Terminal canvas */}
      <div
        ref={scrollRef}
        className={[
          "flex-1",
          "px-4 py-3",
          "font-mono text-[14px] leading-[1.45]",
          chrome.inset,
          activeGame ? "overflow-hidden" : "overflow-auto",
        ].join(" ")}
        tabIndex={0}
        onMouseDown={() => {
          if (!activeGame) inputRef.current?.focus();
        }}
      >
        {lines.map((line, i) => renderTerminalLine({ line, i, styles }))}

        {activeGame ? (
          <div className="mt-3">
            <div className={`text-[12px] ${styles.dim}`}>
              Game controls are active. Press{" "}
              <span className="font-semibold" style={{ color: "hsl(var(--accent))" }}>
                Esc
              </span>{" "}
              to exit.
            </div>
            <div className="mt-2">
              <GameHost game={activeGame} uiTheme={uiTheme} onExit={exitGame} />
            </div>
          </div>
        ) : (
          <div className="mt-2 flex items-center gap-2">
            {/* Prompt */}
            <span className="select-none whitespace-nowrap" style={{ color: "hsl(var(--accent))" }}>
              marta@portfolio ~ %
            </span>

            <input
              ref={inputRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setHistoryIndex(-1);
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowUp") {
                  e.preventDefault();
                  if (history.length === 0) return;

                  if (historyIndex === -1) setDraftInput(input);

                  const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);

                  setHistoryIndex(nextIndex);
                  setInput(history[nextIndex]);
                  return;
                }

                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  if (history.length === 0) return;
                  if (historyIndex === -1) return;

                  const nextIndex = historyIndex + 1;

                  if (nextIndex >= history.length) {
                    setHistoryIndex(-1);
                    setInput(draftInput);
                  } else {
                    setHistoryIndex(nextIndex);
                    setInput(history[nextIndex]);
                  }
                  return;
                }

                if (e.key === "Enter") {
                  runCommand(input);
                  setInput("");
                  window.setTimeout(() => {
                    const el = scrollRef.current;
                    if (el) el.scrollTop = el.scrollHeight;
                  }, 0);
                  return;
                }

                if (e.key === "Tab") {
                  e.preventDefault();
                  handleTabAutocomplete();
                  return;
                }

                if (e.key === "Escape") {
                  e.preventDefault();
                  setInput("");
                  return;
                }
              }}
              className={`flex-1 bg-transparent outline-none border-none ${inputTextClass}`}
              placeholder="" // real terminal has no placeholder
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
            />

            {/* Caret */}
            <span
              aria-hidden
              className="w-[1px] h-[1.1em]"
              style={{
                background: chrome.caret,
                animation: "termBlink 1s steps(1) infinite",
              }}
            />
          </div>
        )}

        <style>{`
          @keyframes termBlink {
            0%, 49% { opacity: 1; }
            50%, 100% { opacity: 0; }
          }
        `}</style>
      </div>
    </div>
  );
}