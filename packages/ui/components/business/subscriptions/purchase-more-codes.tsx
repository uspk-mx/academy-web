import { CheckIcon } from "lucide-react";
import { PageBreadCrumbs } from "ui/components/admin/page-breadcrumbs";
import { Button } from "ui/components/button";

export function PurchaseMoreCodes() {
  const plans = [
    {
      name: "Starter",
      price: "$99",
      codes: 10,
      features: [
        "10 Subscription Codes",
        "Email Support",
        "Basic Analytics",
        "1 Year Validity",
      ],
    },
    {
      name: "Professional",
      price: "$249",
      codes: 30,
      features: [
        "30 Subscription Codes",
        "Priority Support",
        "Advanced Analytics",
        "1 Year Validity",
        "Custom Branding",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$499",
      codes: 100,
      features: [
        "100 Subscription Codes",
        "24/7 Support",
        "Premium Analytics",
        "2 Year Validity",
        "Custom Branding",
        "Dedicated Account Manager",
      ],
    },
  ];

  return (
    <div className="p-8">
      <PageBreadCrumbs
        items={[
          {
            href: "/dashboard",
            label: "Dashboard",
          },
          { href: "/subscriptions", label: "Subscriptions" },
          {
            href: "/subscriptions/purchase-more",
            label: "Purchase More Codes",
          },
        ]}
      />
      <h1 className="text-3xl font-bold mb-2">Purchase Subscription Codes</h1>
      <p className="text-gray-600 mb-8">
        Choose a plan that fits your organization's needs
      </p>

      <div className="grid grid-cols-3 gap-6 mb-8">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`bg-white border-2 rounded-xl p-6 transition-all hover:shadow-xl relative ${
              plan.popular ? "border-yellow-400 shadow-lg" : "border-border"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-4 py-1 rounded-full text-xs font-bold border-2 border-black">
                MOST POPULAR
              </div>
            )}
            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            <div className="text-4xl font-bold mb-4">
              {plan.price}
              <span className="text-lg text-gray-500">/pack</span>
            </div>
            <div className="text-sm text-gray-600 mb-6">
              {plan.codes} subscription codes
            </div>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <CheckIcon
                    size={16}
                    className="text-emerald-600 mt-0.5 shrink-0"
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 mb-4">
              <button className="w-10 h-10 border-2 border-border rounded-lg flex items-center justify-center hover:bg-gray-50">
                -
              </button>
              <input
                type="number"
                defaultValue="1"
                className="flex-1 text-center py-2 border-2 border-border rounded-lg focus:outline-none focus:border-black"
              />
              <button className="w-10 h-10 border-2 border-border rounded-lg flex items-center justify-center hover:bg-gray-50">
                +
              </button>
            </div>

            <Button>Select Plan</Button>
          </div>
        ))}
      </div>

      <div className="bg-white border-2 border-border rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Purchase History</h2>
        <div className="space-y-3">
          {[
            {
              date: "2024-10-15",
              plan: "Professional",
              codes: 30,
              amount: "$249",
            },
            { date: "2024-07-20", plan: "Starter", codes: 10, amount: "$99" },
          ].map((purchase, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 border-2 border-border rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center">
                  <CheckIcon className="text-emerald-600" />
                </div>
                <div>
                  <div className="font-medium">{purchase.plan} Plan</div>
                  <div className="text-sm text-gray-500">
                    {purchase.codes} codes • {purchase.date}
                  </div>
                </div>
              </div>
              <div className="text-xl font-bold">{purchase.amount}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
