import React from "react";
import type { CompanyCourseProgressFilter } from "gql-generated/generated/types";
import { useExportProgress } from "../hooks/use-export-progress";
import { Button } from "ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "ui/components/dialog";
import { Progress } from "ui/components/progress";

function todayISODate() {
  return new Date().toISOString().slice(0, 10);
}

type ExportState =
  | { status: "idle" }
  | { status: "running"; downloaded: number }
  | { status: "done"; downloaded: number }
  | { status: "error"; message: string; downloaded: number }
  | { status: "canceled"; downloaded: number };

export function ExportProgressDialog({
  companyId,
  filter,
}: {
  companyId: string | null;
  filter: CompanyCourseProgressFilter;
  isOpen?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState<ExportState>({ status: "idle" });

  const abortRef = React.useRef<AbortController | null>(null);
  const canceledRef = React.useRef(false);

  const reset = () => {
    abortRef.current?.abort();
    abortRef.current = null;
    canceledRef.current = false;
    setState({ status: "idle" });
  };

  const close = () => {
    setOpen(false);
    // opcional: resetea al cerrar
    setTimeout(reset, 150);
  };

  const cancel = () => {
    canceledRef.current = true;
    abortRef.current?.abort();
  };
  const { exportAll } = useExportProgress({
    companyId: companyId ?? "",
    filter,
  });

  const isRunning = state.status === "running";
  const downloaded =
    state.status === "running" ||
    state.status === "done" ||
    state.status === "error" ||
    state.status === "canceled"
      ? state.downloaded
      : 0;

  return (
    <>
      <Button
        variant="neutral"
        onClick={exportAll}
        disabled={!companyId || isRunning}
      >
        Export report
      </Button>

      <Dialog open={open} onOpenChange={(v) => (v ? setOpen(true) : close())}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Exporting report</DialogTitle>
            <DialogDescription>
              We’re generating CSV files for course progress.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            {/* Indeterminate-ish progress: animate by value cycling */}
            <Progress value={isRunning ? 35 : 100} />
            <div className="text-sm">
              <span className="text-muted-foreground">Downloaded rows: </span>
              <span className="font-medium">{downloaded}</span>
            </div>

            {state.status === "done" ? (
              <p className="text-sm text-muted-foreground">
                Done. Two CSV files were downloaded (rows + summary).
              </p>
            ) : null}

            {state.status === "canceled" ? (
              <p className="text-sm text-muted-foreground">
                Export canceled. Downloaded rows: {downloaded}
              </p>
            ) : null}

            {state.status === "error" ? (
              <p className="text-sm text-destructive">{state.message}</p>
            ) : null}
          </div>

          <DialogFooter className="gap-2">
            {isRunning ? (
              <Button variant="noShadowNeutral" onClick={cancel}>
                Cancel
              </Button>
            ) : (
              <Button variant="neutral" onClick={close}>
                Close
              </Button>
            )}

            {state.status === "error" || state.status === "canceled" ? (
              <Button
                variant="neutral"
                onClick={() => {
                  reset();
                  exportAll();
                }}
              >
                Retry
              </Button>
            ) : null}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
