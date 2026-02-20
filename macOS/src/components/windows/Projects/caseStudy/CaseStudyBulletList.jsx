export default function CaseStudyBulletList({ items }) {
  return (
    <ul className="mt-3 list-disc pl-5 space-y-2">
      {(items ?? []).map((x) => (
        <li key={x}>{x}</li>
      ))}
    </ul>
  );
}