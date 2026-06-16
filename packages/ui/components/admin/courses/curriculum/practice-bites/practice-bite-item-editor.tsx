import type { PracticeBiteItemSettingsInput } from "gql-generated/generated/types";
import { PracticeBiteItemType } from "gql-generated/generated/types";
import { Plus, Trash2Icon } from "lucide-react";
import { Fragment, useEffect, useId, useState, type ReactNode } from "react";
import { Button } from "ui/components/button";
import { Input } from "ui/components/input";
import { Label } from "ui/components/label";
import { Switch } from "ui/components/switch";
import { TagInput } from "ui/components/tag-input";
import { Textarea } from "ui/components/textarea";
import {
  countPracticeBiteBlanks,
  MATCHING_COLUMN_COUNT,
  PRACTICE_BITE_ITEM_TYPE_LABELS,
  splitPracticeBitePrompt,
  type PracticeBiteItem,
} from "./types";

export interface PracticeBiteItemFormValues {
  type: PracticeBiteItemType;
  prompt: string;
  media?: string | null;
  answerExplanation?: string | null;
  settings: PracticeBiteItemSettingsInput;
}

interface PracticeBiteItemEditorProps {
  item: PracticeBiteItem;
  isDraft: boolean;
  isSaving: boolean;
  onSave: (values: PracticeBiteItemFormValues) => void;
}

interface EditorState {
  prompt: string;
  media: string;
  answerExplanation: string;
  correctBoolean: boolean;
  acceptedAnswers: string[];
  caseSensitive: boolean;
  options: string[];
  blanks: string[];
  matchingRows: string[][];
}

function buildInitialState(item: PracticeBiteItem): EditorState {
  // Admin reads expose the full answer key via `solution`; fall back to settings.
  const source = item.solution ?? item.settings ?? undefined;

  return {
    prompt: item.prompt ?? "",
    media: item.media ?? "",
    answerExplanation: item.answerExplanation ?? "",
    correctBoolean: source?.correctBoolean ?? false,
    acceptedAnswers: source?.acceptedAnswers ?? [],
    caseSensitive: source?.caseSensitive ?? false,
    options: source?.options ?? [],
    blanks: source?.blanks ?? [],
    matchingRows:
      source?.matchingRows?.map((row) => {
        const cols = [...row.columns];
        while (cols.length < MATCHING_COLUMN_COUNT) cols.push("");
        return cols.slice(0, MATCHING_COLUMN_COUNT);
      }) ?? [],
  };
}

