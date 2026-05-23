export function Avatar({
  initials,
  size = 32,
}: {
  initials: string;
  size?: number;
}) {
  const colors = [
    "#e8d5b7",
    "#b7d5e8",
    "#d5e8b7",
    "#e8b7d5",
    "#d5b7e8",
    "#b7e8d5",
  ];
  const idx = initials.charCodeAt(0) % colors.length;
  return (
    <div
      className="flex-shrink-0 rounded-full flex items-center justify-center font-semibold text-xs"
      style={{
        width: size,
        height: size,
        background: colors[idx],
        color: "#1a1a1a",
        fontFamily: "var(--font-sans)",
      }}
    >
      {initials.slice(0, 2).toUpperCase()}
    </div>
  );
}
