import { cn } from "ui/lib/utils";

export type Status =
  | "active"
  | "inactive"
  | "pending"
  | "paid"
  | "available"
  | "assigned"
  | "expired";

export function StatusBadge({ status }: { status: Status }) {
  const styles: Record<Status, string> = {
    active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    inactive: "bg-gray-100 text-gray-700 border-gray-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
    available: "bg-blue-50 text-blue-700 border-blue-200",
    assigned: "bg-gray-100 text-gray-700 border-gray-200",
    expired: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <span
      className={cn(
        "px-3 py-1 rounded-full text-xs font-medium border",
        styles[status]
      )}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
