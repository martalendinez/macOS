import { useEffect, useMemo, useRef, useState } from "react";

export default function SnakeGame({ uiTheme = "glass", onExit }) {
  const isMac = uiTheme === "macos";

  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const lastRef = useRef(0);
  const dirRef = useRef({ x: 1, y: 0 });
  const queuedRef = useRef(null);

  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("running"); // running | dead

  const cfg = useMemo(() => {
    return {
      size: 420,
      cell: 20,
      tickMs: 95,
      bg: isMac ? "#f5f5f2" : "rgba(0,0,0,0.25)",
      fg: isMac ? "rgba(0,0,0,0.75)" : "rgba(255,255,255,0.9)",
      dim: isMac ? "rgba(0,0,0,0.18)" : "rgba(255,255,255,0.15)",
    };
  }, [isMac]);

  const stateRef = useRef({
    snake: [{ x: 8, y: 10 }, { x: 7, y: 10 }, { x: 6, y: 10 }],
    food: { x: 14, y: 10 },
  });

  function randomEmptyCell() {
    const cols = cfg.size / cfg.cell;
    const rows = cfg.size / cfg.cell;
    const occupied = new Set(stateRef.current.snake.map((p) => `${p.x},${p.y}`));

    for (let i = 0; i < 999; i++) {
      const x = Math.floor(Math.random() * cols);
      const y = Math.floor(Math.random() * rows);
      const key = `${x},${y}`;
      if (!occupied.has(key)) return { x, y };
    }
    return { x: 1, y: 1 };
  }

  function reset() {
    stateRef.current = {
      snake: [{ x: 8, y: 10 }, { x: 7, y: 10 }, { x: 6, y: 10 }],
      food: { x: 14, y: 10 },
    };
    dirRef.current = { x: 1, y: 0 };
    queuedRef.current = null;
    setScore(0);
    setStatus("running");
  }

  function step() {
    if (status !== "running") return;

    if (queuedRef.current) {
      dirRef.current = queuedRef.current;
      queuedRef.current = null;
    }

    const cols = cfg.size / cfg.cell;
    const rows = cfg.size / cfg.cell;

    const snake = stateRef.current.snake;
    const head = snake[0];
    const dir = dirRef.current;

    const next = { x: head.x + dir.x, y: head.y + dir.y };

    // wall collision
    if (next.x < 0 || next.y < 0 || next.x >= cols || next.y >= rows) {
      setStatus("dead");
      return;
    }

    // self collision (allow moving into tail only if tail moves away; easiest: check after pop when not eating)
    const eating = next.x === stateRef.current.food.x && next.y === stateRef.current.food.y;

    const nextSnake = [next, ...snake];
    if (!eating) nextSnake.pop();

    const setKeys = new Set(nextSnake.map((p) => `${p.x},${p.y}`));
    if (setKeys.size !== nextSnake.length) {
      setStatus("dead");
      return;
    }

    stateRef.current.snake = nextSnake;

    if (eating) {
      setScore((s) => s + 1);
      stateRef.current.food = randomEmptyCell();
    }
  }

  function draw() {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");

    // background
    ctx.clearRect(0, 0, cfg.size, cfg.size);
    // subtle grid
    ctx.fillStyle = cfg.bg;
    ctx.fillRect(0, 0, cfg.size, cfg.size);

    ctx.strokeStyle = cfg.dim;
    ctx.lineWidth = 1;
    for (let x = 0; x <= cfg.size; x += cfg.cell) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, cfg.size);
      ctx.stroke();
    }
    for (let y = 0; y <= cfg.size; y += cfg.cell) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(cfg.size, y);
      ctx.stroke();
    }

    // food
    const { food, snake } = stateRef.current;
    ctx.fillStyle = isMac ? "rgba(220, 50, 50, 0.9)" : "rgba(255, 110, 110, 0.95)";
    ctx.fillRect(food.x * cfg.cell + 3, food.y * cfg.cell + 3, cfg.cell - 6, cfg.cell - 6);

    // snake
    ctx.fillStyle = cfg.fg;
    snake.forEach((p, i) => {
      const pad = i === 0 ? 2 : 4;
      ctx.fillRect(p.x * cfg.cell + pad, p.y * cfg.cell + pad, cfg.cell - pad * 2, cfg.cell - pad * 2);
    });

    if (status === "dead") {
      ctx.fillStyle = isMac ? "rgba(0,0,0,0.65)" : "rgba(255,255,255,0.7)";
      ctx.font = "bold 18px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
      ctx.textAlign = "center";
      ctx.fillText("Game over — press R to restart", cfg.size / 2, cfg.size / 2);
    }
  }

  function loop(ts) {
    if (!lastRef.current) lastRef.current = ts;
    const delta = ts - lastRef.current;

    if (delta >= cfg.tickMs) {
      lastRef.current = ts;
      step();
      draw();
    } else {
      draw();
    }

    rafRef.current = requestAnimationFrame(loop);
  }

  function queueDir(next) {
    const cur = dirRef.current;
    // disallow reversing
    if (cur.x + next.x === 0 && cur.y + next.y === 0) return;
    queuedRef.current = next;
  }

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    c.width = cfg.size;
    c.height = cfg.size;
    c.tabIndex = 0;
    c.focus();

    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onExit?.();
        return;
      }
      if (e.key === "ArrowUp") queueDir({ x: 0, y: -1 });
      if (e.key === "ArrowDown") queueDir({ x: 0, y: 1 });
      if (e.key === "ArrowLeft") queueDir({ x: -1, y: 0 });
      if (e.key === "ArrowRight") queueDir({ x: 1, y: 0 });

      if (e.key.toLowerCase() === "r") reset();
    };

    c.addEventListener("keydown", onKey);

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      c.removeEventListener("keydown", onKey);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cfg.size, cfg.tickMs, status]);

  return (
    <div>
      <div className={`mb-2 text-xs ${isMac ? "text-black/60" : "text-white/60"}`}>
        Arrow keys to move • R to restart • Score: <span className="font-semibold">{score}</span>
      </div>
      <canvas
        ref={canvasRef}
        className={`w-full max-w-[420px] rounded-lg outline-none ${isMac ? "border border-black/10" : "border border-white/10"}`}
      />
    </div>
  );
}
