import { useEffect, useMemo, useRef, useState } from "react";

export default function PongGame({ uiTheme = "glass", onExit }) {
  const isMac = uiTheme === "macos";
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  const [score, setScore] = useState({ you: 0, cpu: 0 });

  const cfg = useMemo(() => {
    return {
      w: 520,
      h: 320,
      bg: isMac ? "#f5f5f2" : "rgba(0,0,0,0.25)",
      fg: isMac ? "rgba(0,0,0,0.75)" : "rgba(255,255,255,0.9)",
      dim: isMac ? "rgba(0,0,0,0.18)" : "rgba(255,255,255,0.15)",
    };
  }, [isMac]);

  const stateRef = useRef({
    you: { x: 20, y: 130, w: 10, h: 60, vy: 0 },
    cpu: { x: 490, y: 130, w: 10, h: 60, vy: 0 },
    ball: { x: 260, y: 160, r: 6, vx: 3.2, vy: 2.0 },
    keys: { up: false, down: false },
  });

  function resetBall(dir = 1) {
    const s = stateRef.current;
    s.ball.x = cfg.w / 2;
    s.ball.y = cfg.h / 2;
    s.ball.vx = 3.2 * dir;
    s.ball.vy = (Math.random() * 3 - 1.5) || 1.2;
  }

  function clamp(v, a, b) {
    return Math.max(a, Math.min(b, v));
  }

  function intersects(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  }

  function step() {
    const s = stateRef.current;

    // player input
    const speed = 4.3;
    s.you.vy = (s.keys.up ? -speed : 0) + (s.keys.down ? speed : 0);
    s.you.y = clamp(s.you.y + s.you.vy, 0, cfg.h - s.you.h);

    // cpu (simple follow with lag)
    const target = s.ball.y - s.cpu.h / 2;
    s.cpu.y += clamp(target - s.cpu.y, -3.4, 3.4);
    s.cpu.y = clamp(s.cpu.y, 0, cfg.h - s.cpu.h);

    // ball
    s.ball.x += s.ball.vx;
    s.ball.y += s.ball.vy;

    // walls
    if (s.ball.y - s.ball.r <= 0 || s.ball.y + s.ball.r >= cfg.h) {
      s.ball.vy *= -1;
      s.ball.y = clamp(s.ball.y, s.ball.r, cfg.h - s.ball.r);
    }

    // paddles
    const ballBox = { x: s.ball.x - s.ball.r, y: s.ball.y - s.ball.r, w: s.ball.r * 2, h: s.ball.r * 2 };

    if (intersects(ballBox, s.you)) {
      s.ball.vx = Math.abs(s.ball.vx) + 0.2;
      const hit = (s.ball.y - (s.you.y + s.you.h / 2)) / (s.you.h / 2);
      s.ball.vy += hit * 1.4;
      s.ball.x = s.you.x + s.you.w + s.ball.r + 1;
    }

    if (intersects(ballBox, s.cpu)) {
      s.ball.vx = -(Math.abs(s.ball.vx) + 0.2);
      const hit = (s.ball.y - (s.cpu.y + s.cpu.h / 2)) / (s.cpu.h / 2);
      s.ball.vy += hit * 1.2;
      s.ball.x = s.cpu.x - s.ball.r - 1;
    }

    // scoring
    if (s.ball.x < -20) {
      setScore((sc) => ({ ...sc, cpu: sc.cpu + 1 }));
      resetBall(1);
    }
    if (s.ball.x > cfg.w + 20) {
      setScore((sc) => ({ ...sc, you: sc.you + 1 }));
      resetBall(-1);
    }
  }

  function draw() {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");

    ctx.clearRect(0, 0, cfg.w, cfg.h);
    ctx.fillStyle = cfg.bg;
    ctx.fillRect(0, 0, cfg.w, cfg.h);

    // mid line
    ctx.strokeStyle = cfg.dim;
    ctx.setLineDash([6, 8]);
    ctx.beginPath();
    ctx.moveTo(cfg.w / 2, 0);
    ctx.lineTo(cfg.w / 2, cfg.h);
    ctx.stroke();
    ctx.setLineDash([]);

    const s = stateRef.current;

    ctx.fillStyle = cfg.fg;
    ctx.fillRect(s.you.x, s.you.y, s.you.w, s.you.h);
    ctx.fillRect(s.cpu.x, s.cpu.y, s.cpu.w, s.cpu.h);

    ctx.beginPath();
    ctx.arc(s.ball.x, s.ball.y, s.ball.r, 0, Math.PI * 2);
    ctx.fill();
  }

  function loop() {
    step();
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

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onExit?.();
        return;
      }
      if (e.key === "ArrowUp") stateRef.current.keys.up = true;
      if (e.key === "ArrowDown") stateRef.current.keys.down = true;
    };
    const onKeyUp = (e) => {
      if (e.key === "ArrowUp") stateRef.current.keys.up = false;
      if (e.key === "ArrowDown") stateRef.current.keys.down = false;
    };

    c.addEventListener("keydown", onKeyDown);
    c.addEventListener("keyup", onKeyUp);

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      c.removeEventListener("keydown", onKeyDown);
      c.removeEventListener("keyup", onKeyUp);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cfg.w, cfg.h]);

  return (
    <div>
      <div className={`mb-2 text-xs ${isMac ? "text-black/60" : "text-white/60"}`}>
        ↑ / ↓ to move • You {score.you} : {score.cpu} CPU
      </div>
      <canvas
        ref={canvasRef}
        className={`w-full max-w-[520px] rounded-lg outline-none ${isMac ? "border border-black/10" : "border border-white/10"}`}
      />
    </div>
  );
}
