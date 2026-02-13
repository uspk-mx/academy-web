import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "ui/components/card";
import { Separator } from "ui/components/separator";
import { Skeleton } from "ui/components/skeleton";

export const ContentCardSkeleton = () => {
  return (
    <Card className="grid grid-rows-[auto_1fr_auto] sm:min-h-52 overflow-hidden">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <Skeleton className="w-36 h-2" />

          <Skeleton className="w-24 h-2" />
        </div>
        <Skeleton className="w-48 h-2" />
      </CardHeader>
      <CardContent className="mt-auto p-0 px-4 pb-4">
        <div className="flex justify-between flex-row sm:flex-col md:flex-row gap-1 mt-2 text-sm text-muted-foreground">
          <Skeleton className="w-32 h-2" />
          <Skeleton className="w-32 h-2" />
        </div>
        <div className="text-xs text-muted-foreground mt-2 font-semibold">
          <Skeleton className="w-32 h-2" />
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="p-4 gap-4 justify-end">
        <Skeleton className="w-10 h-6" />
        <Skeleton className="w-10 h-6" />
      </CardFooter>
    </Card>
  );
};
