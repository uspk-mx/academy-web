import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogHeader, DialogFooter 
} from "ui/components/dialog";
import { Youtube } from "lucide-react";
import { useState, type ReactNode } from "react";
import type { Editor } from "@tiptap/react";
import { Input } from "ui/components/input";
import { Button } from "ui/components/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "ui/components/tooltip";
import { Toggle } from "ui/components/toggle";
import { Label } from "ui/components/label";
import { Separator } from "ui/components/separator";

const DEFAULT_WIDTH = "480";
const DEFAULT_HEIGHT = "320";

export function YoutubeEditDialog({ editor }: { editor: Editor }): ReactNode {
  const [isYoutubeModalOpen, setIsYoutubeModalOpen] = useState(false);

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            className="hover:text-slate-950"
            onClick={() => {
              setIsYoutubeModalOpen(true);
            }}
            size="sm"
          >
            <Youtube className="h-6 w-6" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>
          <p>Agrega un video de youtube</p>
        </TooltipContent>
      </Tooltip>

      <Dialog onOpenChange={setIsYoutubeModalOpen} open={isYoutubeModalOpen}>
        <DialogContent
          className="sm:max-w-md"
          //  overlayClassName="bg-black/30"
        >
          <DialogHeader>
            <DialogTitle>Agrega la url del video</DialogTitle>
            <DialogDescription>
              Cuando agreges la url, has clic en el boton Agregar.
            </DialogDescription>
          </DialogHeader>
          <Separator />
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const url = formData.get("youTubeUrl");
              if (url) {
                editor.commands.setYoutubeVideo({
                  src: url as string,
                  width:
                    Math.max(320, Number.parseInt(DEFAULT_WIDTH, 10)) || 640,
                  height:
                    Math.max(180, Number.parseInt(DEFAULT_HEIGHT, 10)) || 480,
                });
                setIsYoutubeModalOpen(false);
              }
            }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label className="sr-only" htmlFor="youtubeUrl">
                  Youtube URL
                </Label>
                <Input
                  id="youTubeUrl"
                  name="youTubeUrl"
                  placeholder="Agrega la url del video aqui"
                />
              </div>
            </div>

            <DialogFooter className="sm:justify-end">
              <DialogClose asChild>
                <Button type="button" variant="neutral">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit">Agregar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
