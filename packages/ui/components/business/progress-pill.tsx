export function ProgressPill({ value }: { value: number }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className="flex items-center gap-2 min-w-[140px]">
      <div className="h-2 w-24 rounded-sm bg-muted overflow-hidden">
        <div className="h-full bg-primary" style={{ width: `${v}%` }} />
      </div>
      <span className="text-xs tabular-nums text-muted-foreground">
        {v.toFixed(0)}%
      </span>
    </div>
  );
}
