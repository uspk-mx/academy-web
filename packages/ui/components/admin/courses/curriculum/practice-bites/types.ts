import type {
  PracticeBitesByLessonIdQuery,
  SubmitPracticeBiteMutation,
} from "gql-generated/generated/types";
import { PracticeBiteItemType } from "gql-generated/generated/types";

export type PracticeBite =
  PracticeBitesByLessonIdQuery["practiceBitesByLessonId"][number];

export type PracticeBiteItem = NonNullable<PracticeBite["items"]>[number];

export type PracticeBiteItemSolution = NonNullable<PracticeBiteItem["solution"]>;

export type SubmissionResult =
  SubmitPracticeBiteMutation["submitPracticeBite"];

export type SubmissionItemResult = SubmissionResult["itemResults"][number];

export const MATCHING_COLUMN_COUNT = 4;

export const PRACTICE_BITE_ITEM_TYPE_LABELS: Record<
  PracticeBiteItemType,
  string
> = {
  [PracticeBiteItemType.TrueFalse]: "Verdadero o Falso",
  [PracticeBiteItemType.ImageShortPhrase]: "Imagen y frase corta",
  [PracticeBiteItemType.FillInTheBlanks]: "Completa los espacios",
  [PracticeBiteItemType.Matching_4Column]: "Relacionar columnas",
};

export const PRACTICE_BITE_ITEM_TYPE_OPTIONS: {
  value: PracticeBiteItemType;
  label: string;
}[] = (Object.keys(PRACTICE_BITE_ITEM_TYPE_LABELS) as PracticeBiteItemType[]).map(
  (value) => ({
    value,
    label: PRACTICE_BITE_ITEM_TYPE_LABELS[value],
  }),
);

/**
 * Authors mark a fill-in-the-blanks gap by typing three (or more) underscores
 * in the prompt, e.g. "Un GraphQL ___ define los tipos.". Admin and learner
 * surfaces share this helper so blanks are detected and rendered identically.
 */
export const PRACTICE_BITE_BLANK_REGEX = /_{3,}/g;

/** Number of blanks (`___`) present in a fill-in-the-blanks prompt. */
export function countPracticeBiteBlanks(prompt: string): number {
  return (prompt.match(PRACTICE_BITE_BLANK_REGEX) ?? []).length;
}

/**
 * Split a prompt into the text segments around each blank. For N blanks this
 * returns N + 1 segments, so renderers can interleave segment/blank/segment…
 */
export function splitPracticeBitePrompt(prompt: string): string[] {
  return prompt.split(PRACTICE_BITE_BLANK_REGEX);
}
