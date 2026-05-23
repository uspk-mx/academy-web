import { useState } from "react";
import { Badge } from "../badge";
import { Button } from "../button";
import { Card, CardContent, CardFooter } from "../card";
import { MinimalTiptapEditor } from "../minimal-tiptap-editor";
import { CommentsEditor } from "./comments-editor";

export const CommentsViewer = () => {
    const [showEditor, setShowEditor] = useState(false)
  return (
    <Card className="w-full max-w-sm">
      <CardContent className="p-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <img
              src="https://avatars.githubusercontent.com/u/40504240?v=4"
              alt="User"
              className="rounded-full size-7"
            />
            <span className="font-medium">Alvaro Castle</span>
          </div>
          <span className="text-sm text-muted-foreground">2 hours ago</span>
          <Badge variant="neutral">Profesor</Badge>
        </div>
        <div>
          <p className="mt-4">
            This is a sample comment. You can add more text here to describe
            your thoughts or feedback.
          </p>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 rounded-b-xl border-t p-4 group-data-[size=sm]/card:p-3 flex items-center">
        {showEditor ? (
          <CommentsEditor
            onSubmit={() => {
              console.warn("TODO: implement this functionality")
            }}
          />
        ) : (
          <Button
            variant="noShadowNeutral"
            className="w-full text-left justify-start cursor-text"
            onClick={() => setShowEditor(true)}
          >
            Escribe una respuesta
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
