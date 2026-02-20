// src/components/windows/Settings/components/Section.jsx
export default function Section({ id, title, titleClass, refObj, children }) {
  return (
    <div id={id} ref={refObj}>
      <div className={`${titleClass} text-xs mb-2`}>{title}</div>
      {children}
    </div>
  );
}