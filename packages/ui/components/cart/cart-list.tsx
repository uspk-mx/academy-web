import type { CartItem as CartItemProps } from "gql-generated/generated/types";
import { Trash2 } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "ui/components/button";
import { Checkbox } from "ui/components/checkbox";
import { CartItem } from "./cart-item";

interface CartListProps extends Omit<CartActionProps, "item"> {
  items: CartItemProps[];
}

export function CartList({
  items,
  selectedItems,
  onSelectItems,
}: CartListProps): ReactNode {
  if (!items.length) return null;
  return (
    <div className="lg:col-span-2">
      <div className="space-y-4">
        {items.map((item) => (
          <CartItem
            cartActions={
              <CartActions
                item={item}
                onSelectItems={onSelectItems}
                selectedItems={selectedItems}
              />
            }
            data={{ ...item, rating: undefined }}
            key={item.id}
          />
        ))}
      </div>
    </div>
  );
}

interface CartActionProps {
  item: CartItemProps;
  selectedItems: string[];
  onSelectItems: (value: string[] | ((prev: string[]) => void)) => void;
}

function CartActions({
  item,
  selectedItems,
  onSelectItems,
}: CartActionProps): ReactNode | null {
  if (!item.id) return null;
  return (
    <div className="flex items-center justify-between mt-4">
      <div className="flex items-center gap-2">
        <Checkbox
          checked={selectedItems.includes(item.itemId)}
          onCheckedChange={(checked) => {
            onSelectItems((prev) =>
              checked
                ? [...prev, item.itemId]
                : prev.filter((id) => id !== item.itemId)
            );
          }}
        />
        <span className="text-sm text-muted-foreground">
          Select for checkout
        </span>
      </div>
      <div className="flex gap-4">
        <Button size="sm">View course</Button>
        <Button
          className="text-red-500 hover:text-red-600"
          size="sm"
          variant="ghost"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
