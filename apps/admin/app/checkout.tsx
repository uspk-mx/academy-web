import BillingAddress from "ui/components/stripe-elements/billing-address-select";
import { CheckoutForm } from "ui/components/stripe-elements/checkout-form";
import PayButton from "ui/components/stripe-elements/pay-button";
// @ts-ignore
import { CheckoutProvider } from "@stripe/react-stripe-js";
// @ts-ignore
import { loadStripe } from "@stripe/stripe-js";
import { LockIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";

const stripe = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY || "", {
  betas: ["custom_checkout_beta_5"],
  locale: "es",
});

const mutation = `
mutation Checkout {
  checkout(cartId: "0099824b-9361-483a-aa42-06c9a1bb53ef") {
    id
    url
    clientSecret
  }
}
`;

const variables = {
  cartId: "0099824b-9361-483a-aa42-06c9a1bb53ef",
};

export async function loader() {
  return Response.json({
    ENV: {
      API_TARGET: process.env.VITE_API_TARGET,
      STRIPE_KEY: process.env.VITE_PUBLISHABLE_KEY,
    },
  });
}

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [country, setCountry] = useState("mx");
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  }, []);

  useEffect(() => {
    const getCheckoutSession = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_TARGET}/query`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ query: mutation }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch checkout session");
        }

        const result = await response.json();
        setClientSecret(result.data.checkout.clientSecret);
      } catch (err: any) {
        setError(err.message);
      }
    };

    getCheckoutSession();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!clientSecret) {
    return <div>Loading...</div>;
  }

  return (
    <CheckoutProvider
      stripe={stripe}
      options={{
        clientSecret,
        elementsOptions: {
          appearance: {
            theme: "stripe",
            variables: {
              borderRadius: "0.5rem",
            },
          },
        },
      }}
    >
      <div className="bg-gray-50 min-h-screen">
        <div className="mx-auto px-4 py-8 max-w-7xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="font-bold text-2xl">Checkout</h1>
            <button className="text-purple-600 hover:text-purple-700">
              Cancel
            </button>
          </div>

          <div className="gap-8 grid md:grid-cols-3">
            {/* Billing Form */}
            <div className="space-y-8 md:col-span-2">
              <div className="bg-white shadow-sm p-6 rounded-lg">
                <h2 className="mb-4 font-semibold text-lg">Billing address</h2>

                <BillingAddress value={country} onValueChange={setCountry} />
              </div>

              <div className="bg-white shadow-sm p-6 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-lg">Card details</h2>
                  <div className="flex items-center text-gray-600 text-sm">
                    <LockIcon className="mr-1 w-4 h-4" />
                    Secure and encrypted
                  </div>
                </div>

                <div className="space-y-4">
                  <CheckoutForm />
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="md:col-span-1">
              <div className="top-4 sticky bg-white shadow-sm p-6 rounded-lg">
                <h2 className="mb-4 font-semibold text-lg">Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Original Price:</span>
                    <span>€19.99</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Discounts (50% Off):</span>
                    <span>-€10.00</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t font-semibold text-lg">
                    <span>Total (1 course):</span>
                    <span>€9.99</span>
                  </div>
                </div>

                <PayButton />

                <div className="space-y-4 text-center">
                  <div className="p-3 border rounded-lg">
                    <h3 className="mb-1 font-semibold">
                      30-Day Money-Back Guarantee
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Not satisfied? Get a full refund within 30 days.
                      <br />
                      No questions asked!
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-1 font-semibold text-orange-500">
                      🔥 Tap into Success Now
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Join 2 people in your country
                      <br />
                      who've recently enrolled in this
                      <br />
                      course within last 24 hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CheckoutProvider>
  );
}
