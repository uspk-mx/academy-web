import { useId, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";

interface MenuItem {
  label: ReactNode;
  action?: (event: Event) => void;
  disabled?: boolean;
  leftDecorator?: ReactNode;
  rightDecorator?: ReactNode;
  topSeparator?: boolean;
  bottomSeparator?: boolean;
  className?: string;
  asChild?: boolean;
}

interface ButtonSelectorProps {
  label: ReactNode;
  action: () => void;
  isDisabled?: boolean;
  menuItems: MenuItem[];
}

export function ButtonSelector({
  label,
  action,
  isDisabled,
  menuItems,
}: ButtonSelectorProps): ReactNode {
  return (
    <div className="inline-flex -space-x-px  rounded-lg shadow-sm shadow-black/5 rtl:space-x-reverse">
      <Button
        className="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
        disabled={isDisabled}
        onClick={action}
        type="button"
        variant="noShadow"
      >
        {label}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label="Options"
            className="rounded-none shadow-none border-l first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
            size="icon"
            type="button"
            variant="noShadow"
          >
            <ChevronDown aria-hidden="true" size={16} strokeWidth={2} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {menuItems.map((menuItem, index) => (
            <>
              {menuItem.topSeparator ? <DropdownMenuSeparator /> : null}
              <DropdownMenuItem
                asChild={menuItem.asChild}
                className={menuItem.className}
                disabled={menuItem.disabled}
                key={index}
                onSelect={menuItem.action}
              >
                {menuItem.leftDecorator}
                {menuItem.label}
                {menuItem.rightDecorator}
              </DropdownMenuItem>
              {menuItem.bottomSeparator ? <DropdownMenuSeparator /> : null}
            </>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
