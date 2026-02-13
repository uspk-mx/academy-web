export const mockCompanyCourseProgressData = {
  __typename: "Query" as const,
  companyCourseProgress: [
    {
      __typename: "CompanyCourseProgressRow" as const,
      user: {
        __typename: "User" as const,
        id: "u-1",
        fullName: "María González",
        email: "maria@empresa.com",
        profilePicture: null,
      },
      course: {
        __typename: "Course" as const,
        id: "c-104",
        title: "Seguridad básica (Phishing & MFA)",
        featuredImage: "https://picsum.photos/seed/security/400/240",
        category: {
          __typename: "Category" as const,
          id: "cat-security",
          name: "Security",
        },
      },
      progress: {
        __typename: "CourseProgress" as const,
        id: "cp-1",
        completedLessons: 8,
        completedQuizzes: 2,
        totalLessons: 8,
        totalQuizzes: 2,
        progressPercentage: 100,
        startedAt: "2026-01-10T12:00:00Z",
        completed: true,
        completedAt: "2026-01-12T18:30:00Z",
        averageScore: 94.5,
        updatedAt: "2026-01-12T18:30:00Z",
      },
    },
    {
      __typename: "CompanyCourseProgressRow" as const,
      user: {
        __typename: "User" as const,
        id: "u-2",
        fullName: "Luis Pérez",
        email: "luis@empresa.com",
        profilePicture: null,
      },
      course: {
        __typename: "Course" as const,
        id: "c-103",
        title: "Atención al cliente: casos y playbooks",
        featuredImage: "https://picsum.photos/seed/support/400/240",
        category: {
          __typename: "Category" as const,
          id: "cat-support",
          name: "Support",
        },
      },
      progress: {
        __typename: "CourseProgress" as const,
        id: "cp-2",
        completedLessons: 5,
        completedQuizzes: 1,
        totalLessons: 12,
        totalQuizzes: 3,
        progressPercentage: 42.3,
        startedAt: "2026-01-15T09:20:00Z",
        completed: false,
        completedAt: null,
        averageScore: 78.0,
        updatedAt: "2026-01-23T15:10:00Z",
      },
    },
    {
      __typename: "CompanyCourseProgressRow" as const,
      user: {
        __typename: "User" as const,
        id: "u-3",
        fullName: "Ana López",
        email: "ana@empresa.com",
        profilePicture: "https://i.pravatar.cc/80?img=32",
      },
      course: {
        __typename: "Course" as const,
        id: "c-101",
        title: "Excel para negocios (Fundamentos)",
        featuredImage: "https://picsum.photos/seed/excel/400/240",
        category: {
          __typename: "Category" as const,
          id: "cat-ops",
          name: "Operations",
        },
      },
      // Enrolled pero "sin progreso" (tu backend arma defaults)
      progress: {
        __typename: "CourseProgress" as const,
        id: "",
        completedLessons: 0,
        completedQuizzes: 0,
        totalLessons: 0,
        totalQuizzes: 0,
        progressPercentage: 0,
        startedAt: "",
        completed: false,
        completedAt: null,
        averageScore: null,
        updatedAt: "2026-01-25T00:00:00Z",
      },
    },
    {
      __typename: "CompanyCourseProgressRow" as const,
      user: {
        __typename: "User" as const,
        id: "u-4",
        fullName: "Carlos Ruiz",
        email: "carlos@empresa.com",
        profilePicture: "https://i.pravatar.cc/80?img=12",
      },
      course: {
        __typename: "Course" as const,
        id: "c-102",
        title: "Introducción a Ventas B2B",
        featuredImage: "https://picsum.photos/seed/sales/400/240",
        category: {
          __typename: "Category" as const,
          id: "cat-sales",
          name: "Sales",
        },
      },
      progress: {
        __typename: "CourseProgress" as const,
        id: "cp-4",
        completedLessons: 14,
        completedQuizzes: 2,
        totalLessons: 16,
        totalQuizzes: 2,
        progressPercentage: 88,
        startedAt: "2026-01-05T08:00:00Z",
        completed: false,
        completedAt: null,
        averageScore: 91.25,
        updatedAt: "2026-01-22T17:00:00Z",
      },
    },
  ],
};

