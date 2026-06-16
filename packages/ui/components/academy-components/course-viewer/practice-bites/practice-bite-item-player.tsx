import { PracticeBiteItemType } from "gql-generated/generated/types";
import { CheckCircle2, XCircle } from "lucide-react";
import type { ReactNode } from "react";
import { Fragment } from "react";
import { Input } from "ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "ui/components/select";
import { cn } from "ui/lib/utils";
import {
  countPracticeBiteBlanks,
  MATCHING_COLUMN_COUNT,
  splitPracticeBitePrompt,
  type PracticeBiteItem,
  type SubmissionItemResult,
} from "../../../admin/courses/curriculum/practice-bites/types";

export interface PracticeBiteAnswerState {
  booleanAnswer?: boolean | null;
  textAnswer?: string;
  selectedOptions?: string[];
  matchingRows?: string[][];
}

interface PracticeBiteItemPlayerProps {
  item: PracticeBiteItem;
  index: number;
  answer: PracticeBiteAnswerState;
  onChange: (answer: PracticeBiteAnswerState) => void;
  result?: SubmissionItemResult;
  disabled: boolean;
}

export function PracticeBiteItemPlayer({
  item,
  index,
  answer,
  onChange,
  result,
  disabled,
}: PracticeBiteItemPlayerProps): ReactNode {
  const settings = item.settings;

  return (
    <div
      className={cn(
        "rounded-xl border-2 border-border bg-white p-4 shadow-sm dark:bg-[#090E1A]",
        result?.correct && "border-green-500",
        result && !result.correct && "border-red-500",
      )}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <p className="font-medium">
          <span className="mr-2 text-muted-foreground">{index + 1}.</span>
          {item.type === PracticeBiteItemType.FillInTheBlanks
            ? "Completa los espacios"
            : item.prompt}
        </p>
        {result ? (
          result.correct ? (
            <CheckCircle2 className="size-5 shrink-0 text-green-600" />
          ) : (
            <XCircle className="size-5 shrink-0 text-red-600" />
          )
        ) : null}
      </div>

      {item.type === PracticeBiteItemType.TrueFalse ? (
        <div className="flex gap-3">
          {[true, false].map((value) => (
            <button
              className={cn(
                "flex-1 rounded-lg border-2 border-border py-3 text-sm font-medium transition-colors",
                answer.booleanAnswer === value
                  ? "bg-main text-main-foreground"
                  : "bg-white hover:bg-muted dark:bg-transparent",
                disabled && "cursor-not-allowed opacity-70",
              )}
              disabled={disabled}
              key={String(value)}
              onClick={() => onChange({ booleanAnswer: value })}
              type="button"
            >
              {value ? "Verdadero" : "Falso"}
            </button>
          ))}
        </div>
      ) : null}

      {item.type === PracticeBiteItemType.ImageShortPhrase ? (
        <div className="space-y-3">
          {item.media ? (
            <img
              alt={item.prompt}
              className="max-h-64 w-full rounded-lg object-contain"
              src={item.media}
            />
          ) : null}
          <Input
            disabled={disabled}
            onChange={(event) => onChange({ textAnswer: event.target.value })}
            placeholder="Escribe tu respuesta..."
            value={answer.textAnswer ?? ""}
          />
        </div>
      ) : null}

      {item.type === PracticeBiteItemType.FillInTheBlanks ? (
        <FillInTheBlanks
          answer={answer}
          disabled={disabled}
          onChange={onChange}
          options={settings?.options ?? []}
          prompt={item.prompt}
        />
      ) : null}

      {item.type === PracticeBiteItemType.Matching_4Column ? (
        <Matching
          answer={answer}
          columns={settings?.matchingColumns ?? []}
          disabled={disabled}
          onChange={onChange}
        />
      ) : null}

      {result ? (
        <div className="mt-4 space-y-1 rounded-lg bg-muted p-3 text-sm">
          <p className={cn(result.correct ? "text-green-700" : "text-red-700")}>
            {result.feedback}
          </p>
          {result.solutionRevealed && result.answerExplanation ? (
            <p className="text-muted-foreground">{result.answerExplanation}</p>
          ) : null}
          {result.solutionRevealed && result.solution ? (
            <RevealedSolution
              solution={result.solution}
              type={item.type}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function FillInTheBlanks({
  prompt,
  options,
  answer,
  onChange,
  disabled,
}: {
  prompt: string;
  options: string[];
  answer: PracticeBiteAnswerState;
  onChange: (answer: PracticeBiteAnswerState) => void;
  disabled: boolean;
}): ReactNode {
  const segments = splitPracticeBitePrompt(prompt);
  const blanksCount = countPracticeBiteBlanks(prompt);
  const selected = answer.selectedOptions ?? [];

  const setBlank = (blankIndex: number, value: string): void => {
    const next = [...selected];
    next[blankIndex] = value;
    onChange({ selectedOptions: next });
  };

  return (
    <div className="flex flex-wrap items-center gap-2 text-sm leading-8">
      {Array.from({ length: blanksCount }).map((_, blankIndex) => (
        // eslint-disable-next-line react/no-array-index-key -- positional blanks
        <Fragment key={blankIndex}>
          {segments[blankIndex] ? <span>{segments[blankIndex]}</span> : null}
          <Select
            disabled={disabled}
            onValueChange={(value) => setBlank(blankIndex, value)}
            value={selected[blankIndex] ?? ""}
          >
            <SelectTrigger className="h-8 w-auto min-w-32" variant="neutral">
              <SelectValue placeholder={`Espacio ${blankIndex + 1}`} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Fragment>
      ))}
      {segments.length > blanksCount ? (
        <span>{segments[segments.length - 1]}</span>
      ) : null}
    </div>
  );
}

function Matching({
  columns,
  answer,
  onChange,
  disabled,
}: {
  columns: { items: string[] }[];
  answer: PracticeBiteAnswerState;
  onChange: (answer: PracticeBiteAnswerState) => void;
  disabled: boolean;
}): ReactNode {
  const anchors = columns[0]?.items ?? [];
  const rows =
    answer.matchingRows ??
    anchors.map((anchor) => {
      const row = Array.from({ length: MATCHING_COLUMN_COUNT }, () => "");
      row[0] = anchor;
      return row;
    });

  const setCell = (rowIndex: number, colIndex: number, value: string): void => {
    const next = rows.map((row) => [...row]);
    next[rowIndex][colIndex] = value;
    onChange({ matchingRows: next });
  };

  if (anchors.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Este elemento no tiene columnas para relacionar.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {anchors.map((anchor, rowIndex) => (
        <div className="flex items-center gap-2" key={anchor}>
          <div className="flex-1 rounded-lg border-2 border-border bg-muted px-3 py-2 text-sm font-medium">
            {anchor}
          </div>
          {Array.from({ length: MATCHING_COLUMN_COUNT - 1 }).map(
            (_, offset) => {
              const colIndex = offset + 1;
              return (
                <Select
                  disabled={disabled}
                  key={colIndex}
                  onValueChange={(value) =>
                    setCell(rowIndex, colIndex, value)
                  }
                  value={rows[rowIndex]?.[colIndex] ?? ""}
                >
                  <SelectTrigger className="h-9 flex-1" variant="neutral">
                    <SelectValue placeholder={`Columna ${colIndex + 1}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {(columns[colIndex]?.items ?? []).map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              );
            },
          )}
        </div>
      ))}
    </div>
  );
}

function RevealedSolution({
  solution,
  type,
}: {
  solution: NonNullable<SubmissionItemResult["solution"]>;
  type: PracticeBiteItemType;
}): ReactNode {
  return (
    <div className="mt-1 border-t border-border pt-2 text-muted-foreground">
      <span className="font-medium text-foreground">Respuesta correcta: </span>
      {type === PracticeBiteItemType.TrueFalse
        ? solution.correctBoolean
          ? "Verdadero"
          : "Falso"
        : null}
      {type === PracticeBiteItemType.ImageShortPhrase
        ? (solution.acceptedAnswers ?? []).join(", ")
        : null}
      {type === PracticeBiteItemType.FillInTheBlanks
        ? (solution.blanks ?? []).join(", ")
        : null}
      {type === PracticeBiteItemType.Matching_4Column ? (
        <ul className="mt-1 list-disc pl-5">
          {(solution.matchingRows ?? []).map((row) => (
            <li key={row.columns.join("|")}>{row.columns.join(" — ")}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
