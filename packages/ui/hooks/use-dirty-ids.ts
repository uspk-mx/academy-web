import { useCallback, useState } from "react";
import { pino } from "pino";

export function useDirtyIds() {
  const [dirtyId, setDirtyId] = useState<Set<string>>(new Set());
  const isDirty = dirtyId.size > 0;

  const logger = pino();

  const markItemDirty = useCallback(
    (itemId: string) => {
      setDirtyId((prev) => {
        const newSet = new Set(prev);
        newSet.add(itemId);
        logger.info([
          "✏️ Marked item as dirty:",
          itemId,
          "Total dirty:",
          newSet.size,
        ]);
        return newSet;
      });
    },
    [logger.info]
  );

  const markItemClean = useCallback(
    (itemId: string) => {
      setDirtyId((prev) => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        logger.info([
          "✅ Marked item as clean:",
          itemId,
          "Total dirty:",
          newSet.size,
        ]);
        return newSet;
      });
    },
    [logger.info]
  );

  const markAllItemsClean = useCallback(() => {
    setDirtyId(new Set());
    logger.info("🧹 Cleared all dirty questions");
  }, [logger.info]);

  return {
    markItemDirty,
    markItemClean,
    markAllItemsClean,
    isDirty,
  };
}