export const mockCompanyCourseProgressSummaryData = {
  __typename: "Query" as const,
  companyCourseProgressSummary: [
    {
      __typename: "CompanyCourseProgressSummary" as const,
      enrolledCount: 12,
      startedCount: 9,
      completedCount: 3,
      avgProgressPercentage: 46.2,
      course: {
        __typename: "Course" as const,
        id: "c-101",
        title: "Excel para negocios (Fundamentos)",
        featuredImage: "https://picsum.photos/seed/excel/400/240",
        category: {
          __typename: "Category" as const,
          id: "cat-ops",
          name: "Operations",
        },
      },
    },
    {
      __typename: "CompanyCourseProgressSummary" as const,
      enrolledCount: 8,
      startedCount: 6,
      completedCount: 2,
      avgProgressPercentage: 58.4,
      course: {
        __typename: "Course" as const,
        id: "c-102",
        title: "Introducción a Ventas B2B",
        featuredImage: "https://picsum.photos/seed/sales/400/240",
        category: {
          __typename: "Category" as const,
          id: "cat-sales",
          name: "Sales",
        },
      },
    },
    {
      __typename: "CompanyCourseProgressSummary" as const,
      enrolledCount: 14,
      startedCount: 10,
      completedCount: 6,
      avgProgressPercentage: 71.1,
      course: {
        __typename: "Course" as const,
        id: "c-103",
        title: "Atención al cliente: casos y playbooks",
        featuredImage: "https://picsum.photos/seed/support/400/240",
        category: {
          __typename: "Category" as const,
          id: "cat-support",
          name: "Support",
        },
      },
    },
    {
      __typename: "CompanyCourseProgressSummary" as const,
      enrolledCount: 22,
      startedCount: 18,
      completedCount: 15,
      avgProgressPercentage: 86.0,
      course: {
        __typename: "Course" as const,
        id: "c-104",
        title: "Seguridad básica (Phishing & MFA)",
        featuredImage: "https://picsum.photos/seed/security/400/240",
        category: {
          __typename: "Category" as const,
          id: "cat-security",
          name: "Security",
        },
      },
    },
  ],
};

type MockUser = {
  id: string;
  fullName: string;
  email: string;
  profilePicture?: string | null;
};
type MockCategory = { id: string; name: string };
type MockCourse = {
  id: string;
  title: string;
  featuredImage: string;
  category?: MockCategory | null;
};
type MockProgress = {
  id: string;
  completedLessons?: number | null;
  completedQuizzes?: number | null;
  totalLessons?: number | null;
  totalQuizzes?: number | null;
  progressPercentage: number;
  startedAt: string;
  completed?: boolean | null;
  completedAt?: string | null;
  averageScore?: number | null;
  updatedAt: string;
};

type MockRow = { user: MockUser; course: MockCourse; progress: MockProgress };
type MockSummary = {
  enrolledCount: number;
  startedCount: number;
  completedCount: number;
  avgProgressPercentage: number;
  course: MockCourse;
};


type User = {
  id: string;
  fullName: string;
  email: string;
  profilePicture?: string | null;
};
type Category = { id: string; name: string };
type Course = {
  id: string;
  title: string;
  featuredImage: string;
  category?: Category | null;
};

type CourseProgress = {
  id: string;
  completedLessons?: number | null;
  completedQuizzes?: number | null;
  totalLessons?: number | null;
  totalQuizzes?: number | null;
  progressPercentage: number;
  startedAt: string;
  completed?: boolean | null;
  completedAt?: string | null;
  averageScore?: number | null;
  updatedAt: string;
};

type Row = { user: User; course: Course; progress: CourseProgress };

type Summary = {
  enrolledCount: number;
  startedCount: number;
  completedCount: number;
  avgProgressPercentage: number;
  course: Course;
};

type Filter = {
  searchUser?: string | null;
  courseId?: string | null;
  completed?: boolean | null;
  limit?: number | null;
  offset?: number | null;
};


export type CompanyCourseProgressRow = {
  __typename: "CompanyCourseProgressRow";
  user: User;
  course: Course;
  progress: CourseProgress;
};

export type CompanyCourseProgressSummary = {
  __typename: "CompanyCourseProgressSummary";
  enrolledCount: number;
  startedCount: number;
  completedCount: number;
  avgProgressPercentage: number;
  course: Course;
};

export type CompanyCourseProgressQuery = {
  __typename: "Query";
  companyCourseProgress: CompanyCourseProgressRow[];
};

export type CompanyCourseProgressSummaryQuery = {
  __typename: "Query";
  companyCourseProgressSummary: CompanyCourseProgressSummary[];
};

export type CompanyCourseProgressFilter = {
  courseId?: string | null;
  searchUser?: string | null;
  completed?: boolean | null;
  limit?: number | null;
  offset?: number | null;
};

export type MockParams = {
  companyId: string;
  filter?: CompanyCourseProgressFilter | null;
};

