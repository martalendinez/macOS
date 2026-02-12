// src/components/windows/EmployerBrandingCaseStudyWindow.jsx
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EmployerBrandingCaseStudyWindow({ uiTheme = "glass" }) {
  const isMac = uiTheme === "macos";

  // -----------------------------
  // ✅ Accent (macOS uses global --accent)
  // -----------------------------
  const accentText = isMac ? "text-[hsl(var(--accent))]" : "text-sky-300";
  const accentSoftBg = isMac ? "bg-[hsl(var(--accent)/0.10)]" : "bg-white/10";
  const accentBorder = isMac ? "border-[hsl(var(--accent)/0.35)]" : "border-white/15";

  // -----------------------------
  // Theme tokens
  // -----------------------------
  const textMain = isMac ? "text-black/85" : "text-white/95";
  const textSub = isMac ? "text-black/55" : "text-white/70";
  const textBody = isMac ? "text-black/70" : "text-white/85";

  // Flat white macOS surfaces (no transparency)
  const pageCard = isMac
    ? "bg-white border border-black/10"
    : "bg-white/10 border border-white/15 backdrop-blur-xl";

  const softCard = isMac
    ? "bg-white border border-black/10"
    : "bg-white/6 border border-white/10";

  // ✅ buttons: keep neutral, but hover/focus uses accent var
  const buttonClass = isMac
    ? "bg-white text-black/75 border border-black/10 hover:bg-[hsl(var(--accent)/0.10)] hover:border-[hsl(var(--accent)/0.35)] focus:outline-none focus:ring-4 focus:ring-[hsl(var(--accent)/0.25)]"
    : "bg-white/10 hover:bg-white/15 text-white/90 border border-white/15";

  const pillClass = isMac
    ? "bg-white text-black/70 border border-black/10"
    : "bg-white/10 text-white/90 border border-white/15";

  const divider = isMac ? "border-black/10" : "border-white/10";

  // -----------------------------
  // Images (plug in)
  // -----------------------------
  const IMAGES = useMemo(
    () => ({
      hero: null,
      competitors: null,
      interviews: null,
      iaFlow: null,
      designSystem: null,
      lofi: null,
      hifi: null,
      architecture: null,
      security: null,
      dashboard: null,
      recommendations: null,
      testing: null,
      iterations: null,
      finalScreens: null,
    }),
    []
  );

  // Lightbox
  const [lightbox, setLightbox] = useState({ open: false, src: null, alt: "" });
  const openLightbox = (src, alt = "") => src && setLightbox({ open: true, src, alt });
  const closeLightbox = () => setLightbox({ open: false, src: null, alt: "" });

  // TOC
  const sections = useMemo(
    () => [
      { id: "overview", label: "Overview" },
      { id: "summary", label: "Summary" },
      { id: "role", label: "My role" },
      { id: "research", label: "Research" },
      { id: "requirements", label: "Requirements" },
      { id: "concept", label: "Concept" },
      { id: "uxia", label: "Users & IA" },
      { id: "ui", label: "UI design" },
      { id: "development", label: "Development" },
      { id: "features", label: "Key features" },
      { id: "testing", label: "Testing & iterations" },
      { id: "tradeoffs", label: "Trade-offs" },
      { id: "impact", label: "Impact" },
      { id: "outcome", label: "Final outcome" },
    ],
    []
  );

  const [tocOpen] = useState(true);
  const [active, setActive] = useState("overview");

  function scrollToSection(id) {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // -----------------------------
  // UI helpers
  // -----------------------------
  function IconChip() {
    if (!isMac) return null;
    return (
      <span
        className="
          inline-flex items-center justify-center
          w-8 h-8 rounded-xl
          bg-[hsl(var(--accent)/0.10)]
          border border-[hsl(var(--accent)/0.35)]
        "
      >
        <span className="w-2 h-2 rounded-full bg-[hsl(var(--accent))]" />
      </span>
    );
  }

  function Pill({ children }) {
    return <span className={`px-3 py-1 rounded-full text-xs border ${pillClass}`}>{children}</span>;
  }

  function BulletList({ items }) {
    return (
      <ul className="mt-3 list-disc pl-5 space-y-2">
        {items.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
    );
  }

  function ImageTile({ src, alt, caption, aspect = "16/9", fit = "cover" }) {
    const aspectClass =
      aspect === "16/9"
        ? "aspect-[16/9]"
        : aspect === "4/3"
        ? "aspect-[4/3]"
        : aspect === "1/1"
        ? "aspect-square"
        : "aspect-[16/9]";

    return (
      <div className={`rounded-3xl overflow-hidden border ${softCard}`}>
        <button
          type="button"
          onClick={() => openLightbox(src, alt)}
          className="w-full text-left"
          disabled={!src}
          title={src ? "Click to zoom" : "Placeholder — set an image in IMAGES"}
        >
          {src ? (
            <img
              src={src}
              alt={alt}
              className={`w-full h-auto ${fit === "contain" ? "object-contain" : "object-cover"}`}
            />
          ) : (
            <div className={`${aspectClass} flex items-center justify-center`}>
              <div className={`text-xs ${textSub} px-6 text-center`}>
                Add image: <span className="font-semibold">{alt || "placeholder"}</span>
              </div>
            </div>
          )}
        </button>

        {caption ? (
          <div className={`px-5 py-4 text-xs ${textSub} border-t ${divider}`}>{caption}</div>
        ) : null}
      </div>
    );
  }

  function HeroCover() {
    return (
      <div className={`mt-10 rounded-[28px] overflow-hidden border ${softCard}`}>
        <button
          type="button"
          onClick={() => openLightbox(IMAGES.hero, "Cover image")}
          className="w-full text-left"
          disabled={!IMAGES.hero}
          title={IMAGES.hero ? "Click to zoom" : "Hero placeholder — set IMAGES.hero"}
        >
          {IMAGES.hero ? (
            <img src={IMAGES.hero} alt="Cover" className="w-full h-auto object-cover" />
          ) : (
            <div className="w-full aspect-[16/7] flex items-center justify-center">
              <div className="text-center px-6">
                <div className={`text-sm font-semibold ${textMain}`}>Cover image (hero)</div>
                <div className={`mt-2 text-xs ${textSub}`}>
                  Add a wide screenshot of your dashboard / product in context. <br />
                  Set it as <span className="font-semibold">IMAGES.hero</span>.
                </div>
              </div>
            </div>
          )}
        </button>
      </div>
    );
  }

  function Section({ id, title, subtitle, children }) {
    return (
      <section id={id} className="scroll-mt-6">
        <div className={`mt-10 pt-6 border-t ${divider}`}>
          <div className={`text-xl font-semibold ${textMain}`}>{title}</div>
          {subtitle ? <div className={`mt-1 text-sm ${textSub}`}>{subtitle}</div> : null}
          <div className={`mt-4 text-[15px] leading-7 ${textBody}`}>{children}</div>
        </div>
      </section>
    );
  }

  function Gallery2({ a, b }) {
    return <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-5">{a}{b}</div>;
  }

  function Gallery3({ a, b, c }) {
    return <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">{a}{b}{c}</div>;
  }

  const metaPills = ["2024", "PrideCom", "UX + Full-stack", "AI (LLaMA 3)", "Security / GDPR"];

  const facts = [
    { k: "Role", v: "UX Designer & Developer (hybrid UX engineering)" },
    { k: "Timeline", v: "Feb–Jun 2024 (4 months)" },
    { k: "Team", v: "3 designers" },
    { k: "Industry", v: "HR & Communication" },
    { k: "Tech", v: "Python · Flask · PostgreSQL · Docker · LM Studio (LLaMA 3)" },
  ];

  return (
    <div className="h-full w-full">
      <div className="h-full overflow-y-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={`mx-auto w-full max-w-[1150px] rounded-[28px] ${pageCard}`}
        >
          <div className="px-6 md:px-10 pt-8 md:pt-10 pb-10">
            {/* Meta pills */}
            <div className="flex flex-wrap gap-2">
              {metaPills.map((p) => (
                <Pill key={p}>{p}</Pill>
              ))}
            </div>

            {/* Title */}
            <div className={`mt-5 text-4xl md:text-5xl font-semibold tracking-tight ${textMain}`}>
              Employer Branding Platform
            </div>
            <div className={`mt-3 text-base md:text-lg ${textSub}`}>
              UX Design & Full-Stack Development for PrideCom — a secure, AI-powered platform that helps SMEs understand
              and improve their employer brand.
            </div>

            {/* CTA row */}
            <div className="mt-6 flex flex-wrap gap-2">
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className={`px-4 py-2.5 rounded-2xl text-sm transition-all border ${buttonClass}`}
              >
                View on GitHub
              </a>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className={`px-4 py-2.5 rounded-2xl text-sm transition-all border ${buttonClass}`}
              >
                Download PDF
              </a>
            </div>

            {/* Overview */}
            <div id="overview" className="mt-8 grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-8 scroll-mt-6">
              <div>
                <div className={`text-lg font-semibold ${textMain}`}>Overview</div>
                <div className={`mt-3 text-[15px] leading-7 ${textBody}`}>
                  SMEs often don’t have the budget for employer branding consultancy. Meanwhile, many existing platforms
                  rely heavily on survey data and focus on single slices of the problem. The result: HR teams struggle to
                  build a holistic, actionable understanding of their employer brand.
                  <br /><br />
                  This project explored how an AI-assisted workflow could help HR teams synthesize employer branding signals
                  into a single dashboard, generate a transparent score, and translate insights into practical recommendations —
                  while meeting high trust and privacy requirements.
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <IconChip />
                  <div className={`text-lg font-semibold ${textMain}`}>Quick facts</div>
                </div>

                <div className={`mt-3 rounded-2xl p-5 border ${softCard}`}>
                  <div className="grid grid-cols-1 gap-3">
                    {facts.map((f) => (
                      <div key={f.k} className={`pb-3 border-b last:border-b-0 ${divider}`}>
                        <div className={`text-xs ${textSub}`}>{f.k}</div>
                        <div className={`mt-1 text-sm font-medium ${textMain}`}>{f.v}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {["UX", "Product", "AI", "Full-stack", "Security", "GDPR"].map((t) => (
                      <Pill key={t}>{t}</Pill>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* HERO */}
            <HeroCover />

            {/* Contents */}
            <AnimatePresence initial={false}>
              {tocOpen ? (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className={`mt-10 rounded-2xl p-5 border ${softCard}`}
                >
                  <div className={`text-sm font-semibold ${textMain}`}>Contents</div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {sections.map((s) => {
                      const isActive = active === s.id;

                      const activeClass = isMac
                        ? `${accentSoftBg} ${accentBorder} ${accentText}`
                        : "bg-white/20 border-white/15 text-white";

                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => scrollToSection(s.id)}
                          className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
                            isActive ? activeClass : pillClass
                          }`}
                        >
                          {s.label}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            {/* Summary */}
            <Section id="summary" title="Summary" subtitle="Problem → Solution → Impact">
              <div className={`rounded-2xl p-5 border ${softCard}`}>
                <div className={`text-sm font-semibold ${textMain}`}>Problem</div>
                <div className="mt-2">
                  SMEs often lack the budget for employer branding consultancy. Existing tools focus on isolated areas and rely heavily on surveys,
                  leaving HR teams without a holistic view of their employer brand.
                </div>

                <div className={`mt-5 text-sm font-semibold ${textMain}`}>Solution</div>
                <div className="mt-2">
                  A secure, AI-powered platform that analyzes employer branding, generates a numerical score, and provides tailored recommendations
                  through a clean, intuitive dashboard.
                </div>

                <div className={`mt-5 text-sm font-semibold ${textMain}`}>Impact</div>
                <BulletList
                  items={[
                    "All participants completed the full flow without assistance, confirming an intuitive, low-friction experience.",
                    "Every HR professional interpreted the dashboard and visualizations immediately, showing strong information clarity.",
                    "Recommendations were described as actionable and aligned with HR best practices.",
                    "The interface was praised as modern, professional, and visually clean.",
                  ]}
                />
                <div className={`mt-4 text-sm ${textSub}`}>
                  Quotes: “Everything is very clear.” · “Very good, very in line with HR vocabulary.” · “Very modern and professional.”
                </div>
              </div>

              <Gallery2
                a={<ImageTile src={IMAGES.dashboard} alt="Dashboard highlight" caption="Optional: key dashboard view." aspect="16/9" />}
                b={<ImageTile src={IMAGES.recommendations} alt="Recommendations highlight" caption="Optional: recommendations view." aspect="16/9" />}
              />
            </Section>

            {/* My role */}
            <Section id="role" title="My role" subtitle="I led the full UX + engineering process">
              <div className={`rounded-2xl p-5 border ${softCard}`}>
                This project let me work as a hybrid UX engineer — designing the experience and building the system behind it.
                <BulletList
                  items={[
                    "Research: competitor analysis, expert interviews, literature review",
                    "UX: personas, journeys, IA, low-fi and high-fi prototypes",
                    "UI: design system aligned with PrideCom’s brand",
                    "Engineering: Flask backend, PostgreSQL database, LLaMA 3 integration (via LM Studio)",
                    "Security: encryption (PyNaCl), GDPR-aligned data handling",
                    "Testing: user testing, iterations, refinements",
                    "Deployment: Docker containerization and VM setup",
                  ]}
                />
              </div>
            </Section>

            {/* Research */}
            <Section id="research" title="Research" subtitle="Competitors + expert interviews + what we learned">
              <div className={`rounded-2xl p-5 border ${softCard}`}>
                <div className={`text-sm font-semibold ${textMain}`}>Competitor analysis</div>
                <div className="mt-2">
                  CultureAmp, Eletive, and Populum were analyzed. None offered a holistic employer branding solution; all relied heavily on surveys.
                </div>

                <div className={`mt-5 text-sm font-semibold ${textMain}`}>Expert interviews</div>
                <div className="mt-2">
                  To validate feasibility and trust requirements, I interviewed experts across HR, security, and AI:
                </div>
                <BulletList items={["HR Director at Toyota", "Marketing Lead at Accenture", "Cybersecurity expert", "AI engineer"]} />

                <div className={`mt-5 text-sm font-semibold ${textMain}`}>Key insights</div>
                <BulletList
                  items={[
                    "HR teams want automated data processing and clear dashboards for fast decision-making.",
                    "Strong encryption and GDPR compliance are essential to build trust.",
                    "AI should support recommendations — not replace HR judgment.",
                  ]}
                />
              </div>

              <Gallery3
                a={<ImageTile src={IMAGES.competitors} alt="Competitor analysis" caption="Competitor matrix / feature comparison." aspect="4/3" />}
                b={<ImageTile src={IMAGES.interviews} alt="Expert interviews" caption="Interview notes / themes / synthesis." aspect="4/3" />}
                c={<ImageTile src={IMAGES.iaFlow} alt="Early flow" caption="Optional: how research shaped structure." aspect="4/3" />}
              />
            </Section>

            {/* Requirements */}
            <Section id="requirements" title="Requirements" subtitle="Clarity + trust constraints">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className={`rounded-2xl p-5 border ${softCard}`}>
                  <div className={`text-sm font-semibold ${textMain}`}>Design requirements</div>
                  <BulletList items={["Clear dashboards that support scanning", "Clean, legible, brand-consistent UI", "Simple, intuitive experience for HR users"]} />
                </div>

                <div className={`rounded-2xl p-5 border ${softCard}`}>
                  <div className={`text-sm font-semibold ${textMain}`}>Engineering requirements</div>
                  <BulletList items={["Clean architecture (SOLID principles)", "Encrypted data handling (PyNaCl)", "GDPR-aligned data flows and storage", "Secure authentication", "Reliable PostgreSQL schema"]} />
                </div>
              </div>

              <Gallery2
                a={<ImageTile src={IMAGES.security} alt="Security / GDPR" caption="Security model / GDPR considerations." aspect="16/9" />}
                b={<ImageTile src={IMAGES.architecture} alt="Architecture" caption="System architecture at a glance." aspect="16/9" />}
              />
            </Section>

            {/* Concept */}
            <Section id="concept" title="Concept" subtitle="From options → chosen direction → scoped feature set">
              <div className={`rounded-2xl p-5 border ${softCard}`}>
                Using the Six Thinking Hats method, I explored four concepts. The chosen concept was{" "}
                <span className={`font-semibold ${textMain}`}>Holistic Employer Branding</span>.
              </div>
            </Section>

            {/* Users & IA */}
            <Section id="uxia" title="Users & Information Architecture" subtitle="Personas, journeys, content inventory, flowchart">
              <div className={`rounded-2xl p-5 border ${softCard}`}>
                I designed personas, empathy maps, user journeys, a content inventory, and a full design flowchart.
              </div>

              <div className="mt-6">
                <ImageTile
                  src={IMAGES.iaFlow}
                  alt="Information architecture / user flow"
                  caption="IA and user flow (add your flowchart screenshot here)."
                  aspect="16/9"
                  fit="contain"
                />
              </div>
            </Section>

            {/* UI design */}
            <Section id="ui" title="UI design" subtitle="Design system + low-fi → high-fi">
              <div className={`rounded-2xl p-5 border ${softCard}`}>
                I created a design system aligned with PrideCom’s brand and developed low-fi and high-fi prototypes.
              </div>

              <Gallery3
                a={<ImageTile src={IMAGES.designSystem} alt="Design system" caption="Tokens, components, typography, spacing." aspect="4/3" />}
                b={<ImageTile src={IMAGES.lofi} alt="Low-fi" caption="Low-fi key screens." aspect="4/3" />}
                c={<ImageTile src={IMAGES.hifi} alt="High-fi" caption="High-fi key screens." aspect="4/3" />}
              />
            </Section>

            {/* Development */}
            <Section id="development" title="Development" subtitle="How the build supported UX quality, security, and reliability">
              <div className={`rounded-2xl p-5 border ${softCard}`}>
                Built with Python, Flask, PostgreSQL, LM Studio (LLaMA 3), and Docker.
              </div>
            </Section>

            {/* Key features */}
            <Section id="features" title="Key features" subtitle="Where HR teams get value">
              <Gallery2
                a={<ImageTile src={IMAGES.dashboard} alt="Dashboard screen" caption="Dashboard view." aspect="16/9" />}
                b={<ImageTile src={IMAGES.recommendations} alt="Recommendations screen" caption="Recommendations view." aspect="16/9" />}
              />
            </Section>

            {/* Testing */}
            <Section id="testing" title="Testing & iterations" subtitle="What changed after testing with HR professionals">
              <div className={`rounded-2xl p-5 border ${softCard}`}>
                Seven HR professionals tested the prototype.
              </div>

              <Gallery2
                a={<ImageTile src={IMAGES.testing} alt="Testing" caption="Testing setup / tasks / notes." aspect="4/3" />}
                b={<ImageTile src={IMAGES.iterations} alt="Iterations" caption="Before/after changes and iterations." aspect="4/3" />}
              />
            </Section>

            {/* Trade-offs */}
            <Section id="tradeoffs" title="Trade-offs" subtitle="Constraints that shaped the product">
              <div className={`rounded-2xl p-5 border ${softCard}`}>
                <BulletList
                  items={[
                    "4-month timeline (scope had to be tight and prioritized)",
                    "GDPR + encryption requirements (trust first)",
                    "Limited real-world data (careful framing of results)",
                  ]}
                />
              </div>
            </Section>

            {/* Impact */}
            <Section id="impact" title="Impact" subtitle="What HR professionals validated">
              <div className={`rounded-2xl p-5 border ${softCard}`}>
                <div className={`text-sm font-semibold ${textMain}`}>Quotes</div>
                <div className={`mt-3 ${textBody}`}>
                  “Everything is very clear.” · “Very good, very in line with HR vocabulary.” · “Very modern and professional.”
                </div>
              </div>
            </Section>

            {/* Final outcome */}
            <Section id="outcome" title="Final outcome" subtitle="What was delivered and why it matters">
              <div className={`rounded-2xl p-5 border ${softCard}`}>
                A secure, AI-powered platform that helps SMEs understand and improve their employer brand.
              </div>

              <div className="mt-6">
                <ImageTile src={IMAGES.finalScreens} alt="Final screens" caption="Optional: a collage of final key screens." aspect="16/9" />
              </div>
            </Section>

            <div className="mt-10" />
          </div>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox.open ? (
            <motion.div
              className="fixed inset-0 z-[9999] flex items-center justify-center p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
            >
              <div className="absolute inset-0 bg-black/60" />
              <motion.div
                className={`relative max-w-[1200px] w-full rounded-3xl overflow-hidden border ${
                  isMac ? "border-black/10 bg-white" : "border-white/15 bg-black/30 backdrop-blur-xl"
                }`}
                initial={{ scale: 0.98, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.98, y: 10 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={`flex items-center justify-between px-5 py-4 border-b ${divider}`}>
                  <div className={`text-sm font-semibold ${isMac ? "text-black/80" : "text-white/90"}`}>
                    {lightbox.alt || "Screenshot"}
                  </div>
                  <button className={`px-4 py-2 rounded-2xl text-sm border ${buttonClass}`} onClick={closeLightbox}>
                    Close
                  </button>
                </div>
                <div className="p-5">
                  <img src={lightbox.src} alt={lightbox.alt} className="w-full h-auto rounded-2xl" />
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
