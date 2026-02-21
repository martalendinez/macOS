// src/components/windows/Settings/utils.js
export function downloadResume() {
  const a = document.createElement("a");
  a.href = "/resume.pdf";
  a.download = "Marta_Lendinez_Resume.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();
}