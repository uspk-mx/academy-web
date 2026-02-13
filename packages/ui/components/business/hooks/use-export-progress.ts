import { useClient } from "urql";
import { CompanyCourseProgressDocument } from "gql-generated/gql/graphql";
import type {
  CompanyCourseProgressFilter,
  Course,
  CourseProgress,
  User,
} from "gql-generated/generated/types";
import { downloadTextFile, toCsv } from "../utils";

export function useExportProgress({
  companyId,
  filter,
}: {
  companyId: string;
  filter: CompanyCourseProgressFilter;
}) {
  const client = useClient();

  async function exportAll() {
    if (!companyId) return;

    const pageSize = 200;
    let offset = 0;
    const all: {
      user?: User;
      course?: Course;
      progress?: CourseProgress;
    }[] = [];

    while (true) {
      const res = await client
        .query(CompanyCourseProgressDocument, {
          companyId,
          filter: { ...filter, limit: pageSize, offset },
        })
        .toPromise();

      if (res.error) throw res.error;

      const batch = res.data?.companyCourseProgress ?? [];
      // @ts-ignore -- should be spread it.
      all.push(...batch);

      if (batch.length < pageSize) break;
      offset += pageSize;
    }

    const flat = all.map(
      (row: { user?: User; course?: Course; progress?: CourseProgress }) => {
        const u = row.user;
        const c = row.course;
        const p = row.progress;

        return {
          userId: u?.id,
          fullName: u?.fullName,
          email: u?.email,
          courseId: c?.id,
          courseTitle: c?.title,
          categoryName: c?.category?.name ?? "",
          progressPercentage: p?.progressPercentage ?? 0,
          completedLessons: p?.completedLessons ?? 0,
          totalLessons: p?.totalLessons ?? 0,
          completedQuizzes: p?.completedQuizzes ?? 0,
          totalQuizzes: p?.totalQuizzes ?? 0,
          completed: p?.completed ?? false,
          startedAt: p?.startedAt ?? "",
          updatedAt: p?.updatedAt ?? "",
          completedAt: p?.completedAt ?? "",
          averageScore: p?.averageScore ?? "",
        };
      },
    );

    const csv = toCsv(flat);
    downloadTextFile(
      `company-course-progress-${new Date().toISOString().slice(0, 10)}.csv`,
      csv,
    );
  }

  return { exportAll };
}
