import SnakeGame from "./games/SnakeGame";
import PongGame from "./games/PongGame";
import TetrisGame from "./games/TetrisGame";

export default function GameHost({ game, uiTheme = "glass", onExit }) {
  const isMac = uiTheme === "macos";

  const frame = isMac
    ? "bg-black/5 border border-black/10"
    : "bg-white/5 border border-white/10";

  const text = isMac ? "text-black/70" : "text-white/70";

  return (
    <div className={`mt-3 rounded-xl p-3 ${frame}`}>
      <div className={`flex items-center justify-between mb-2 ${text}`}>
        <div className="text-xs font-semibold tracking-wide uppercase">
          Playing: {game} • Esc to exit
        </div>
        <button
          onClick={onExit}
          className={`text-xs px-2 py-1 rounded-md ${isMac ? "bg-black/10" : "bg-white/10"}`}
        >
          Exit
        </button>
      </div>

      {game === "snake" && <SnakeGame uiTheme={uiTheme} onExit={onExit} />}
      {game === "pong" && <PongGame uiTheme={uiTheme} onExit={onExit} />}
      {game === "tetris" && <TetrisGame uiTheme={uiTheme} onExit={onExit} />}
    </div>
  );
}
