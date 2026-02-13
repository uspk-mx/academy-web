import type { Cart as CartType } from "gql-generated/generated/types";
import type { ReactNode } from "react";
import { useState } from "react";
import { Button } from "ui/components/button";
import { Card, CardContent } from "ui/components/card";
import { Input } from "ui/components/input";
import { CartList } from "./cart-list";

// interface Course {
//   id: number
//   title: string
//   instructor: string
//   price: number
//   originalPrice: number
//   rating: number
//   image: string
// }

// const courses: Course[] = [
//   {
//     id: 1,
//     title: "Marketing and ecommerce",
//     instructor: "Alice Grey",
//     price: 72.00,
//     originalPrice: 90.00,
//     rating: 5.0,
//     image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-nTfTXTCllT06P8SMFx8V9d2xqcsSro.png"
//   },
//   {
//     id: 2,
//     title: "Digital Marketing Essentials",
//     instructor: "Alex Grant",
//     price: 72.00,
//     originalPrice: 90.00,
//     rating: 5.0,
//     image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-nTfTXTCllT06P8SMFx8V9d2xqcsSro.png"
//   },
//   {
//     id: 3,
//     title: "Brand Management",
//     instructor: "Jordan Lane",
//     price: 79.00,
//     originalPrice: 79.00,
//     rating: 5.0,
//     image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-nTfTXTCllT06P8SMFx8V9d2xqcsSro.png"
//   },
//   {
//     id: 4,
//     title: "Customer Experience Design",
//     instructor: "Taylor Reed",
//     price: 72.00,
//     originalPrice: 90.00,
//     rating: 5.0,
//     image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-nTfTXTCllT06P8SMFx8V9d2xqcsSro.png"
//   }
// ]

export function Cart({ cartData }: { cartData: CartType }): ReactNode {
  const { items, subtotal, total } = cartData;
  const [selectedCourses, setSelectedCourses] = useState<string[]>(
    items.map((item) => item.itemId)
  );
  const [couponCode, setCouponCode] = useState("");

  // const subtotal = items
  //   .filter((course) => selectedCourses.includes(course.id))
  //   .reduce((sum, course) => sum + course.price, 0);

  const discount = subtotal * 0.2;
  const couponDiscount = 70;
  // const total = subtotal - discount - couponDiscount;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Courses in Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <CartList
            items={items}
            onSelectItems={(value) => {
              setSelectedCourses(value as any);
            }}
            selectedItems={selectedCourses}
          />

          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Discount (-20%)
                    </span>
                    <span className="font-semibold text-red-500">
                      -${discount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Coupon Discount
                    </span>
                    <span className="font-semibold text-red-500">
                      -${couponDiscount.toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <span className="font-bold">Total</span>
                      <span className="font-bold">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <h3 className="font-semibold mb-1">New- learner offer</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Courses from $10.99. Click button to see savings.
                    </p>
                    <p className="text-sm text-blue-600">Ends in 5h 56m 43s.</p>
                  </div>

                  <div className="flex gap-2 mb-6">
                    <Input
                      onChange={(e) => {
                        setCouponCode(e.target.value);
                      }}
                      placeholder="Coupon Code"
                      value={couponCode}
                    />
                    <Button variant="neutral">Apply now</Button>
                  </div>

                  <Button className="w-full" size="lg">
                    Checkout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
