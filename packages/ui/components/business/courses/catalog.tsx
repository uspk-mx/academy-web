import {
  CompanyCoursesDocument,
  type CompanyCoursesFilter,
  type CourseStatus,
  type Visibility,
} from "gql-generated/gql/graphql";
import * as React from "react";
import { useQuery } from "urql";

import { Badge, type BadgeProps } from "ui/components/badge";
import { Button } from "ui/components/button";
import { Card, CardContent, CardFooter, CardHeader } from "ui/components/card";
import { Input } from "ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "ui/components/select";
import { Skeleton } from "ui/components/skeleton";

import { useDebouncedValue } from "ui/hooks/use-debounced-value";
import { useCompanyId } from "../hooks/use-company-id";
import { PageBreadCrumbs } from "ui/components/admin/page-breadcrumbs";

type Course = {
  id: string;
  title: string;
  shortDescription?: string | null;
  featuredImage?: string | null;
  status?: string | null;
  visibility?: string | null;
  category?: { id: string; name?: string | null } | null;
  updatedAt: string;
};


function formatDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString();
}

function statusBadgeVariant(status?:string) {
  // usa tus tokens custom; esto es neutro
  return "neutral";
}


export function CatalogPage() {
  const companyId = useCompanyId();

    const [search, setSearch] = React.useState("");
  const debouncedSearch = useDebouncedValue(search, 350);

  const [categoryId, setCategoryId] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<CourseStatus | null>(null);
  const [visibility, setVisibility] = React.useState<Visibility | null>(null);


  const [limit, setLimit] = React.useState(20);
  const [offset, setOffset] = React.useState(0);

 const filter: CompanyCoursesFilter = React.useMemo(
    () => ({
      search: debouncedSearch?.trim() ? debouncedSearch.trim() : null,
      categoryId,
      status,
      visibility,
      limit: 20,
      offset: 0,
    }),
    [debouncedSearch, categoryId, status, visibility]
  );

  const [{ data, fetching, error }, reexecute] = useQuery({
    query: CompanyCoursesDocument,
    variables: { companyId, filter },
    pause: !companyId,
    requestPolicy: "cache-and-network",
  });

  const courses: Course[] = data?.companyCourses ?? [];

  // Derive categories from returned data (MVP). Later you can add a dedicated query.
  const categories = React.useMemo(() => {
    const m = new Map<string, string>();
    for (const c of courses) {
      if (c.category?.id)
        m.set(c.category.id, c.category.name ?? c.category.id);
    }
    return Array.from(m.entries()).map(([id, name]) => ({ id, name }));
  }, [courses]);

  const canPrev = offset > 0;
  const canNext = courses.length === limit;

    const clearFilters = () => {
    setSearch("");
    setCategoryId(null);
    setStatus(null);
    setVisibility(null);
    reexecute({ requestPolicy: "network-only" });
  };


  return (
    <>
      <PageBreadCrumbs
        items={[
          {
            href: " ",
            label: "Dashboard",
          },
          { href: "courses/catalog", label: "Catálogo de cursos" },
        ]}
      />
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold">Course catalog</h1>
            <p className="text-sm text-muted-foreground">
              Included by your plan category.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="neutral"
              onClick={() => reexecute({ requestPolicy: "network-only" })}
            >
              Refresh
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-12">
          <div className="sm:col-span-5">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses…"
            />
          </div>

          <div className="sm:col-span-3">
            <Select
              value={status ?? "all"}
              onValueChange={(v) =>
                setStatus(v === "all" ? null : (v as CourseStatus))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All status</SelectItem>
                <SelectItem value="PUBLISHED">Published</SelectItem>
                <SelectItem value="DRAFT">Draft</SelectItem>
                <SelectItem value="IN_PAUSE">In pause</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="sm:col-span-3">
            <Select
              value={visibility ?? "all"}
              onValueChange={(v) =>
                setVisibility(v === "all" ? null : (v as Visibility))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All visibility</SelectItem>
                <SelectItem value="PUBLIC">Public</SelectItem>
                <SelectItem value="PASSWORD_PROTECTED">Password</SelectItem>
                <SelectItem value="PRIVATE">Private</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="sm:col-span-1">
            <Button variant="ghost" onClick={clearFilters} className="w-full">
              Clear
            </Button>
          </div>
        </div>

        {/* Error */}
        {error ? (
          <Card>
            <CardContent className="py-6">
              <div className="text-sm">
                <p className="font-medium">Couldn’t load courses</p>
                <p className="text-muted-foreground mt-1">{error.message}</p>
                <Button
                  className="mt-4"
                  onClick={() => reexecute({ requestPolicy: "network-only" })}
                >
                  Try again
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : null}

        {/* Content */}
        {fetching ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-video">
                  <Skeleton className="h-full w-full" />
                </div>
                <CardHeader className="space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : courses.length === 0 ? (
          <Card>
            <CardContent className="py-10 text-center">
              <p className="font-medium">No courses found</p>
              <p className="text-sm text-muted-foreground mt-1">
                Try adjusting your filters.
              </p>
              <Button className="mt-4" variant="neutral" onClick={clearFilters}>
                Clear filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((c: any) => (
              <Card key={c.id} className="overflow-hidden">
                <div className="aspect-video bg-muted">
                  {/* Si quieres next/image, cámbialo; esto es simple */}
                  {c.featuredImage ? (
                    <img
                      src={c.featuredImage}
                      alt={c.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : null}
                </div>

                <CardHeader className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="neutral">{c.status ?? "—"}</Badge>
                    <Badge variant="neutral">{c.visibility ?? "—"}</Badge>
                    <Badge>Included</Badge>
                  </div>

                  <div>
                    <h3 className="font-semibold leading-tight line-clamp-2">
                      {c.title}
                    </h3>
                    {c.shortDescription ? (
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                        {c.shortDescription}
                      </p>
                    ) : null}
                  </div>
                </CardHeader>

                <CardContent className="text-sm text-muted-foreground">
                  <div className="flex items-center justify-between gap-3">
                    <span className="truncate">
                      {c.category?.name
                        ? `Category: ${c.category.name}`
                        : "Category: —"}
                    </span>
                    <span className="shrink-0">
                      Updated {formatDate(c.updatedAt)}
                    </span>
                  </div>
                </CardContent>

                <CardFooter className="flex items-center justify-between">
                  <Button
                    variant="neutral"
                    onClick={() => {
                      /* navigate(`/courses/${c.id}`) */
                    }}
                  >
                    View details
                  </Button>
                  <Button
                    onClick={() => {
                      /* open */
                    }}
                  >
                    Open
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
