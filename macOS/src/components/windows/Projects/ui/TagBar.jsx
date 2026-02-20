export default function TagBar({ tags, activeTag, onPick, styles }) {
  return (
    <div className="flex flex-wrap gap-2 justify-end">
      {(tags ?? []).map((tag) => {
        const active = tag === activeTag;
        return (
          <button
            key={tag}
            onClick={() => onPick(tag)}
            className={`px-3 py-1 rounded-full text-sm transition-all ${
              active ? styles.activeTagClass : styles.chipClass
            }`}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}