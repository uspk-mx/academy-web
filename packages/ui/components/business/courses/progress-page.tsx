import * as React from "react";
import { useSearchParams } from "react-router";
import { useQuery } from "urql";
import { Avatar, AvatarFallback, AvatarImage } from "ui/components/avatar";
import { Badge } from "ui/components/badge";
import { Button } from "ui/components/button";
import { Card, CardContent, CardHeader } from "ui/components/card";
import { Input } from "ui/components/input";
import { Progress } from "ui/components/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "ui/components/select";
import { Skeleton } from "ui/components/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "ui/components/table";
import {
  CompanyCourseProgressDocument,
  CompanyCourseProgressSummaryDocument,
  type CompanyCourseProgressFilter,
  type User,
} from "gql-generated/gql/graphql";
import { useDebouncedValue } from "ui/hooks/use-debounced-value";
import { useCompanyId } from "../hooks/use-company-id";
import { downloadTextFile, toCsv } from "../utils";
import { ExportProgressDialog } from "./export-progress-dialog";
import {
  mockCompanyCourseProgress,
  mockCompanyCourseProgressSummary,
  mockExportCompanyCourseProgressCsv,
} from "./mock";
import { PageBreadCrumbs } from "ui/components/admin/page-breadcrumbs";

function safePct(v: any) {
  const n = typeof v === "number" ? v : Number(v ?? 0);
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(100, n));
}

