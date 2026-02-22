// src/components/windows/About/components/FormFields.jsx
export function Input({ styles, label, placeholder, value, onChange, type = "text" }) {
  return (
    <label className="block">
      <div className={`${styles.textSub} text-xs mb-1`}>{label}</div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full rounded-xl px-3 py-2 text-sm outline-none border ${styles.cardBorder} ${styles.cardBgSoft} ${styles.textMain} ${styles.inputFocus}`}
      />
    </label>
  );
}

export function Textarea({ styles, label, placeholder, value, onChange }) {
  return (
    <label className="block">
      <div className={`${styles.textSub} text-xs mb-1`}>{label}</div>
      <textarea
        placeholder={placeholder}
        rows={4}
        value={value}
        onChange={onChange}
        className={`w-full rounded-xl px-3 py-2 text-sm outline-none resize-none border ${styles.cardBorder} ${styles.cardBgSoft} ${styles.textMain} ${styles.inputFocus}`}
      />
    </label>
  );
}

export function QuickBtn({ styles, label, onClick, type = "button", disabled = false }) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={[
        `rounded-xl px-3 py-2 text-sm transition ${styles.btn}`,
        disabled ? "opacity-60 cursor-not-allowed" : "",
      ].join(" ")}
    >
      {label}
    </button>
  );
}