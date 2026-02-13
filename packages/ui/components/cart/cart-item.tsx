import {
  ItemType,
  type CartItem as CartItemType,
  type Course
} from "gql-generated/generated/types";
import { useId, type ReactNode } from "react";
import { Card, CardContent } from "ui/components/card";
import { getItemType } from "./utils";

interface CartItemProps {
  data: CartItemType & { rating?: string };
  cartActions: ReactNode;
}

export function CartItem({ data, cartActions }: CartItemProps): ReactNode {
  const ratingIndex = useId();
  const { item } = data;

  const isCourse = getItemType<Course>(ItemType.Course);
  // const isCourseBundle = getItemType<CourseBundle>(ItemType.Bundle);
  // const isSubscriptionPlan = getItemType<SubscriptionPlan>(
  //   ItemType.Subscription
  // );

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        {isCourse(item, data.itemType) ? (
          <div className="flex gap-4">
            <div className="w-40 h-32 relative rounded-lg overflow-hidden bg-gray-100">
              <img
                alt={item.title}
                className="object-cover w-full h-full"
                src={item.featuredImage}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {item.instructors?.map((instructor) => (
                      <span
                        className="text-sm text-muted-foreground"
                        key={instructor.id}
                      >
                        By {instructor.fullName}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  {data.rating ? (
                    <div className="flex items-center gap-1 text-yellow-400 mb-2">
                      {[...Array(data.rating)].map((_) => (
                        <span key={ratingIndex}>★</span>
                      ))}
                      <span className="text-sm text-muted-foreground ml-1">
                        {data.rating}
                      </span>
                    </div>
                  ) : null}
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    {item.discountedPrice ? (
                      <>
                        <div className="text-xl font-bold">
                          ${item.discountedPrice.toFixed(2)}
                        </div>
                        <div className="text-sm text-muted-foreground line-through">
                          ${item.price.toFixed(2)}
                        </div>
                      </>
                    ) : (
                      <div className="text-xl font-bold">
                        ${item.price.toFixed(2)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {cartActions}
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