export function PracticeBiteItemEditor({
  item,
  isDraft,
  isSaving,
  onSave,
}: PracticeBiteItemEditorProps): ReactNode {
  const fieldId = useId();
  const [state, setState] = useState<EditorState>(() => buildInitialState(item));

  // Reset the form whenever a different item is selected.
  useEffect(() => {
    setState(buildInitialState(item));
  }, [item.id]);

  const patch = (updates: Partial<EditorState>): void => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const buildSettings = (): PracticeBiteItemSettingsInput => {
    switch (item.type) {
      case PracticeBiteItemType.TrueFalse:
        return { correctBoolean: state.correctBoolean };
      case PracticeBiteItemType.ImageShortPhrase:
        return {
          acceptedAnswers: state.acceptedAnswers,
          caseSensitive: state.caseSensitive,
        };
      case PracticeBiteItemType.FillInTheBlanks:
        return {
          options: state.options,
          blanks: state.blanks,
        };
      case PracticeBiteItemType.Matching_4Column:
        return {
          matchingRows: state.matchingRows.map((columns) => ({ columns })),
        };
      default:
        return {};
    }
  };

  const handleSave = (): void => {
    onSave({
      type: item.type,
      prompt: state.prompt.trim(),
      media:
        item.type === PracticeBiteItemType.ImageShortPhrase
          ? state.media.trim() || null
          : undefined,
      answerExplanation: state.answerExplanation.trim() || null,
      settings: buildSettings(),
    });
  };

  const addMatchingRow = (): void => {
    patch({
      matchingRows: [
        ...state.matchingRows,
        Array.from({ length: MATCHING_COLUMN_COUNT }, () => ""),
      ],
    });
  };

  const updateMatchingCell = (
    rowIndex: number,
    colIndex: number,
    value: string,
  ): void => {
    patch({
      matchingRows: state.matchingRows.map((row, r) =>
        r === rowIndex
          ? row.map((cell, c) => (c === colIndex ? value : cell))
          : row,
      ),
    });
  };

  const removeMatchingRow = (rowIndex: number): void => {
    patch({
      matchingRows: state.matchingRows.filter((_, r) => r !== rowIndex),
    });
  };

  const promptValid = state.prompt.trim().length > 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-1">
        <span className="text-xs font-medium uppercase text-muted-foreground">
          {PRACTICE_BITE_ITEM_TYPE_LABELS[item.type]}
        </span>
        <h3 className="text-lg font-semibold">
          {isDraft ? "Nuevo elemento" : "Editar elemento"}
        </h3>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${fieldId}-prompt`}>Enunciado</Label>
        <Textarea
          id={`${fieldId}-prompt`}
          value={state.prompt}
          onChange={(event) => patch({ prompt: event.target.value })}
          placeholder="Escribe la consigna del elemento..."
        />
      </div>

      {item.type === PracticeBiteItemType.TrueFalse ? (
        <div className="flex items-center justify-between rounded-lg border border-border p-4">
          <div className="space-y-0.5">
            <Label htmlFor={`${fieldId}-correct`}>Respuesta correcta</Label>
            <p className="text-sm text-muted-foreground">
              {state.correctBoolean ? "Verdadero" : "Falso"}
            </p>
          </div>
          <Switch
            id={`${fieldId}-correct`}
            checked={state.correctBoolean}
            onCheckedChange={(checked) => patch({ correctBoolean: checked })}
          />
        </div>
      ) : null}

      {item.type === PracticeBiteItemType.ImageShortPhrase ? (
        <>
          <div className="space-y-2">
            <Label htmlFor={`${fieldId}-media`}>URL de la imagen</Label>
            <Input
              id={`${fieldId}-media`}
              value={state.media}
              onChange={(event) => patch({ media: event.target.value })}
              placeholder="https://..."
              type="url"
            />
          </div>
          <TagInput
            label="Respuestas aceptadas"
            tags={state.acceptedAnswers}
            onTagsChange={(tags) => patch({ acceptedAnswers: tags })}
            placeholder="Escribe una respuesta y presiona Enter..."
          />
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div className="space-y-0.5">
              <Label htmlFor={`${fieldId}-case`}>
                Distinguir mayúsculas y minúsculas
              </Label>
              <p className="text-sm text-muted-foreground">
                Las respuestas deben coincidir exactamente.
              </p>
            </div>
            <Switch
              id={`${fieldId}-case`}
              checked={state.caseSensitive}
              onCheckedChange={(checked) => patch({ caseSensitive: checked })}
            />
          </div>
        </>
      ) : null}

      {item.type === PracticeBiteItemType.FillInTheBlanks ? (
        <FillInTheBlanksFields
          blanks={state.blanks}
          onBlanksChange={(blanks) => patch({ blanks })}
          onOptionsChange={(options) => patch({ options })}
          options={state.options}
          prompt={state.prompt}
        />
      ) : null}

      {item.type === PracticeBiteItemType.Matching_4Column ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Filas de la tabla</Label>
            <Button
              type="button"
              size="sm"
              variant="noShadowNeutral"
              onClick={addMatchingRow}
            >
              <Plus className="size-4" /> Agregar fila
            </Button>
          </div>
          {state.matchingRows.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Aún no hay filas. Agrega una para empezar.
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {state.matchingRows.map((row, rowIndex) => (
                // eslint-disable-next-line react/no-array-index-key -- rows have no stable id
                <div key={rowIndex} className="flex items-center gap-2">
                  <div className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-4">
                    {row.map((cell, colIndex) => (
                      <Input
                        // eslint-disable-next-line react/no-array-index-key -- cells have no stable id
                        key={colIndex}
                        value={cell}
                        onChange={(event) =>
                          updateMatchingCell(
                            rowIndex,
                            colIndex,
                            event.target.value,
                          )
                        }
                        placeholder={`Columna ${colIndex + 1}`}
                      />
                    ))}
                  </div>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => removeMatchingRow(rowIndex)}
                  >
                    <Trash2Icon className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : null}

      <div className="space-y-2">
        <Label htmlFor={`${fieldId}-explanation`}>
          Explicación de la respuesta (opcional)
        </Label>
        <Textarea
          id={`${fieldId}-explanation`}
          value={state.answerExplanation}
          onChange={(event) => patch({ answerExplanation: event.target.value })}
          placeholder="Se mostrará al alumno cuando se revele la solución..."
        />
      </div>

      <div className="flex justify-end">
        <Button
          type="button"
          onClick={handleSave}
          disabled={!promptValid || isSaving}
        >
          {isDraft ? "Agregar elemento" : "Guardar elemento"}
        </Button>
      </div>
    </div>
  );
}

function FillInTheBlanksFields({
  prompt,
  blanks,
  options,
  onBlanksChange,
  onOptionsChange,
}: {
  prompt: string;
  blanks: string[];
  options: string[];
  onBlanksChange: (blanks: string[]) => void;
  onOptionsChange: (options: string[]) => void;
}): ReactNode {
  const segments = splitPracticeBitePrompt(prompt);
  const blanksCount = countPracticeBiteBlanks(prompt);

  const setBlank = (index: number, value: string): void => {
    const next = [...blanks];
    next[index] = value;
    onBlanksChange(next.slice(0, blanksCount));
  };

  return (
    <div className="space-y-4 rounded-lg border border-border p-4">
      <div className="space-y-2">
        <span className="text-sm font-medium">Vista previa</span>
        <p className="text-xs text-muted-foreground">
          Escribe <code className="rounded bg-muted px-1 font-mono">___</code>{" "}
          (tres guiones bajos) en el enunciado para crear un espacio en blanco.
        </p>
        <div className="flex flex-wrap items-center gap-x-1 gap-y-2 rounded-md bg-muted/50 p-3 text-sm leading-8">
          {blanksCount === 0 ? (
            <span className="text-muted-foreground">
              Aún no hay espacios en blanco. Agrega <code>___</code> al
              enunciado.
            </span>
          ) : (
            segments.map((segment, index) => (
              // eslint-disable-next-line react/no-array-index-key -- positional segments
              <Fragment key={index}>
                {segment ? <span>{segment}</span> : null}
                {index < blanksCount ? (
                  <span className="inline-flex min-w-16 items-center justify-center border-b-2 border-foreground px-2 text-xs font-medium text-muted-foreground">
                    {index + 1}
                  </span>
                ) : null}
              </Fragment>
            ))
          )}
        </div>
      </div>

      {blanksCount > 0 ? (
        <div className="space-y-2">
          <Label>Respuestas correctas (en orden)</Label>
          <div className="space-y-2">
            {Array.from({ length: blanksCount }).map((_, index) => (
              <div
                className="flex items-center gap-3"
                // eslint-disable-next-line react/no-array-index-key -- positional blanks
                key={index}
              >
                <span className="w-16 shrink-0 text-sm text-muted-foreground">
                  Espacio {index + 1}
                </span>
                <Input
                  onChange={(event) => setBlank(index, event.target.value)}
                  placeholder="Respuesta correcta..."
                  value={blanks[index] ?? ""}
                />
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <TagInput
        label="Banco de palabras"
        onTagsChange={onOptionsChange}
        placeholder="Agrega las opciones (correctas y distractores)..."
        tags={options}
      />
    </div>
  );
}
