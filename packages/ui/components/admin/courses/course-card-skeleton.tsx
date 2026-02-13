import { Clock, Edit2, MoreVertical } from "lucide-react";
import type { ReactNode } from "react";
import { Badge } from "ui/components/badge";
import { Button } from "ui/components/button";
import { Card, CardContent, CardFooter, CardHeader } from "ui/components/card";
import { Skeleton } from "ui/components/skeleton";

export function CourseCardSkeleton(): ReactNode {
  return (
    <Card>
      <CardHeader className="p-0">
        <div className="relative aspect-video overflow-hidden rounded-t-xl">
          <img
            alt=""
            className="object-cover transition-transform group-hover:scale-100"
            src="https://res.cloudinary.com/uspk/image/upload/v1737397211/web_assets/e023e32c-069c-4212-8bfa-c418692f54cf.png"
          />
          <div className="absolute right-2 top-2 flex gap-2">
            <Badge className="uppercase" variant="neutral">
              DRAFT
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="line-clamp-2 text-xl font-semibold">
            <Skeleton className="h-4 w-60" />
          </h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            <Skeleton className="h-4 w-32" />
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm mt-4 text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>
              <Skeleton className="h-4 w-4" />
            </span>
          </div>
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-2 border-t p-4">
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold">$1000</span>
        </div>
        <div className="flex items-center gap-2">
          <Button disabled size="icon" variant="ghost">
            <Edit2 className="h-4 w-4" />
            <span className="sr-only">Edit course</span>
          </Button>
          <Button disabled size="icon" variant="ghost">
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">More options</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
