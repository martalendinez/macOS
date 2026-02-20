export default function CaseStudyImageTile({
  src,
  alt,
  caption,
  aspect = "16/9",
  fit = "cover",
  theme,
  onOpen,
}) {
  const aspectClass =
    aspect === "16/9"
      ? "aspect-[16/9]"
      : aspect === "4/3"
      ? "aspect-[4/3]"
      : aspect === "1/1"
      ? "aspect-square"
      : "aspect-[16/9]";

  return (
    <div className={`rounded-3xl overflow-hidden border ${theme.softCard}`}>
      <button
        type="button"
        onClick={() => onOpen?.(src, alt)}
        className="w-full text-left"
        disabled={!src}
        title={src ? "Click to zoom" : "Placeholder — set an image in IMAGES"}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className={`w-full h-auto ${fit === "contain" ? "object-contain" : "object-cover"}`}
          />
        ) : (
          <div className={`${aspectClass} flex items-center justify-center`}>
            <div className={`text-xs ${theme.textSub} px-6 text-center`}>
              Add image: <span className="font-semibold">{alt || "placeholder"}</span>
            </div>
          </div>
        )}
      </button>

      {caption ? <div className={`px-5 py-4 text-xs ${theme.textSub} border-t ${theme.divider}`}>{caption}</div> : null}
    </div>
  );
}