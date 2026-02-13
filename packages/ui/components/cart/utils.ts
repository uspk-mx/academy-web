import type {
  CartItemDetails,
  ItemType,
} from "gql-generated/generated/types";

export function getItemType<T extends CartItemDetails>(expectedItemType: ItemType) {
  return (item: CartItemDetails, itemType: ItemType): item is T => {
    return itemType === expectedItemType;
  };
}
