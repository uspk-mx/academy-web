import { CreditCard, Edit, PlusIcon, Trash2 } from "lucide-react";
import { useState } from "react";
import { PageBreadCrumbs } from "ui/components/admin/page-breadcrumbs";
import { Button } from "ui/components/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "ui/components/dialog";

export function PaymentMethods() {
  const [showAddModal, setShowAddModal] = useState(false);
  
  const paymentMethods = [
    { type: 'Visa', last4: '4242', expiry: '12/25', isDefault: true },
    { type: 'Mastercard', last4: '8888', expiry: '09/26', isDefault: false },
  ];

  return (
    <div className="p-8">
      <PageBreadCrumbs
        items={[
          { href: "/dashboard", label: "Dashboard" },
          { href: "/billing", label: "Billing" },
          { href: "/billing/methods", label: "Payment Methods" },
        ]}
      />
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Payment Methods</h1>
        <Button onClick={() => setShowAddModal(true)}>
          <PlusIcon size={18} />
          Add Payment Method
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {paymentMethods.map((method, idx) => (
          <div
            key={idx}
            className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-blue-500/10 to-purple-500/10 rounded-bl-full" />

            {method.isDefault && (
              <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-400 text-black text-xs font-bold rounded-full border-2 border-black">
                DEFAULT
              </div>
            )}

            <div className="relative">
              <div className="mb-6">
                <CreditCard size={40} className="text-gray-400" />
              </div>

              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-1">Card Number</div>
                <div className="text-2xl font-mono font-bold tracking-wider">
                  •••• •••• •••• {method.last4}
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Expiry Date</div>
                  <div className="font-semibold">{method.expiry}</div>
                </div>
                <div className="text-xl font-bold">{method.type}</div>
              </div>

              <div className="flex gap-2">
                {!method.isDefault && (
                  <Button variant="noShadowNeutral" size="sm">
                    Set as Default
                  </Button>
                )}
                <Button variant="noShadowNeutral" size="sm">
                  <Edit size={16} />
                  Edit
                </Button>
                <button className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Payment Method</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Card Number
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black font-mono"
                maxLength={19}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Cardholder Name
              </label>
              <input
                type="text"
                placeholder="John Dude"
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black font-mono"
                  maxLength={5}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">CVV</label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black font-mono"
                  maxLength={3}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="default" className="rounded" />
              <label htmlFor="default" className="text-sm">
                Set as default payment method
              </label>
            </div>
            <Button>
              <PlusIcon size={18} />
              Add Card
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