function safeNum(v: unknown, fallback = null) {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function formatDate(iso?: string | null) {
  if (!iso) return "—";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "—" : d.toLocaleDateString();
}

function formatName(user: User) {
  return user?.fullName || user?.email || "—";
}

function initials(nameOrEmail?: string | null) {
  const s = (nameOrEmail ?? "").trim();
  if (!s) return "—";
  // si es email, toma la parte antes del @
  const base = s.includes("@") ? s.split("@")[0] : s;
  const parts = base.split(/[.\s_-]+/).filter(Boolean);
  const a = parts[0]?.[0] ?? base[0] ?? "U";
  const b = parts[1]?.[0] ?? "";
  return (a + b).toUpperCase();
}

export default function BusinessCoursesProgressPage() {
  const companyId = useCompanyId();

  const [searchUser, setSearchUser] = React.useState("");
  const debouncedSearch = useDebouncedValue(searchUser, 350);
  const [isExportDialogOpen, setIsExportDialogOpen] = React.useState(false);

  const [courseId, setCourseId] = React.useState<string | null>(null);
  const [completed, setCompleted] = React.useState<"all" | "true" | "false">(
    "all",
  );

  const [limit] = React.useState(20);
  const [offset, setOffset] = React.useState(0);

  const useMock =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("mock") === "1";

  const [useMockState, setUseMockSearchParams] = useSearchParams();

  const filter: CompanyCourseProgressFilter = React.useMemo(() => {
    const s = debouncedSearch.trim();
    return {
      searchUser: s ? s : null,
      courseId,
      completed: completed === "all" ? null : completed === "true",
      limit,
      offset,
    };
  }, [debouncedSearch, courseId, completed, limit, offset]);

  const [
    { data: rowsData, fetching: rowsLoading, error: rowsError },
    reexecRows,
  ] = useQuery({
    query: CompanyCourseProgressDocument,
    variables: { companyId, filter },
    pause: !companyId || useMock,
    requestPolicy: "cache-and-network",
  });

  const [
    { data: summaryData, fetching: summaryLoading, error: summaryError },
    reexecSummary,
  ] = useQuery({
    query: CompanyCourseProgressSummaryDocument,
    variables: { companyId, filter: { ...filter, limit: 50, offset: 0 } }, // summary “menos paginado”
    pause: !companyId || useMock,
    requestPolicy: "cache-and-network",
  });

  const mockRowsData = React.useMemo(() => {
    if (!companyId) return null;
    return mockCompanyCourseProgress({ companyId, filter });
  }, [companyId, filter]);

  const mockSummaryData = React.useMemo(() => {
    if (!companyId) return null;
    // summary should ignore pagination (like prod)
    return mockCompanyCourseProgressSummary({
      companyId,
      filter: { ...filter, limit: null, offset: null },
    });
  }, [companyId, filter]);

  const rows = useMock
    ? (mockRowsData?.companyCourseProgress ?? [])
    : (rowsData?.companyCourseProgress ?? []);
  const summaries = useMock
    ? (mockSummaryData?.companyCourseProgressSummary ?? [])
    : (summaryData?.companyCourseProgressSummary ?? []);

  // Global cards (MVP): agregamos desde summary
  const totals = React.useMemo(() => {
    const enrolled = summaries.reduce(
      (a: number, s: any) => a + (s.enrolledCount ?? 0),
      0,
    );
    const started = summaries.reduce(
      (a: number, s: any) => a + (s.startedCount ?? 0),
      0,
    );
    const completedCount = summaries.reduce(
      (a: number, s: any) => a + (s.completedCount ?? 0),
      0,
    );

    const avg =
      summaries.length === 0
        ? 0
        : summaries.reduce(
            (a: number, s: any) => a + safePct(s.avgProgressPercentage),
            0,
          ) / summaries.length;

    return { enrolled, started, completedCount, avg: Math.round(avg) };
  }, [summaries]);

  // Dropdown de cursos (MVP): desde summaries para tener lista estable
  const courseOptions = React.useMemo(() => {
    const seen = new Map<string, any>();
    for (const s of summaries) {
      const c = s.course;
      if (c?.id && !seen.has(c.id)) seen.set(c.id, c);
    }
    return Array.from(seen.values());
  }, [summaries]);

  const clearFilters = () => {
    setSearchUser("");
    setCourseId(null);
    setCompleted("all");
    setOffset(0);
    reexecRows({ requestPolicy: "network-only" });
    reexecSummary({ requestPolicy: "network-only" });
  };

  const refresh = () => {
    reexecRows({ requestPolicy: "network-only" });
    reexecSummary({ requestPolicy: "network-only" });
  };

  const onExportMock = () => {
    // export all filtered rows, not only the current page
    const exportRows = rows.map((r: any) => {
      const p = r.progress ?? {};
      const u = r.user ?? {};
      const c = r.course ?? {};
      return {
        user_name: u.fullName ?? "",
        user_email: u.email ?? "",
        course_title: c.title ?? "",
        category: c.category?.name ?? "",
        progress_pct: safePct(p.progressPercentage),
        completed: Boolean(p.completed),
        lessons: `${p.completedLessons ?? 0}/${p.totalLessons ?? 0}`,
        quizzes: `${p.completedQuizzes ?? 0}/${p.totalQuizzes ?? 0}`,
        avg_score: p.averageScore ?? "",
        started_at: p.startedAt ?? "",
        updated_at: p.updatedAt ?? "",
        completed_at: p.completedAt ?? "",
      };
    });

    const csv = toCsv(exportRows);
    const ts = new Date().toISOString().slice(0, 10);
    downloadTextFile(`company-course-progress-${ts}.csv`, csv);
  };

  const onExport = () => {
    if (!companyId) return;
    if (useMock) {
      const csv = mockExportCompanyCourseProgressCsv({
        companyId,
        filter: { ...filter, limit: null, offset: null }, // export ALL filtered
      });
      const ts = new Date().toISOString().slice(0, 10);
      downloadTextFile(`company-course-progress-${ts}.csv`, csv);
      return;
    }
  };

  const isLoading = useMock ? false : rowsLoading || summaryLoading;

  return (
    <>
      <PageBreadCrumbs
        items={[
          {
            href: " ",
            label: "Dashboard",
          },
          { href: "courses/progress", label: "Seguimiento de progreso" },
        ]}
      />
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold">Track progress</h1>
            <p className="text-sm text-muted-foreground">
              Monitor learner progress across company courses.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={useMock ? "neutral" : "ghost"}
              onClick={() =>
                setUseMockSearchParams((prev) => {
                  if (prev.get("mock") === "1") {
                    prev.delete("mock");
                  } else {
                    prev.set("mock", "1");
                  }
                  return prev;
                })
              }
            >
              {useMock ? "Mock: ON" : "Mock: OFF"}
            </Button>

            {!useMock ? (
              <ExportProgressDialog companyId={companyId} filter={filter} />
            ) : (
              <Button variant="neutral" onClick={onExport}>
                Export CSV
              </Button>
            )}

            <Button variant="neutral" onClick={refresh} disabled={useMock}>
              Refresh
            </Button>
            <Button variant="ghost" onClick={clearFilters}>
              Clear
            </Button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <p className="text-sm text-muted-foreground">Enrolled</p>
              {summaryLoading ? (
                <Skeleton className="h-7 w-16" />
              ) : (
                <p className="text-2xl font-semibold">{totals.enrolled}</p>
              )}
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs text-muted-foreground">
                Users enrolled across included courses.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <p className="text-sm text-muted-foreground">Started</p>
              {summaryLoading ? (
                <Skeleton className="h-7 w-16" />
              ) : (
                <p className="text-2xl font-semibold">{totals.started}</p>
              )}
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs text-muted-foreground">
                Have progress activity recorded.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <p className="text-sm text-muted-foreground">Completed</p>
              {summaryLoading ? (
                <Skeleton className="h-7 w-16" />
              ) : (
                <p className="text-2xl font-semibold">
                  {totals.completedCount}
                </p>
              )}
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs text-muted-foreground">
                Finished (completed = true).
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <p className="text-sm text-muted-foreground">Avg progress</p>
              {summaryLoading ? (
                <Skeleton className="h-7 w-16" />
              ) : (
                <p className="text-2xl font-semibold">{totals.avg}%</p>
              )}
            </CardHeader>
            <CardContent className="pt-0">
              <Progress value={totals.avg} />
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-12">
          <div className="sm:col-span-5">
            <Input
              value={searchUser}
              onChange={(e) => {
                setSearchUser(e.target.value);
                setOffset(0);
              }}
              placeholder="Search user (name or email)…"
            />
          </div>

          <div className="sm:col-span-4">
            <Select
              value={courseId ?? "all"}
              onValueChange={(v) => {
                setCourseId(v === "all" ? null : v);
                setOffset(0);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="All courses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All courses</SelectItem>
                {courseOptions.map((c: any) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="sm:col-span-3">
            <Select
              value={completed}
              onValueChange={(v) => {
                setCompleted(v as any);
                setOffset(0);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Completion" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="false">In progress</SelectItem>
                <SelectItem value="true">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Errors */}
        {rowsError || summaryError ? (
          <Card>
            <CardContent className="py-6">
              <p className="font-medium">Couldn’t load progress</p>
              <p className="text-sm text-muted-foreground mt-1">
                {rowsError?.message || summaryError?.message}
              </p>
              <Button className="mt-4" onClick={refresh}>
                Try again
              </Button>
            </CardContent>
          </Card>
        ) : null}

        {/* Table */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {rows.length} rows {useMock ? `of ${rows.length}` : ""}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="neutral"
                  disabled={offset === 0 || isLoading}
                  onClick={() => setOffset((o) => Math.max(0, o - limit))}
                >
                  Prev
                </Button>
                <Button
                  variant="neutral"
                  disabled={rows.length < limit || isLoading}
                  onClick={() => setOffset((o) => o + limit)}
                >
                  Next
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {rowsLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            ) : rows.length === 0 ? (
              <div className="py-10 text-center">
                <p className="font-medium">No progress data</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Try removing filters or enrolling users to courses.
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead className="w-[220px]">Progress</TableHead>
                    <TableHead>Lessons</TableHead>
                    <TableHead>Quizzes</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Started</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {rows.map((row: any) => {
                    const p = row.progress;
                    const pct = safePct(p?.progressPercentage);
                    const lessons = `${p?.completedLessons ?? 0}/${p?.totalLessons ?? 0}`;
                    const quizzes = `${p?.completedQuizzes ?? 0}/${p?.totalQuizzes ?? 0}`;
                    const score = safeNum(p?.averageScore, null);
                    const isCompleted = Boolean(p?.completed);
                    const hasStarted = Boolean(p?.startedAt);

                    return (
                      <TableRow key={`${row.user?.id}:${row.course?.id}`}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={row.user?.profilePicture ?? ""}
                                alt={formatName(row.user)}
                              />
                              <AvatarFallback>
                                {initials(
                                  row.user?.fullName || row.user?.email,
                                )}
                              </AvatarFallback>
                            </Avatar>

                            <div className="flex flex-col">
                              <span className="font-medium">
                                {formatName(row.user)}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {row.user?.email}
                              </span>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium line-clamp-1">
                              {row.course?.title}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {row.course?.category?.name
                                ? `Category: ${row.course.category.name}`
                                : "Category: —"}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>{pct}%</span>
                              <span>{formatDate(p?.updatedAt)}</span>
                            </div>
                            <Progress value={pct} />
                          </div>
                        </TableCell>

                        <TableCell>{lessons}</TableCell>
                        <TableCell>{quizzes}</TableCell>
                        <TableCell>
                          {score == null ? "—" : score.toFixed(1)}
                        </TableCell>
                        <TableCell>{formatDate(p?.startedAt)}</TableCell>

                        <TableCell>
                          {isCompleted ? (
                            <Badge>Completed</Badge>
                          ) : hasStarted ? (
                            <Badge variant="neutral">In progress</Badge>
                          ) : (
                            <Badge variant="dark">Not started</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
