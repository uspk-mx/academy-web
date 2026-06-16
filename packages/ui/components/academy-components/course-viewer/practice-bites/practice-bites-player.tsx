import {
  PracticeBitesByLessonIdDocument,
  SubmitPracticeBiteDocument,
} from "gql-generated/gql/graphql";
import type {
  PracticeBiteItemAnswerInput,
  PracticeBitesByLessonIdQuery,
  PracticeBitesByLessonIdQueryVariables,
  SubmitPracticeBiteMutation,
  SubmitPracticeBiteMutationVariables,
} from "gql-generated/generated/types";
import { PracticeBiteItemType } from "gql-generated/generated/types";
import { PartyPopper, Sparkles } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { useMutation, useQuery } from "urql";
import { Button } from "ui/components/button";
import { Progress } from "ui/components/progress";
import { Skeleton } from "ui/components/skeleton";
import { cn } from "ui/lib/utils";
import type {
  PracticeBite,
  SubmissionResult,
} from "../../../admin/courses/curriculum/practice-bites/types";
import {
  PracticeBiteItemPlayer,
  type PracticeBiteAnswerState,
} from "./practice-bite-item-player";

interface PracticeBitesPlayerProps {
  lessonId: string;
  className?: string;
}

export function PracticeBitesPlayer({
  lessonId,
  className,
}: PracticeBitesPlayerProps): ReactNode {
  const [{ data, fetching, error }] = useQuery<
    PracticeBitesByLessonIdQuery,
    PracticeBitesByLessonIdQueryVariables
  >({
    query: PracticeBitesByLessonIdDocument,
    variables: { lessonId },
    pause: !lessonId,
    requestPolicy: "cache-and-network",
  });

  const bite: PracticeBite | undefined = data?.practiceBitesByLessonId?.[0];

  if (fetching && !data) {
    return (
      <div className={cn("mt-10 space-y-3", className)}>
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  // Silently hide the section if there is nothing to practice or it failed.
  if (error || !bite || !(bite.items?.length ?? 0)) {
    return null;
  }

  return <PracticeBitesRunner bite={bite} className={className} />;
}

function PracticeBitesRunner({
  bite,
  className,
}: {
  bite: PracticeBite;
  className?: string;
}): ReactNode {
  const items = useMemo(
    () => [...(bite.items ?? [])].sort((a, b) => a.position - b.position),
    [bite.items],
  );

  const [answers, setAnswers] = useState<Record<string, PracticeBiteAnswerState>>(
    {},
  );
  const [result, setResult] = useState<SubmissionResult | null>(null);

  const [{ fetching: submitting }, submitPracticeBite] = useMutation<
    SubmitPracticeBiteMutation,
    SubmitPracticeBiteMutationVariables
  >(SubmitPracticeBiteDocument);

  const isAnswered = (answer?: PracticeBiteAnswerState): boolean => {
    if (!answer) return false;
    return (
      answer.booleanAnswer != null ||
      Boolean(answer.textAnswer?.trim()) ||
      Boolean(answer.selectedOptions?.some(Boolean)) ||
      Boolean(answer.matchingRows?.length)
    );
  };

  const answeredCount = items.filter((item) => isAnswered(answers[item.id]))
    .length;
  const allAnswered = answeredCount === items.length;

  const resultsByItem = useMemo(() => {
    const map = new Map<string, SubmissionResult["itemResults"][number]>();
    result?.itemResults.forEach((itemResult) => {
      map.set(itemResult.itemId, itemResult);
    });
    return map;
  }, [result]);

  const buildAnswerInput = (
    itemId: string,
    type: PracticeBiteItemType,
    answer: PracticeBiteAnswerState,
  ): PracticeBiteItemAnswerInput => {
    switch (type) {
      case PracticeBiteItemType.TrueFalse:
        return { itemId, booleanAnswer: answer.booleanAnswer ?? false };
      case PracticeBiteItemType.ImageShortPhrase:
        return { itemId, textAnswer: answer.textAnswer ?? "" };
      case PracticeBiteItemType.FillInTheBlanks:
        return { itemId, selectedOptions: answer.selectedOptions ?? [] };
      case PracticeBiteItemType.Matching_4Column:
        return {
          itemId,
          matchingRows: (answer.matchingRows ?? []).map((columns) => ({
            columns,
          })),
        };
      default:
        return { itemId };
    }
  };

  const handleSubmit = async (): Promise<void> => {
    const response = await submitPracticeBite({
      input: {
        practiceBiteId: bite.id,
        answers: items.map((item) =>
          buildAnswerInput(item.id, item.type, answers[item.id] ?? {}),
        ),
      },
    });

    if (response.error || !response.data?.submitPracticeBite) {
      toast.error("No pudimos enviar tus respuestas", {
        description: response.error?.message,
      });
      return;
    }

    const submission = response.data.submitPracticeBite;
    setResult(submission);
    if (submission.isPerfect) {
      toast.success("¡Perfecto! 🎉", { description: submission.message });
    } else {
      toast(submission.message);
    }
  };

  const handleRetry = (): void => {
    setResult(null);
    setAnswers({});
  };

  return (
    <section className={cn("mt-10", className)}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-semibold">
            <Sparkles className="size-5 text-main-foreground" />
            {bite.title}
          </h2>
          {bite.description ? (
            <p className="mt-1 text-sm text-muted-foreground">
              {bite.description}
            </p>
          ) : null}
        </div>
        {bite.progress?.attempts ? (
          <span className="text-sm text-muted-foreground">
            Intentos: {bite.progress.attempts}
          </span>
        ) : null}
      </div>

      {result ? (
        <div
          className={cn(
            "mb-4 flex items-center gap-3 rounded-xl border-2 p-4",
            result.isPerfect
              ? "border-green-500 bg-green-50 dark:bg-green-950/30"
              : "border-border bg-muted",
          )}
        >
          {result.isPerfect ? (
            <PartyPopper className="size-6 text-green-600" />
          ) : null}
          <div className="flex-1">
            <p className="font-semibold">
              {result.correctCount} / {result.totalCount} correctas ·{" "}
              {Math.round(result.score)}%
            </p>
            <p className="text-sm text-muted-foreground">{result.message}</p>
          </div>
        </div>
      ) : (
        <Progress
          className="mb-4"
          value={(answeredCount / items.length) * 100}
        />
      )}

      <div className="flex flex-col gap-4">
        {items.map((item, index) => (
          <PracticeBiteItemPlayer
            answer={answers[item.id] ?? {}}
            disabled={Boolean(result)}
            index={index}
            item={item}
            key={item.id}
            onChange={(answer) =>
              setAnswers((prev) => ({ ...prev, [item.id]: answer }))
            }
            result={resultsByItem.get(item.id)}
          />
        ))}
      </div>

      <div className="mt-6 flex justify-end gap-3">
        {result ? (
          <Button onClick={handleRetry} type="button" variant="neutral">
            Intentar de nuevo
          </Button>
        ) : (
          <Button
            disabled={!allAnswered || submitting}
            onClick={handleSubmit}
            type="button"
          >
            {submitting ? "Enviando..." : "Enviar respuestas"}
          </Button>
        )}
      </div>
    </section>
  );
}
