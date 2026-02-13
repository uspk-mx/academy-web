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

type ActionsMenu = {
  label: string;
  href: string;
  onClick: () => void;
  className?: string;
};

export interface MembershipType {
  __typename?: "SubscriptionPlan";
  id: string;
  planName: string;
  planDescription?: string | null;
  price: number;
  duration: number;
  createdAt: string;
  updatedAt: string;
  category?: { __typename?: "Category"; id: string; name: string } | null;
}

interface MembershipCardProps {
  membership: MembershipType | null;
  onEdit: () => void;
  actionsMenu?: Partial<ActionsMenu>[];
}

export const MembershipCard = ({
  membership,
  actionsMenu,
  onEdit,
}: MembershipCardProps) => {
  return (
    <Card className="grid grid-rows-[auto_1fr_auto]">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium truncate max-w-48">
            {membership?.planName}
          </h3>
          <p className="font-medium">${membership?.price}</p>
        </div>
        {membership?.planDescription && (
          <CardDescription className="mt-1">
            {membership?.planDescription}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="mt-auto p-0 px-4 pb-4">
        <div className="flex flex-row sm:flex-col md:flex-row gap-1 justify-between mt-2 text-sm text-muted-foreground">
          <span>Duracion: {membership?.duration} dias</span>
          <span>Categoria: {membership?.category?.name || "Ninguna"}</span>
        </div>
        <div className="text-xs text-muted-foreground mt-2 font-semibold">
          Creada el: {new Date(membership?.createdAt || "").toLocaleString()}
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
