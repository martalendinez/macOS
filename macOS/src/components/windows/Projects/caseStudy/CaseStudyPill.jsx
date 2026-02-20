export default function CaseStudyPill({ children, theme }) {
  return <span className={`px-3 py-1 rounded-full text-xs border ${theme.pillClass}`}>{children}</span>;
}