import { useEffect, useMemo, useRef, useState } from "react";

const SHAPES = {
  I: [[1, 1, 1, 1]],
  O: [
    [1, 1],
    [1, 1],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
  ],
};

const KEYS = Object.keys(SHAPES);

function rotateCW(mat) {
  const h = mat.length;
  const w = mat[0].length;
  const out = Array.from({ length: w }, () => Array(h).fill(0));
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) out[x][h - 1 - y] = mat[y][x];
  return out;
}

export default function TetrisGame({ uiTheme = "glass", onExit }) {
  const isMac = uiTheme === "macos";
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const lastFallRef = useRef(0);

  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("running"); // running | dead

  const cfg = useMemo(() => {
    return {
      cols: 10,
      rows: 18,
      cell: 18,
      w: 10 * 18,
      h: 18 * 18,
      fallMs: 420,
      bg: isMac ? "#f5f5f2" : "rgba(0,0,0,0.25)",
      fg: isMac ? "rgba(0,0,0,0.75)" : "rgba(255,255,255,0.9)",
      dim: isMac ? "rgba(0,0,0,0.18)" : "rgba(255,255,255,0.15)",
    };
  }, [isMac]);

  const stateRef = useRef({
    grid: Array.from({ length: 18 }, () => Array(10).fill(0)),
    piece: null,
  });

  function newPiece() {
    const k = KEYS[Math.floor(Math.random() * KEYS.length)];
    const shape = SHAPES[k].map((row) => row.slice());
    const x = Math.floor(cfg.cols / 2) - Math.ceil(shape[0].length / 2);
    const y = 0;
    return { shape, x, y };
  }

  function collides(grid, piece) {
    const { shape, x, y } = piece;
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[0].length; c++) {
        if (!shape[r][c]) continue;
        const gx = x + c;
        const gy = y + r;
        if (gx < 0 || gx >= cfg.cols || gy < 0 || gy >= cfg.rows) return true;
        if (grid[gy][gx]) return true;
      }
    }
    return false;
  }

  function merge(grid, piece) {
    const out = grid.map((row) => row.slice());
    const { shape, x, y } = piece;
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[0].length; c++) {
        if (!shape[r][c]) continue;
        out[y + r][x + c] = 1;
      }
    }
    return out;
  }

  function clearLines(grid) {
    const kept = grid.filter((row) => row.some((v) => v === 0));
    const cleared = cfg.rows - kept.length;
    while (kept.length < cfg.rows) kept.unshift(Array(cfg.cols).fill(0));
    return { grid: kept, cleared };
  }

  function reset() {
    stateRef.current.grid = Array.from({ length: cfg.rows }, () => Array(cfg.cols).fill(0));
    stateRef.current.piece = newPiece();
    setScore(0);
    setStatus("running");
  }

  function spawnIfNeeded() {
    if (!stateRef.current.piece) {
      stateRef.current.piece = newPiece();
      if (collides(stateRef.current.grid, stateRef.current.piece)) {
        setStatus("dead");
      }
    }
  }

  function hardDrop() {
    if (status !== "running") return;
    const s = stateRef.current;
    if (!s.piece) return;

    let p = { ...s.piece };
    while (!collides(s.grid, { ...p, y: p.y + 1 })) p.y += 1;

    // lock
    s.grid = merge(s.grid, p);
    const { grid: g2, cleared } = clearLines(s.grid);
    s.grid = g2;
    if (cleared) setScore((sc) => sc + cleared * 100);
    s.piece = null;
    spawnIfNeeded();
  }

  function tickFall() {
    if (status !== "running") return;

    const s = stateRef.current;
    spawnIfNeeded();

    const p = s.piece;
    if (!p) return;

    const next = { ...p, y: p.y + 1 };
    if (!collides(s.grid, next)) {
      s.piece = next;
      return;
    }

    // lock piece
    s.grid = merge(s.grid, p);
    const { grid: g2, cleared } = clearLines(s.grid);
    s.grid = g2;
    if (cleared) setScore((sc) => sc + cleared * 100);
    s.piece = null;
    spawnIfNeeded();
  }

  function move(dx) {
    if (status !== "running") return;
    const s = stateRef.current;
    if (!s.piece) return;
    const next = { ...s.piece, x: s.piece.x + dx };
    if (!collides(s.grid, next)) s.piece = next;
  }

  function softDrop() {
    if (status !== "running") return;
    const s = stateRef.current;
    if (!s.piece) return;
    const next = { ...s.piece, y: s.piece.y + 1 };
    if (!collides(s.grid, next)) s.piece = next;
  }

  function rotate() {
    if (status !== "running") return;
    const s = stateRef.current;
    if (!s.piece) return;

    const rotated = rotateCW(s.piece.shape);

    // basic wall-kick tries
    const tries = [0, -1, 1, -2, 2];
    for (const k of tries) {
      const next = { ...s.piece, shape: rotated, x: s.piece.x + k };
      if (!collides(s.grid, next)) {
        s.piece = next;
        return;
      }
    }
  }

  function draw() {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");

    ctx.clearRect(0, 0, cfg.w, cfg.h);
    ctx.fillStyle = cfg.bg;
    ctx.fillRect(0, 0, cfg.w, cfg.h);

    // grid
    ctx.strokeStyle = cfg.dim;
    ctx.lineWidth = 1;
    for (let x = 0; x <= cfg.w; x += cfg.cell) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, cfg.h);
      ctx.stroke();
    }
    for (let y = 0; y <= cfg.h; y += cfg.cell) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(cfg.w, y);
      ctx.stroke();
    }

    const s = stateRef.current;

    // settled blocks
    ctx.fillStyle = cfg.fg;
    for (let r = 0; r < cfg.rows; r++) {
      for (let c2 = 0; c2 < cfg.cols; c2++) {
        if (!s.grid[r][c2]) continue;
        ctx.fillRect(c2 * cfg.cell + 2, r * cfg.cell + 2, cfg.cell - 4, cfg.cell - 4);
      }
    }

    // current piece
    if (s.piece) {
      const { shape, x, y } = s.piece;
      for (let r = 0; r < shape.length; r++) {
        for (let c2 = 0; c2 < shape[0].length; c2++) {
          if (!shape[r][c2]) continue;
          const gx = (x + c2) * cfg.cell;
          const gy = (y + r) * cfg.cell;
          ctx.fillRect(gx + 2, gy + 2, cfg.cell - 4, cfg.cell - 4);
        }
      }
    }

    if (status === "dead") {
      ctx.fillStyle = isMac ? "rgba(0,0,0,0.65)" : "rgba(255,255,255,0.75)";
      ctx.font = "bold 14px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
      ctx.textAlign = "center";
      ctx.fillText("Game over — press R", cfg.w / 2, cfg.h / 2);
    }
  }

  function loop(ts) {
    if (!lastFallRef.current) lastFallRef.current = ts;
    const delta = ts - lastFallRef.current;

    if (delta >= cfg.fallMs) {
      lastFallRef.current = ts;
      tickFall();
    }

    draw();
    rafRef.current = requestAnimationFrame(loop);
  }

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;

    c.width = cfg.w;
    c.height = cfg.h;
    c.tabIndex = 0;
    c.focus();

    reset();

    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onExit?.();
        return;
      }
      if (e.key === "ArrowLeft") move(-1);
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowDown") softDrop();
      if (e.key === "ArrowUp") rotate();
      if (e.key === " ") {
        e.preventDefault();
        hardDrop();
      }
      if (e.key.toLowerCase() === "r") reset();
    };

    c.addEventListener("keydown", onKey);

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      c.removeEventListener("keydown", onKey);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cfg.w, cfg.h, cfg.fallMs]);

  return (
    <div>
      <div className={`mb-2 text-xs ${isMac ? "text-black/60" : "text-white/60"}`}>
        ← → move • ↑ rotate • ↓ soft drop • Space hard drop • R restart • Score:{" "}
        <span className="font-semibold">{score}</span>
      </div>
      <canvas
        ref={canvasRef}
        className={`rounded-lg outline-none ${isMac ? "border border-black/10" : "border border-white/10"}`}
        style={{ width: cfg.w, height: cfg.h }}
      />
    </div>
  );
}
