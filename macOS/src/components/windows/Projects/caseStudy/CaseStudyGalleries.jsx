export function Gallery2({ a, b }) {
  return <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-5">{a}{b}</div>;
}

export function Gallery3({ a, b, c }) {
  return <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">{a}{b}{c}</div>;
}