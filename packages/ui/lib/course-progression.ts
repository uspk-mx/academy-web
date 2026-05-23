/**
 * Defines the course progression order based on CEFR sub-levels.
 * Used to determine the "next course" when a student completes one.
 *
 * The key in extraSettings (e.g., "A1A", "A1B") identifies the level.
 * Nursing is standalone with no next course.
 */

const LEVEL_ORDER = [
  "A1A",
  "A1B",
  "A1C",
  "A2A",
  "A2B",
  "A2C",
] as const;

type LevelCode = (typeof LEVEL_ORDER)[number];

type CourseWithExtras = {
  id: string;
  title?: string | null;
  extraSettings?: Array<{ key: string; value: string }> | null;
};

/**
 * Extracts the level code (e.g., "A1A") from a course's extraSettings.
 */
export function getLevelCode(course: CourseWithExtras): string | null {
  const setting = course.extraSettings?.find(
    (s) => s.value === "full" || LEVEL_ORDER.includes(s.key as LevelCode),
  );
  return setting?.key ?? null;
}

/**
 * Given the current course and all enrolled courses, returns the next course
 * in the progression sequence, or null if there isn't one.
 */
export function getNextCourse(
  currentCourse: CourseWithExtras,
  allCourses: CourseWithExtras[],
): CourseWithExtras | null {
  const currentLevel = getLevelCode(currentCourse);
  if (!currentLevel) return null;

  const currentIndex = LEVEL_ORDER.indexOf(currentLevel as LevelCode);
  if (currentIndex === -1 || currentIndex >= LEVEL_ORDER.length - 1) return null;

  const nextLevel = LEVEL_ORDER[currentIndex + 1];

  return (
    allCourses.find((c) => {
      const level = getLevelCode(c);
      return level === nextLevel;
    }) ?? null
  );
}

/**
 * Returns a human-readable label for the next course level.
 * e.g., "A1A" → "A1(a)", "A2B" → "A2(b)"
 */
export function formatLevelLabel(levelCode: string): string {
  if (levelCode === "NURSING") return "Enfermeria";
  if (levelCode.length !== 3) return levelCode;

  const major = levelCode.slice(0, 2); // "A1", "A2", "B1"
  const minor = levelCode[2].toLowerCase(); // "a", "b", "c"
  return `${major}(${minor})`;
}
