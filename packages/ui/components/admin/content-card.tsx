import { MoreVerticalIcon, PencilIcon } from "lucide-react";
import { Link } from "react-router";
import { Button } from "ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "ui/components/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "ui/components/dropdown-menu";
import { Separator } from "ui/components/separator";
import { Badge } from "ui/components/badge";

type ActionsMenu = {
  label: string;
  href: string;
  onClick: () => void;
  className?: string;
};

interface CardContent {
  id: string;
  title: string;
  subTitle?: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
  metadata?: { id: string; name: string; label: string, isBadge?: boolean, isActive?: boolean }[] | null;
}

interface MembershipCardProps {
  content: CardContent | null;
  onEdit: () => void;
  actionsMenu?: Partial<ActionsMenu>[];
}

export const ContentCard = ({
  content,
  actionsMenu,
  onEdit,
}: MembershipCardProps) => {
  return (
    <Card className="grid grid-rows-[auto_1fr_auto]">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium truncate max-w-48">{content?.title}</h3>
          {content?.subTitle && (
            <p className="font-medium">{content?.subTitle}</p>
          )}
        </div>
        {content?.description && (
          <CardDescription className="mt-1">
            {content?.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="mt-auto p-0 px-4 pb-4">
        {content?.metadata
          ? content?.metadata.map((item) => (
              <div
                className="flex flex-row sm:flex-col md:flex-row gap-1 justify-between mt-2 text-sm text-muted-foreground"
                key={content?.id}
              >
                {item.name ? (
                  <span className="flex items-center gap-2">
                    {item.label}:{" "}
                    {item.isBadge ? (
                      <Badge
                        variant={item.isActive ? "dark" : "neutral"}
                        shape="rounded"
                      >
                        {item.name}
                      </Badge>
                    ) : (
                      item.name
                    )}
                  </span>
                ) : null}
              </div>
            ))
          : null}
        <div className="text-xs text-muted-foreground mt-2 font-semibold">
          Creada el: {new Date(content?.createdAt || "").toLocaleString()}
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="p-4 gap-4 justify-end">
        <Button variant="ghost" size="icon" onClick={onEdit}>
          <PencilIcon className="h-4 w-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" type="button" variant="ghost">
              <MoreVerticalIcon className="w-4 h-4" />
              <span className="sr-only">Mas opciones</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {actionsMenu
              ? actionsMenu.map((action, key) => (
                  <DropdownMenuItem
                    key={key}
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
      </CardFooter>
    </Card>
  );
};
