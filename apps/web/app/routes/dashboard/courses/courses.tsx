import type {
  Course,
  GetUserEnrollmentsQuery,
  GetUserEnrollmentsQueryVariables,
} from "gql-generated/gql/graphql";
import { GetUserEnrollmentsDocument } from "gql-generated/gql/graphql";
import {
  Book,
  CheckCircle2,
  Clock,
  MessageCircleQuestionIcon,
  PlayCircle,
  SearchIcon,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import { MembershipCardSkeleton } from "ui/components/admin/memberships/membership-card-skeleton";
import { CourseCard } from "ui/components/courses/course-card";
import { useQuery } from "urql";

type CourseFilter = "all" | "in_progress" | "completed" | "not_started";


export function meta() {
  return [
    { title: `Uspk Academy | Cursos` },
    { name: "description", content: "Lista de cursos del estudiante." },
  ];
}

export default function CoursesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const sortOrder = searchParams.get("sort") || "";

  const [filter, setFilter] = useState<CourseFilter>("all");
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const [{ data, fetching }] = useQuery<
    GetUserEnrollmentsQuery,
    GetUserEnrollmentsQueryVariables
  >({ query: GetUserEnrollmentsDocument });

  const courses = data?.getUserEnrollments;

  const stats = {
    total: courses?.length || 0,
    inProgress:
      courses?.filter(
        (c) =>
          c.course?.progress?.progressPercentage &&
          c.course?.progress?.progressPercentage > 0 &&
          c.course?.progress?.progressPercentage < 100,
      ).length || 0,
    completed:
      courses?.filter((c) => c.course?.progress?.progressPercentage === 100)
        .length || 0,
    notStarted:
      courses?.filter((c) => !c.course?.progress?.progressPercentage).length ||
      0,
  };

  const filteredCourses = courses
    ?.filter((course) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return course.course?.title.toLowerCase().includes(query);
      }
      const progress = course.course?.progress?.progressPercentage || 0;
      if (filter === "in_progress") {
        return progress > 0 && progress < 100;
      }
      if (filter === "completed") {
        return progress === 100;
      }
      if (filter === "not_started") {
        return progress === 0;
      }
      return true; // "all"
    })
    .sort((a, b) => {
      if (sortOrder === "a-z") {
        return (a?.course?.title || "").localeCompare(b?.course?.title || "");
      }
      if (sortOrder === "z-a") {
        return (b?.course?.title || "").localeCompare(a?.course?.title || "");
      }
      if (sortOrder === "progress") {
        return (
          (b?.course?.progress?.progressPercentage || 0) -
          (a?.course?.progress?.progressPercentage || 0)
        );
      }
      if (sortOrder === "oldest") {
        return (
          new Date(a?.course?.createdAt || "").getTime() -
          new Date(b?.course?.createdAt || "").getTime()
        );
      }
      // Default: newest first
      return (
        new Date(b?.course?.createdAt || "").getTime() -
        new Date(a?.course?.createdAt || "").getTime()
      );
    });

  const showNoResults =
    (searchQuery || filter !== "all") && filteredCourses?.length === 0;

  const handleSearch = (value: string) => {
    setLocalSearch(value);
    if (value) {
      setSearchParams({ q: value, sort: sortOrder });
    } else {
      setSearchParams({ sort: sortOrder });
    }
  };

  const handleSort = (value: string) => {
    if (searchQuery) {
      setSearchParams({ q: searchQuery, sort: value });
    } else {
      setSearchParams({ sort: value });
    }
  };

  const handleFilterChange = (newFilter: CourseFilter) => {
    setFilter(newFilter);
    // Reset search when changing filters
    setLocalSearch("");
    setSearchParams({ sort: sortOrder });
  };

  const clearFilters = () => {
    setFilter("all");
    setLocalSearch("");
    setSearchParams({});
  };

  return (
    <div className="flex min-h-screen flex-col gap-6 p-6">
      {/* Header */}
      <div className="relative w-full">
        <div className="relative rounded-xl border-4 border-black bg-card p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-lg border-4 border-black bg-main p-2">
                <Book className="h-8 w-8" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-3xl font-black">Mis Cursos</h1>
                <p className="text-sm text-muted-foreground">
                  {stats.total} {stats.total === 1 ? "curso" : "cursos"} en
                  total
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      {!fetching && courses && courses.length > 0 && (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            {
              label: "En progreso",
              value: stats.inProgress,
              icon: PlayCircle,
              color: "bg-chart-4",
            },
            {
              label: "Completados",
              value: stats.completed,
              icon: CheckCircle2,
              color: "bg-chart-2",
            },
            {
              label: "Sin iniciar",
              value: stats.notStarted,
              icon: Clock,
              color: "bg-muted",
            },
            {
              label: "Progreso total",
              value: `${Math.round((stats.completed / stats.total) * 100) || 0}%`,
              icon: TrendingUp,
              color: "bg-main",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 rounded-xl border-4 border-black bg-card p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 border-black ${stat.color}`}
              >
                <stat.icon className="h-5 w-5" strokeWidth={2.5} />
              </div>
              <div className="min-w-0">
                <p className="text-2xl font-black tabular-nums leading-none">
                  {stat.value}
                </p>
                <p className="truncate text-xs font-bold text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Filters and Search */}
      {!fetching && courses && courses.length > 0 && (
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar cursos por nombre..."
              value={localSearch}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full rounded-xl border-4 border-black bg-card py-3 pl-12 pr-4 font-bold placeholder:text-muted-foreground focus:outline-none focus:ring-4 focus:ring-main"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {[
                { value: "all", label: "Todos", count: stats.total },
                {
                  value: "in_progress",
                  label: "En progreso",
                  count: stats.inProgress,
                },
                {
                  value: "completed",
                  label: "Completados",
                  count: stats.completed,
                },
                {
                  value: "not_started",
                  label: "Sin iniciar",
                  count: stats.notStarted,
                },
              ].map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => handleFilterChange(tab.value as CourseFilter)}
                  className={`rounded-xl border-4 border-black px-4 py-2 font-bold transition-all hover:-translate-y-0.5 ${
                    filter === tab.value
                      ? "bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                      : "bg-card shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold">Ordenar:</span>
              <select
                value={sortOrder}
                onChange={(e) => handleSort(e.target.value)}
                className="rounded-lg border-2 border-black bg-card px-3 py-2 font-bold focus:outline-none focus:ring-2 focus:ring-main"
              >
                <option value="">Más reciente</option>
                <option value="oldest">Más antiguo</option>
                <option value="a-z">A-Z</option>
                <option value="z-a">Z-A</option>
                <option value="progress">Mayor progreso</option>
              </select>
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm font-bold text-muted-foreground">
            {filteredCourses?.length || 0}{" "}
            {filteredCourses?.length === 1 ? "resultado" : "resultados"}
          </p>
        </div>
      )}

      {/* Loading State */}
      {fetching && (
        <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from([1, 2, 3, 4, 5, 6], (index) => (
            <MembershipCardSkeleton key={index} />
          ))}
        </div>
      )}

      {/* No Results */}
      {showNoResults && (
        <div className="col-span-full rounded-2xl border-4 border-black bg-card p-12 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="mx-auto max-w-md space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-black bg-muted">
              <SearchIcon className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-black">No se encontraron cursos</h2>
            <p className="text-muted-foreground">
              {searchQuery
                ? `No hay cursos que coincidan con "${searchQuery}"`
                : "No hay cursos en esta categoría"}
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-2 rounded-xl border-4 border-black bg-main px-6 py-3 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      )}

      {/* Empty State - No courses at all */}
      {!fetching && (!courses || courses.length === 0) && (
        <div className="col-span-full rounded-2xl border-4 border-black bg-card p-12 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="mx-auto max-w-md space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-black bg-main">
              <MessageCircleQuestionIcon className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-black">Aún no tienes ningún curso</h2>
            <p className="text-muted-foreground">
              Explora nuestro catálogo y comienza tu viaje de aprendizaje
            </p>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 rounded-xl border-4 border-black bg-main px-6 py-3 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              Explorar Cursos
            </Link>
          </div>
        </div>
      )}

      {/* Courses Grid */}
      {!fetching && filteredCourses && filteredCourses.length > 0 && (
        <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <CourseCard course={course.course as Course} key={course?.id} />
          ))}
        </div>
      )}
    </div>
  );
}
