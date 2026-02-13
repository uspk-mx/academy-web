import * as React from "react";
import { useQuery } from "urql";
import { Link } from "react-router";

import { Button } from "ui/components/button";
import { Card, CardContent, CardHeader } from "ui/components/card";
import { Badge } from "ui/components/badge";
import { Progress } from "ui/components/progress";
import { Skeleton } from "ui/components/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "ui/components/table";
import { useCompanyId } from "ui/components/business/hooks/use-company-id";
import {
  BusinessDashboardPeopleDocument,
  CompanyCourseProgressDocument,
  CompanyCourseProgressSummaryDocument,
  CompanyCoursesDocument,
  CompanyUsersDocument,
  GetUsersDocument,
} from "gql-generated/gql/graphql";

function safePct(v: any) {
  const n = typeof v === "number" ? v : Number(v ?? 0);
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(100, n));
}

function formatDate(iso?: string | null) {
  if (!iso) return "—";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "—" : d.toLocaleDateString();
}

function formatName(user: any) {
  return user?.fullName || user?.email || "—";
}

export default function BusinessDashboardPage() {
  const companyId = useCompanyId();

  const [
    { data: coursesData, fetching: coursesLoading, error: coursesError },
    reexecCourses,
  ] = useQuery({
    query: CompanyCoursesDocument,
    variables: { companyId },
    pause: !companyId,
    requestPolicy: "cache-and-network",
  });

  const [
    { data: summaryData, fetching: summaryLoading, error: summaryError },
    reexecSummary,
  ] = useQuery({
    query: CompanyCourseProgressSummaryDocument,
    variables: { companyId },
    pause: !companyId,
    requestPolicy: "cache-and-network",
  });

  const [
    { data: recentData, fetching: recentLoading, error: recentError },
    reexecRecent,
  ] = useQuery({
    query: CompanyCourseProgressDocument,
    variables: { companyId },
    pause: !companyId,
    requestPolicy: "cache-and-network",
  });

  const [
    { data: peopleData, fetching: peopleLoading, error: peopleError },
    reexecPeople,
  ] = useQuery({
    query: BusinessDashboardPeopleDocument,
    variables: { companyId },
    pause: !companyId,
    requestPolicy: "cache-and-network",
  });

  const courses = coursesData?.companyCourses ?? [];
  const summaries = summaryData?.companyCourseProgressSummary ?? [];
  const recentRows = recentData?.companyCourseProgress ?? [];

  const admins = peopleData?.companyAdmins ?? [];
  const users = peopleData?.companyUsers ?? [];

  const refresh = () => {
    reexecCourses({ requestPolicy: "network-only" });
    reexecSummary({ requestPolicy: "network-only" });
    reexecRecent({ requestPolicy: "network-only" });
    reexecPeople({ requestPolicy: "network-only" });
  };

  const anyError = coursesError || summaryError || recentError || peopleError;
  const isLoading =
    coursesLoading || summaryLoading || recentLoading || peopleLoading;

  const totals = React.useMemo(() => {
    const enrolled = summaries.reduce(
      (a: number, s: any) => a + (s.enrolledCount ?? 0),
      0,
    );
    const started = summaries.reduce(
      (a: number, s: any) => a + (s.startedCount ?? 0),
      0,
    );
    const completed = summaries.reduce(
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

    return {
      enrolled,
      started,
      completed,
      avg: Math.round(avg),
    };
  }, [summaries]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Overview of your company learning platform.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="neutral"
            onClick={refresh}
            disabled={!companyId || isLoading}
          >
            Refresh
          </Button>
          <Button asChild variant="ghost">
            <Link to="/licenses">Go to licenses</Link>
          </Button>
        </div>
      </div>

      {/* Error state */}
      {anyError ? (
        <Card>
          <CardContent className="py-6">
            <p className="font-medium">Couldn’t load dashboard</p>
            <p className="text-sm text-muted-foreground mt-1">
              {anyError.message}
            </p>
            <Button className="mt-4" onClick={refresh}>
              Try again
            </Button>
          </CardContent>
        </Card>
      ) : null}

      {/* Top cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <p className="text-sm text-muted-foreground">Employees</p>
            {peopleLoading ? (
              <Skeleton className="h-7 w-16" />
            ) : (
              <p className="text-2xl font-semibold">{users.length}</p>
            )}
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-xs text-muted-foreground">
              Active learners in your company.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <p className="text-sm text-muted-foreground">Admins</p>
            {peopleLoading ? (
              <Skeleton className="h-7 w-16" />
            ) : (
              <p className="text-2xl font-semibold">{admins.length}</p>
            )}
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-xs text-muted-foreground">
              Business admins who manage the platform.
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

        <Card>
          <CardHeader className="pb-2">
            <p className="text-sm text-muted-foreground">Completed</p>
            {summaryLoading ? (
              <Skeleton className="h-7 w-16" />
            ) : (
              <p className="text-2xl font-semibold">{totals.completed}</p>
            )}
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-xs text-muted-foreground">
              Completed enrollments across included courses.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Middle: Included courses (cards) + Progress summary (mini list) */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <Card className="lg:col-span-7">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Included courses</p>
                <p className="text-sm text-muted-foreground">
                  Based on your paid plan categories.
                </p>
              </div>
              <Button asChild variant="ghost">
                <Link to="/courses/catalog">View all</Link>
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            {coursesLoading ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full" />
                ))}
              </div>
            ) : courses.length === 0 ? (
              <div className="py-10 text-center">
                <p className="font-medium">No courses available</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Your plan categories don’t include any published courses yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {courses.map((c: any) => (
                  <div key={c.id} className="flex gap-3 rounded-xl border p-3">
                    <div className="h-16 w-16 overflow-hidden rounded-lg bg-muted">
                      {c.featuredImage ? (
                        <img
                          src={c.featuredImage}
                          alt=""
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      ) : null}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium line-clamp-1">{c.title}</p>
                      <div className="mt-1 flex items-center gap-2">
                        {c.category?.name ? (
                          <Badge variant="neutral" className="truncate">
                            {c.category.name}
                          </Badge>
                        ) : (
                          <Badge variant="neutral">Category: —</Badge>
                        )}
                        <span className="text-xs text-muted-foreground">
                          Updated {formatDate(c.updatedAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {coursesError ? (
              <p className="mt-3 text-sm text-destructive">
                {coursesError.message}
              </p>
            ) : null}
          </CardContent>
        </Card>

        <Card className="lg:col-span-5">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Course progress summary</p>
                <p className="text-sm text-muted-foreground">
                  Top courses by average progress.
                </p>
              </div>
              <Button asChild variant="ghost">
                <Link to="/courses/progress">Open report</Link>
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            {summaryLoading ? (
              <>
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </>
            ) : summaries.length === 0 ? (
              <div className="py-10 text-center">
                <p className="font-medium">No progress yet</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Enroll users to start tracking.
                </p>
              </div>
            ) : (
              summaries
                .slice()
                .sort(
                  (a: any, b: any) =>
                    safePct(b.avgProgressPercentage) -
                    safePct(a.avgProgressPercentage),
                )
                .slice(0, 6)
                .map((s: any) => {
                  const pct = safePct(s.avgProgressPercentage);
                  return (
                    <div key={s.course.id} className="space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium line-clamp-1">
                          {s.course.title}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {pct}%
                        </span>
                      </div>
                      <Progress value={pct} />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{s.enrolledCount} enrolled</span>
                        <span>{s.completedCount} completed</span>
                      </div>
                    </div>
                  );
                })
            )}

            {summaryError ? (
              <p className="text-sm text-destructive">{summaryError.message}</p>
            ) : null}
          </CardContent>
        </Card>
      </div>

      {/* Bottom: Recent progress table */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Recent learner activity</p>
              <p className="text-sm text-muted-foreground">
                Latest progress updates across included courses.
              </p>
            </div>
            <Button asChild variant="ghost">
              <Link to="/courses/progress">View all</Link>
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {recentLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : recentRows.length === 0 ? (
            <div className="py-10 text-center">
              <p className="font-medium">No activity</p>
              <p className="text-sm text-muted-foreground mt-1">
                Once users start learning, updates will show here.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead className="w-55">Progress</TableHead>
                  <TableHead>Lessons</TableHead>
                  <TableHead>Quizzes</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentRows.map((row: any) => {
                  const p = row.progress;
                  const pct = safePct(p?.progressPercentage);
                  const lessons = `${p?.completedLessons ?? 0}/${p?.totalLessons ?? 0}`;
                  const quizzes = `${p?.completedQuizzes ?? 0}/${p?.totalQuizzes ?? 0}`;
                  const score = p?.averageScore ?? null;

                  return (
                    <TableRow key={`${row.user.id}:${row.course.id}`}>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {formatName(row.user)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {row.user.email}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium line-clamp-1">
                            {row.course.title}
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
                        {score == null ? "—" : Number(score).toFixed(1)}
                      </TableCell>
                      <TableCell>{formatDate(p?.updatedAt)}</TableCell>

                      <TableCell>
                        {p?.completed ? (
                          <Badge>Completed</Badge>
                        ) : (
                          <Badge variant="neutral">In progress</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}

          {recentError ? (
            <p className="mt-3 text-sm text-destructive">
              {recentError.message}
            </p>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
