import { useMemo, useState } from "react";

export default function useTagFilter(items, defaultTag = "All") {
  const [activeTag, setActiveTag] = useState(defaultTag);

  const allTags = useMemo(() => {
    const set = new Set([defaultTag]);
    (items ?? []).forEach((p) => (p.tags ?? []).forEach((t) => set.add(t)));
    return Array.from(set);
  }, [items, defaultTag]);

  const filtered = useMemo(() => {
    if (activeTag === defaultTag) return items ?? [];
    return (items ?? []).filter((p) => (p.tags ?? []).includes(activeTag));
  }, [items, activeTag, defaultTag]);

  return { activeTag, setActiveTag, allTags, filtered };
}