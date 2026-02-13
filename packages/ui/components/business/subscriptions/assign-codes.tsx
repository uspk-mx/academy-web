import { CheckIcon, SearchIcon } from "lucide-react";
import { PageBreadCrumbs } from "ui/components/admin/page-breadcrumbs";
import { StatusBadge, type Status } from "../status-badge";
import { Button, Input } from "ui/components/index";
import { SearchInput } from "ui/components/search-input";

export function AssignCodes() {
  const availableCodes = [
    { code: "USPK-2024-A1B2", status: "available" },
    { code: "USPK-2024-C3D4", status: "available" },
    {
      code: "USPK-2024-E5F6",
      status: "assigned",
      assignedTo: "maria@company.com",
    },
    { code: "USPK-2024-G7H8", status: "expired" },
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
            href: "/subscriptions/assign-codes",
            label: "Assign Subscription Codes",
          },
        ]}
      />
      <h1 className="text-3xl font-bold mb-8">Assign Subscription Codes</h1>

      <div className="grid grid-cols-2 gap-6">
        {/* Available Codes */}
        <div className="bg-white border-2 border-border rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Available Codes</h2>
          <div className="relative mb-4">
            <SearchInput placeholder="Search codes..." />
          </div>

          <div className="space-y-2">
            {availableCodes.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 border-2 border-border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div>
                  <div className="font-mono font-medium">{item.code}</div>
                  {item.assignedTo && (
                    <div className="text-xs text-gray-500 mt-1">
                      Assigned to: {item.assignedTo}
                    </div>
                  )}
                </div>
                <StatusBadge status={item.status as Status} />
              </div>
            ))}
          </div>
        </div>

        {/* Assign Form */}
        <div className="bg-white border-2 border-border rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Assign to User</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Select Code
              </label>
              <select className="w-full px-4 py-2.5 border-2 border-border rounded-lg focus:outline-none focus:border-black">
                <option>USPK-2024-A1B2</option>
                <option>USPK-2024-C3D4</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Search User
              </label>
              <div className="relative">
                <SearchIcon
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <Input
                  type="text"
                  placeholder="Search by name or email..."
                  className="w-full pl-10 pr-4 py-2.5 border-2 border-border rounded-lg focus:outline-none focus:border-black"
                />
              </div>
            </div>

            <Button>
              <CheckIcon size={18} />
              Assign Code
            </Button>
          </div>

          <div className="mt-8 pt-8 border-t-2 border-border">
            <h3 className="font-semibold mb-4">Recent Assignments</h3>
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <div className="font-medium text-sm">
                      maria.garcia@company.com
                    </div>
                    <div className="text-xs text-gray-500 font-mono">
                      USPK-2024-X9Y8
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">2h ago</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
