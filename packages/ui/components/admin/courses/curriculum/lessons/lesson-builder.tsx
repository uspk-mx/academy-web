import { useState, type ComponentProps, type ReactNode } from "react";
import type { Lesson, LessonsByTopicIdQuery } from "gql-generated/generated/types";
import { Button } from "ui/components/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "ui/components/drawer";
import { CreateLessonForm } from "./create-lesson-form";

interface LessonBuilderProps extends ComponentProps<typeof Drawer> {
  title: ReactNode;
  trigger?: ReactNode;
  topicId: string;
  lessons?: LessonsByTopicIdQuery["lessonsByTopicId"];
}

export function LessonBuilder({
  trigger,
  title,
  lessons,
  topicId,
  ...rest
}: LessonBuilderProps): ReactNode {
  const [open, setOpen] = useState(false);
  return (
    <Drawer onOpenChange={setOpen} open={open} {...rest}>
      <DrawerTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button type="button" variant="neutral">
            Edit Content
          </Button>
        )}
      </DrawerTrigger>
      <DrawerContent className="w-11/12 gap-y-0 sm:pb-0 sm:px-0 sm:pt-0 sm:max-w-267.5 left-0 top-24!">
        <DrawerHeader
          className="px-6! pr-4!"
          containerClassName="bg-background pt-4 items-center"
          closeButtonClassName="mr-4"
        >
          <DrawerTitle>{title}</DrawerTitle>
        </DrawerHeader>
        <CreateLessonForm
          lessons={lessons || []}
          onCloseDrawer={() => {
            setOpen(false);
          }}
          topicId={topicId}
        />
      </DrawerContent>
    </Drawer>
  );
}
