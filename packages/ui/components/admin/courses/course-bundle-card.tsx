import type { CourseBundle } from "gql-generated/generated/types";
import { BoxIcon, Clock, Edit2, MoreVertical } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router";
import { Badge } from "ui/components/badge";
import { Button } from "ui/components/button";
import { Card, CardContent, CardFooter, CardHeader } from "ui/components/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "ui/components/dropdown-menu";
import { HtmlRenderer } from "ui/components/html-renderer";

export function CourseBundleCard({
  courseBundle,
}: {
  courseBundle: CourseBundle;
}): ReactNode {
  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const discountPercentage = courseBundle.discountValue
    ? Math.round(
        ((courseBundle.price - courseBundle.discountValue) /
          courseBundle.price) *
          100
      )
    : 0;

  return (
    <Card className="flex flex-col">
      <CardHeader className="p-0">
        <div className="relative rounded-t-xl overflow-hidden aspect-video">
          <img
            alt={courseBundle.title}
            className="group-hover:scale-100 transition-transform object-cover"
            src={
              courseBundle.featuredImage
                ? courseBundle.featuredImage
                : "https://res.cloudinary.com/uspk/image/upload/v1737397211/web_assets/e023e32c-069c-4212-8bfa-c418692f54cf.png"
            }
          />
          {/* <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" /> */}

          {courseBundle.courses.length > 0 ? (
            <div className="top-2 left-2 absolute flex gap-2">
              <Badge className="bg-blue-500" variant="default">
               <BoxIcon className="w-4 h-4 mr-2" />
                Paquete de {courseBundle.courses.length} curso{courseBundle.courses.length > 1 ? 's' : null}
              </Badge>
            </div>
          ) : null}
          <div className="top-2 right-2 absolute flex gap-2">
            {discountPercentage > 0 ? (
              <Badge className="bg-green-600" variant="default">
                {discountPercentage}% OFF
              </Badge>
            ) : null}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <div className="space-y-2">
          <h3 className="line-clamp-2 font-semibold text-xl elipsis">
            {courseBundle.title}
          </h3>
          {courseBundle.description ? (
            <p className="line-clamp-2 text-muted-foreground text-sm">
              <HtmlRenderer content={courseBundle.description} />
            </p>
          ) : (
            <p className="line-clamp-2 text-muted-foreground text-sm">
              Sin descripcion aun
            </p>
          )}
        </div>
        <div className="flex items-center gap-4 mt-4 text-muted-foreground text-sm">
          {courseBundle.courses.every((item) => item?.duration) && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>
                {formatDuration(
                  courseBundle.courses.reduce(
                    (acc, curr) => acc + (curr?.duration || 0),
                    0
                  )
                )}
              </span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center gap-2 p-4 border-t">
        <div className="flex items-baseline gap-2">
          <span className="font-bold text-xl">
            ${courseBundle.discountValue ?? courseBundle.price}
          </span>
          {courseBundle.discountValue ? (
            <span className="text-muted-foreground text-sm line-through">
              ${courseBundle.discountValue}
            </span>
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          <Button asChild size="icon" type="button" variant="ghost">
            <Link to={`/bundles/${courseBundle.id}/builder`}>
              <Edit2 className="w-4 h-4" />
              <span className="sr-only">Editar bundle</span>
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" type="button" variant="ghost">
                <MoreVertical className="w-4 h-4" />
                <span className="sr-only">Mas opciones</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Analytics</DropdownMenuItem>
              <DropdownMenuItem>View Enrollments</DropdownMenuItem>
              <DropdownMenuItem>Duplicate Course</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Archive Course
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardFooter>
    </Card>
  );
}
