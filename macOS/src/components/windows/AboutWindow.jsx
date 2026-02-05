// src/components/windows/AboutWindow.jsx
import aboutIcon from "../../imgs/me.png";

export default function AboutWindow() {
  return (
    <div className="h-full flex">
      {/* Left profile column */}
      <div className="w-72 border-r border-white/10 bg-white/5 p-6">
        <div className="flex items-center gap-3">
          <img
            src={aboutIcon}
            alt="About icon"
            className="w-12 h-12 object-contain"
          />
          <div>
            <div className="text-white text-lg font-semibold leading-tight">
              Marta
            </div>
            <div className="text-white/70 text-sm">UX Engineer</div>
          </div>
        </div>

        <div className="mt-6 space-y-2">
          {[
            "Profile",
            "Skills",
            "Experience",
            "Education",
            "Contact",
          ].map((item) => (
            <div
              key={item}
              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition text-white/90 text-sm cursor-pointer"
            >
              {item}
            </div>
          ))}
        </div>

        <div className="mt-6 text-white/60 text-xs leading-relaxed">
          Tip: you can reuse this layout for other windows (Projects, AI assistant)
          by swapping the sidebar items + main content.
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-7 overflow-auto">
        <div className="text-white text-2xl font-semibold mb-2">About me</div>
        <div className="text-white/75 text-sm mb-6 max-w-2xl">
          A macOS-inspired portfolio where each section opens as an app window.
          This “About” window is a template: sidebar navigation + main content.
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InfoCard title="What I do">
            UX engineering + UI design. I like building polished interfaces with
            thoughtful interaction and motion.
          </InfoCard>

          <InfoCard title="Current focus">
            Human–AI collaboration in design workflows (wireframing, IA, user flows),
            and building portfolio pieces that feel like real products.
          </InfoCard>

          <InfoCard title="Toolbox">
            Figma, React, Tailwind, Framer Motion, user research & usability testing.
          </InfoCard>

          <InfoCard title="Next sections">
            Projects, AI Assistant, and Extras can become windows using the same
            MacWindow wrapper.
          </InfoCard>
        </div>

        <div className="mt-6 rounded-2xl bg-white/6 border border-white/10 p-5">
          <div className="text-white/90 text-sm font-medium mb-2">
            Quick links
          </div>
          <div className="flex flex-wrap gap-2">
            {["CV", "LinkedIn", "GitHub", "Email"].map((x) => (
              <button
                key={x}
                className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 transition text-white/90 text-sm"
              >
                {x}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, children }) {
  return (
    <div className="rounded-2xl bg-white/6 border border-white/10 p-5 hover:bg-white/10 transition">
      <div className="text-white/90 text-sm font-medium mb-2">{title}</div>
      <div className="text-white/75 text-sm leading-relaxed">{children}</div>
    </div>
  );
}
