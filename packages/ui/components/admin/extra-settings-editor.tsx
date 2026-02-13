import type { ReactNode } from "react";
import { useState } from "react";
import { Plus, X } from "lucide-react";
import type { BuilderState } from "ui/context";
import { Card, CardContent, CardHeader, CardTitle } from "ui/components/card";
import { Label } from "ui/components/label";
import { Input } from "ui/components/input";
import { Button } from "ui/components/button";

export function ExtraSettingsEditor({
  settings,
  setSettings,
  helperText,
}: {
  settings: BuilderState["extraSettings"];
  setSettings: (settings: BuilderState["extraSettings"]) => void;
  helperText?: string;
}): ReactNode {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  const addSettings = (): void => {
    if (!settings) return;
    setSettings([...settings, { key, value }]);
    setKey("");
    setValue("");
  };

  const removeSettings = (index: number): void => {
    if (!settings) return;
    setSettings(settings.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Ajustes adicionales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="key">Clave</Label>
                <Input
                  id="key"
                  name="key"
                  onChange={(e) => {
                    setKey(e.target.value);
                  }}
                  placeholder="Clave uno"
                  value={key}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  name="value"
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                  placeholder="Nombre uno"
                  value={value}
                />
              </div>
            </div>
            <Button className="w-full" onClick={addSettings} type="button">
              <Plus className="mr-2 w-4 h-4" /> Agregar ajuste
            </Button>
            {settings && settings.length > 0 ? (
              <div className="mt-6">
                <h3 className="mb-2 font-semibold text-lg">Current Metadata</h3>
                <ul className="space-y-2">
                  {settings.map((item, index) => (
                    <li
                      className="flex justify-between items-center bg-secondary p-2 rounded-md"
                      key={item.key}
                    >
                      <span>
                        <strong>{item.key}:</strong> {item.value}
                      </span>
                      <Button
                        aria-label={`Remove metadata: ${item.key}`}
                        onClick={() => {
                          removeSettings(index);
                        }}
                        size="icon"
                        type="button"
                        variant="ghost"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </CardContent>
      </Card>
      <p
        aria-live="polite"
        className="text-muted-foreground text-xs"
        role="region"
      >
        {helperText}
      </p>
    </div>
  );
}
