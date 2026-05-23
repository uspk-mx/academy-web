import type { LearningPath } from "gql-generated/generated/types";
import { BookOpen, Edit2, MoreVertical, Trash2 } from "lucide-react";
import type { ReactNode } from "react";
import { Badge } from "ui/components/badge";
import { Button } from "ui/components/button";
import { Card, CardContent, CardFooter, CardHeader } from "ui/components/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "ui/components/dropdown-menu";

const DEFAULT_IMAGE =
  "https://res.cloudinary.com/uspk/image/upload/v1737397211/web_assets/e023e32c-069c-4212-8bfa-c418692f54cf.png";

export function LearningPathCard({
  learningPath,
  onEdit,
  onDelete,
}: {
  learningPath: LearningPath;
  onEdit: (learningPath: LearningPath) => void;
  onDelete: (learningPath: LearningPath) => void;
}): ReactNode {
  const courseCount = learningPath.courses?.length ?? 0;

  return (
    <Card className="flex flex-col">
      <CardHeader className="p-0">
        <div className="relative rounded-t-xl overflow-hidden aspect-video">
          <img
            alt={learningPath.name}
            className="transition-transform object-cover w-full h-full"
            src={learningPath.featuredImage || DEFAULT_IMAGE}
          />
          {courseCount > 0 && (
            <div className="top-2 left-2 absolute flex gap-2">
              <Badge variant="dark">
                <BookOpen className="w-4 h-4 mr-2" />
                {courseCount} curso{courseCount > 1 ? "s" : ""}
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <div className="space-y-2">
          <h3 className="line-clamp-2 font-semibold text-xl">
            {learningPath.name}
          </h3>
          {learningPath.description ? (
            <p className="line-clamp-2 text-muted-foreground text-sm">
              {learningPath.description}
            </p>
          ) : (
            <p className="line-clamp-2 text-muted-foreground text-sm">
              Sin descripcion aun
            </p>
          )}
        </div>
        {courseCount > 0 && (
          <div className="flex flex-col gap-1 mt-4">
            {learningPath.courses
              ?.slice()
              .sort((a, b) => a.position - b.position)
              .slice(0, 3)
              .map((lpc) => (
                <div
                  key={lpc.course.id}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <span className="font-medium text-xs tabular-nums">
                    {lpc.position}.
                  </span>
                  {lpc.course.featuredImage && (
                    <img
                      src={lpc.course.featuredImage}
                      alt={lpc.course.title}
                      className="rounded w-5 h-5 object-cover"
                    />
                  )}
                  <span className="truncate">{lpc.course.title}</span>
                </div>
              ))}
            {courseCount > 3 && (
              <span className="text-xs text-muted-foreground">
                +{courseCount - 3} mas...
              </span>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end items-center gap-2 p-4 border-t">
        <Button
          size="icon"
          type="button"
          variant="ghost"
          onClick={() => onEdit(learningPath)}
        >
          <Edit2 className="w-4 h-4" />
          <span className="sr-only">Editar learning path</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" type="button" variant="ghost">
              <MoreVertical className="w-4 h-4" />
              <span className="sr-only">Mas opciones</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(learningPath)}>
              <Edit2 className="w-4 h-4 mr-2" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => onDelete(learningPath)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
}
