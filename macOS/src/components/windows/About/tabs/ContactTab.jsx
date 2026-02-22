// src/components/windows/About/tabs/ContactTab.jsx
import { useMemo, useState } from "react";
import contactAvatar from "../../../../imgs/avatar/Avatar1.jpg";

import LinkRow from "../components/LinkRow";
import { Input, Textarea, QuickBtn } from "../components/FormFields";

export default function ContactTab({ styles }) {
  const TO_EMAIL = "casandra.lendinez@outlook.com";

  const [name, setName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [subject, setSubject] = useState("Hello!");
  const [message, setMessage] = useState("");

  const canSend = useMemo(() => {
    // super light validation (portfolio-friendly)
    const okName = name.trim().length > 0;
    const okEmail = fromEmail.trim().length > 0;
    const okMsg = message.trim().length > 0;
    return okName && okEmail && okMsg;
  }, [name, fromEmail, message]);

  function clearForm() {
    setName("");
    setFromEmail("");
    setSubject("Hello!");
    setMessage("");
  }

  function sendEmailQuick() {
    window.location.href = `mailto:${TO_EMAIL}`;
  }

  function openRepo() {
    window.open("https://github.com/martalendinez/macOS", "_blank", "noopener,noreferrer");
  }

  function sendMessage() {
    // Build a nice email body
    const body = [
      `Hi Marta,`,
      ``,
      message.trim(),
      ``,
      `—`,
      `From: ${name.trim()}`,
      `Email: ${fromEmail.trim()}`,
    ].join("\n");

    const mailto = `mailto:${encodeURIComponent(TO_EMAIL)}?subject=${encodeURIComponent(
      subject.trim() || "Hello!"
    )}&body=${encodeURIComponent(body)}`;

    // use location.href so it works even when popups are blocked
    window.location.href = mailto;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div className={`rounded-2xl ${styles.cardBg} border ${styles.cardBorder} p-5`}>
        <div className="flex items-center gap-3">
          <div className={`w-11 h-11 rounded-full overflow-hidden border ${styles.cardBorder}`}>
            <img src={contactAvatar} alt="Profile" className="w-full h-full object-cover" />
          </div>

          <div>
            <div className={`${styles.textStrong} font-semibold`}>Marta Casandra Lendínez</div>
            <div className={`${styles.textSub} text-sm`}>UX Engineer</div>
          </div>
        </div>

        <div className="mt-5 space-y-2 text-sm">
          <LinkRow styles={styles} icon="✉️" label="Email" value={TO_EMAIL} />
          <LinkRow
            styles={styles}
            icon="🔗"
            label="LinkedIn"
            value="www.linkedin.com/in/marta-casandra-lendínez-ibáñez-959259200"
          />
          <LinkRow styles={styles} icon="🐙" label="GitHub" value="https://github.com/martalendinez" />
          <LinkRow styles={styles} icon="📄" label="Resume" value="resume.pdf" />
          <LinkRow styles={styles} icon="🖼️" label="Portfolio" value="marta.lendinez.portfolio.com" />
        </div>
      </div>

      <div className={`rounded-2xl ${styles.cardBg} border ${styles.cardBorder} p-5`}>
        <div className={`${styles.textStrong} font-semibold mb-2`}>Let’s Connect!</div>
        <div className={`${styles.textSub} text-sm leading-relaxed`}>
          I’d love to hear about opportunities, collaborations, or just chat about design!
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <QuickBtn styles={styles} label="Send email" onClick={sendEmailQuick} />
          <QuickBtn styles={styles} label="View code" onClick={openRepo} />
        </div>

        <div className={`mt-5 rounded-xl ${styles.cardBgSoft} border ${styles.cardBorder} p-4`}>
          <div className={`${styles.textMain} text-sm font-medium mb-3`}>Send a message</div>

          <div className="grid grid-cols-1 gap-3">
            <Input
              styles={styles}
              label="Name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              styles={styles}
              label="Email"
              placeholder="you@email.com"
              value={fromEmail}
              onChange={(e) => setFromEmail(e.target.value)}
              type="email"
            />
            <Input
              styles={styles}
              label="Subject"
              placeholder="Hello!"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <Textarea
              styles={styles}
              label="Message"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div className="mt-4 flex justify-between">
            <button
              type="button"
              onClick={clearForm}
              className={`px-4 py-2 rounded-xl ${styles.btn} text-sm transition`}
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={sendMessage}
              disabled={!canSend}
              className={[
                `px-4 py-2 rounded-xl ${styles.btnPrimary} text-sm transition`,
                !canSend ? "opacity-60 cursor-not-allowed" : "",
              ].join(" ")}
            >
              Send message
            </button>
          </div>

          {!canSend && (
            <div className={`${styles.textSub} text-xs mt-3`}>
              Fill in <span className={styles.textStrong}>Name</span>, <span className={styles.textStrong}>Email</span>, and{" "}
              <span className={styles.textStrong}>Message</span> to enable sending.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}