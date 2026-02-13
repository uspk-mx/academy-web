import { CourseStatus, type Course } from "gql-generated/generated/types";
import { Clock, Edit2, MoreVertical } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router";
import { Badge } from "ui/components/badge";
import { Button } from "ui/components/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "ui/components/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "ui/components/dropdown-menu";
import { HtmlRenderer } from "ui/components/html-renderer";
import type { PricingType } from "gql-generated/gql/graphql";

type ActionsMenu = {
  label: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
};
interface CourseCardProps {
  course: Course;
  actionsMenu: ActionsMenu[];
}

export function CourseCard({
  course,
  actionsMenu,
}: CourseCardProps): ReactNode {
  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const discountPercentage = course.discountedPrice
    ? Math.round(((course.price - course.discountedPrice) / course.price) * 100)
    : 0;

  const coursePrice: Record<PricingType, string> = {
    FREE: "Gratis",
    PAID: `$${course.discountedPrice ?? course.price}`,
    CUSTOM: "Precio personalizado",
  };


  return (
    <Card className="flex flex-col">
      <CardHeader className="p-0">
        <div className="relative rounded-t-xl overflow-hidden aspect-video">
          <img
            alt={course.title}
            className="group-hover:scale-100 h-full max-w-full w-full transition-transform object-cover"
            src={
              course.featuredImage
                ? course.featuredImage
                : "https://res.cloudinary.com/uspk/image/upload/v1737397211/web_assets/e023e32c-069c-4212-8bfa-c418692f54cf.png"
            }
          />
          <div className="top-2 right-2 absolute flex gap-2">
            {course.status ? (
              <Badge
                className="uppercase"
                variant={
                  // eslint-disable-next-line no-nested-ternary -- needed for this
                  course.status === CourseStatus.Published
                    ? "default"
                    : course.status === CourseStatus.Draft
                      ? "neutral"
                      : "neutral"
                }
              >
                {course.status.toLowerCase()}
              </Badge>
            ) : null}
            {discountPercentage > 0 && (
              <Badge className="bg-green-600" variant="default">
                {discountPercentage}% OFF
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between p-4">
        <div className="space-y-2 max-w-xs md:max-w-full">
          <h3 className="line-clamp-2 font-semibold text-xl elipsis">
            {course.title}
          </h3>
          {course.shortDescription ? (
            <p className="line-clamp-2 text-muted-foreground text-sm">
              <HtmlRenderer content={course.shortDescription} />
            </p>
          ) : (
            <p className="line-clamp-2 text-muted-foreground text-sm">
              Sin descripcion aun
            </p>
          )}
        </div>
        <div className="flex items-center gap-4 mt-4 text-muted-foreground text-sm">
          {course.duration > 0 && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{formatDuration(course.duration)}</span>
            </div>
          )}
          {course.category ? (
            <Badge variant="neutral">{course.category.name}</Badge>
          ) : null}
          {course.level ? (
            <Badge variant="neutral">{course.level.name}</Badge>
          ) : null}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center gap-2 p-4 border-t">
        <div className="flex items-baseline gap-2">
          <span className="font-bold text-xl">
            {course.pricingType
              ? coursePrice[course.pricingType]
              : `$${course.discountedPrice ?? course.price}`}
          </span>
          {course.discountedPrice ? (
            <span className="text-muted-foreground text-sm line-through">
              ${course.discountedPrice}
            </span>
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          <Button asChild size="icon" type="button" variant="ghost">
            <Link to={`/courses/${course.id}/builder`}>
              <Edit2 className="w-4 h-4" />
              <span className="sr-only">Edit course</span>
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" type="button" variant="ghost">
                <MoreVertical className="w-4 h-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {actionsMenu
                ? actionsMenu.map((action) => (
                    <DropdownMenuItem
                      key={`${action.href}-${action.label}`}
                      onClick={action.onClick}
                      {...(action.href ? { asChild: true } : {})}
                      className={action.className}
                    >
                      {action.href ? (
                        <Link to={action.href ?? ""}>{action.label}</Link>
                      ) : (
                        action.label
                      )}
                    </DropdownMenuItem>
                  ))
                : null}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardFooter>
    </Card>
  );
}
