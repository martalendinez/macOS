export default function CaseStudySection({ id, title, subtitle, theme, children }) {
  return (
    <section id={id} className="scroll-mt-6">
      <div className={`mt-10 pt-6 border-t ${theme.divider}`}>
        <div className={`text-xl font-semibold ${theme.textMain}`}>{title}</div>
        {subtitle ? <div className={`mt-1 text-sm ${theme.textSub}`}>{subtitle}</div> : null}
        <div className={`mt-4 text-[15px] leading-7 ${theme.textBody}`}>{children}</div>
      </div>
    </section>
  );
}