/** stable, offline "image" (svg data uri) */
function svgDataUri(label: string) {
  const safe = label.replace(/&/g, "&amp;").replace(/</g, "&lt;").slice(0, 24);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360">
  <rect width="100%" height="100%" fill="#111827"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
        fill="#E5E7EB" font-family="ui-sans-serif,system-ui" font-size="32">${safe}</text>
</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function norm(s: string) {
  return s.trim().toLowerCase();
}

function safePct(v: any) {
  const n = typeof v === "number" ? v : Number(v ?? 0);
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(100, n));
}

function isoDaysAgo(days: number) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

/** --- DATASET (single place) --- */
type BaseRow = { user: User; course: Course; progress: CourseProgress };


function buildDataset(companyId: string) {
  // make it companyId dependent (so different companies look different)
  const seed = companyId.split("-")[0]?.length ?? 6;

  const categories: Category[] = [
    //@ts-ignore
    { __typename: "Category", id: "cat_sales", name: "Sales" },
    //@ts-ignore
    { __typename: "Category", id: "cat_eng", name: "Engineering" },
    //@ts-ignore
    { __typename: "Category", id: "cat_ops", name: "Operations" },
  ];

  const courses: Course[] = [
    //@ts-ignore
    { __typename: "Course", id: "c1", title: "Cold Outreach Fundamentals", featuredImage: svgDataUri("Outreach"), category: categories[0] },
        //@ts-ignore
    { __typename: "Course", id: "c2", title: "Negotiation & Objections", featuredImage: svgDataUri("Negotiation"), category: categories[0] },
        //@ts-ignore
    { __typename: "Course", id: "c3", title: "TypeScript for Production", featuredImage: svgDataUri("TypeScript"), category: categories[1] },
        //@ts-ignore
    { __typename: "Course", id: "c4", title: "GraphQL Basics", featuredImage: svgDataUri("GraphQL"), category: categories[1] },
        //@ts-ignore
    { __typename: "Course", id: "c5", title: "Incident Response 101", featuredImage: svgDataUri("Incident"), category: categories[2] },
        //@ts-ignore
    { __typename: "Course", id: "c6", title: "Process & SOPs", featuredImage: svgDataUri("SOPs"), category: categories[2] },
  ];

  const users: User[] = [
    //@ts-ignore
    { __typename: "User", id: "u1", fullName: "Ana López", email: "ana@company.com", profilePicture: null },
        //@ts-ignore
    { __typename: "User", id: "u2", fullName: "Diego Ramírez", email: "diego@company.com", profilePicture: null },
        //@ts-ignore
    { __typename: "User", id: "u3", fullName: "María Torres", email: "maria@company.com", profilePicture: null },
        //@ts-ignore
    { __typename: "User", id: "u4", fullName: "Luis Hernández", email: "luis@company.com", profilePicture: null },
        //@ts-ignore
    { __typename: "User", id: "u5", fullName: "Sofía García", email: "sofia@company.com", profilePicture: null },
  ];

  const rows: BaseRow[] = [];
  let i = 0;

  for (const u of users) {
    for (const c of courses) {
      // deterministic "enrollment" gaps
      if ((u.id === "u1" && c.id === "c5") || (u.id === "u5" && c.id === "c1")) continue;
      if ((u.id === "u4" && c.category?.id === "cat_sales")) continue;

      const totalLessons = 8 + ((i + seed) % 7); // 8..14
      const totalQuizzes = 1 + ((i + seed) % 4); // 1..4

      const hash = (u.id.charCodeAt(1) + c.id.charCodeAt(1) + i + seed) % 100;

      const pct =
        hash < 15 ? 0 :
        hash < 55 ? 25 + (hash % 40) :
        hash < 85 ? 65 + (hash % 25) :
        100;

      const completed = pct >= 100;
      const completedLessons = clamp(Math.round((pct / 100) * totalLessons), 0, totalLessons);
      const completedQuizzes = clamp(Math.round((pct / 100) * totalQuizzes), 0, totalQuizzes);

      const startedAt = pct === 0 ? "" : isoDaysAgo(20 - (hash % 18));
      const updatedAt = pct === 0 ? isoDaysAgo(25) : isoDaysAgo(10 - (hash % 9));

      rows.push({
        user: u,
        course: c,
        progress: {
          //@ts-ignore
          __typename: "CourseProgress",
          id: `cp_${u.id}_${c.id}`,
          completedLessons,
          completedQuizzes,
          totalLessons,
          totalQuizzes,
          progressPercentage: pct,
          startedAt,
          completed,
          completedAt: completed ? isoDaysAgo(1 + (hash % 5)) : null,
          averageScore: pct === 0 ? null : clamp(55 + (hash % 45), 0, 100),
          updatedAt,
        },
      });

      i++;
    }
  }

  return { rows, courses };
}

