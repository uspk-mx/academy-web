import { Badge } from "ui/components/badge";

export function IncludedBadge({
  categoryName,
}: {
  categoryName?: string | null;
}) {
  return (
    <div className="flex items-center gap-2">
      <Badge variant="neutral">Included</Badge>
      {categoryName ? (
        <span className="text-xs text-muted-foreground">
          Plan category: {categoryName}
        </span>
      ) : null}
    </div>
  );
}