/** Filter BEFORE slice (like you asked) */
function applyFilter(rows: BaseRow[], filter?: CompanyCourseProgressFilter | null) {
  const courseId = filter?.courseId ?? null;
  const completed = typeof filter?.completed === "boolean" ? filter!.completed : null;
  const s = filter?.searchUser ? norm(filter.searchUser) : "";

  let out = rows;

  if (courseId) out = out.filter((r) => r.course.id === courseId);

  if (s) {
    out = out.filter((r) => {
      const name = norm(r.user.fullName ?? "");
      const email = norm(r.user.email ?? "");
      return name.includes(s) || email.includes(s);
    });
  }

  if (completed !== null) {
    out = out.filter((r) => Boolean(r.progress.completed) === completed);
  }

  // match SQL: ORDER BY c.title ASC, u.full_name ASC
  out = [...out].sort((a, b) => {
    const ct = a.course.title.localeCompare(b.course.title);
    if (ct !== 0) return ct;
    return a.user.fullName.localeCompare(b.user.fullName);
  });

  return out;
}

function paginate<T>(items: T[], limit = 20, offset = 0) {
  const l = Math.max(1, limit);
  const o = Math.max(0, offset);
  return items.slice(o, o + l);
}

/** --- Public mock query functions (match your URQL queries) --- */
export function mockCompanyCourseProgress(params: MockParams): CompanyCourseProgressQuery {
  const { rows } = buildDataset(params.companyId);
  const filtered = applyFilter(rows, params.filter);

  const limit = params.filter?.limit ?? 20;
  const offset = params.filter?.offset ?? 0;

  const page = paginate(filtered, limit, offset).map((r) => ({
    __typename: "CompanyCourseProgressRow" as const,
    user: r.user,
    course: r.course,
    progress: r.progress,
  }));

  return { __typename: "Query", companyCourseProgress: page };
}

export function mockCompanyCourseProgressSummary(params: MockParams): CompanyCourseProgressSummaryQuery {
  const { rows, courses } = buildDataset(params.companyId);
  const filtered = applyFilter(rows, params.filter);

  // summaries should respect SAME filters (except pagination)
  // If courseId filter exists, only show that course
  const courseId = params.filter?.courseId ?? null;
  const courseList = courseId ? courses.filter((c) => c.id === courseId) : courses;

  const byCourse = new Map<string, BaseRow[]>();
  for (const r of filtered) {
    const list = byCourse.get(r.course.id) ?? [];
    list.push(r);
    byCourse.set(r.course.id, list);
  }

  const summary = courseList.map((course) => {
    const list = byCourse.get(course.id) ?? [];
    const enrolledCount = list.length;
    const startedCount = list.filter((r) => safePct(r.progress.progressPercentage) > 0).length;
    const completedCount = list.filter((r) => Boolean(r.progress.completed)).length;
    const avgProgressPercentage =
      enrolledCount === 0
        ? 0
        : Math.round(list.reduce((a, r) => a + safePct(r.progress.progressPercentage), 0) / enrolledCount);

    return {
      __typename: "CompanyCourseProgressSummary" as const,
      enrolledCount,
      startedCount,
      completedCount,
      avgProgressPercentage,
      course,
    };
  });

  summary.sort((a, b) => a.course.title.localeCompare(b.course.title));
  return { __typename: "Query", companyCourseProgressSummary: summary };
}

/** Export helper (CSV) - exports ALL filtered rows (no pagination) */
export function mockExportCompanyCourseProgressCsv(params: MockParams): string {
  const { rows } = buildDataset(params.companyId);
  const filtered = applyFilter(rows, params.filter);

  const headers = [
    "user_name",
    "user_email",
    "course_title",
    "category",
    "progress_pct",
    "completed",
    "lessons",
    "quizzes",
    "avg_score",
    "started_at",
    "updated_at",
    "completed_at",
  ];

  const esc = (v: any) => {
    const s = String(v ?? "");
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };

  const lines = [
    headers.join(","),
    ...filtered.map((r) => {
      const p = r.progress;
      return [
        r.user.fullName,
        r.user.email,
        r.course.title,
        r.course.category?.name ?? "",
        safePct(p.progressPercentage),
        Boolean(p.completed),
        `${p.completedLessons ?? 0}/${p.totalLessons ?? 0}`,
        `${p.completedQuizzes ?? 0}/${p.totalQuizzes ?? 0}`,
        p.averageScore ?? "",
        p.startedAt ?? "",
        p.updatedAt ?? "",
        p.completedAt ?? "",
      ].map(esc).join(",");
    }),
  ];

  return lines.join("\n");
}

