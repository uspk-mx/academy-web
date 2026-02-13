import {
  DownloadIcon,
  FilterIcon,
  MoreVerticalIcon,
  SearchIcon,
} from "lucide-react";
import { useState } from "react";
import { PageBreadCrumbs } from "ui/components/admin/page-breadcrumbs";
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "ui/components/index";
import { ToggleSwitch } from "../toggle-switch";
import { StatusBadge, type Status } from "../status-badge";
import { SearchInput } from "ui/components/search-input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "ui/components/table";

export function ManageSubscriptions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const subscriptions = [
    {
      id: 1,
      name: "Maria Garcia",
      email: "maria.garcia@company.com",
      status: "active",
      startDate: "2024-01-15",
      endDate: "2025-01-15",
    },
    {
      id: 2,
      name: "Carlos Rodriguez",
      email: "carlos.r@company.com",
      status: "active",
      startDate: "2024-02-01",
      endDate: "2025-02-01",
    },
    {
      id: 3,
      name: "Ana Martinez",
      email: "ana.m@company.com",
      status: "inactive",
      startDate: "2023-12-01",
      endDate: "2024-12-01",
    },
    {
      id: 4,
      name: "Luis Hernandez",
      email: "luis.h@company.com",
      status: "active",
      startDate: "2024-03-10",
      endDate: "2025-03-10",
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
            href: "/subscriptions/manage",
            label: "Manage Subscriptions",
          },
        ]}
      />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Manage Subscriptions</h1>
        <Button>
          <DownloadIcon size={18} /> Export List
        </Button>
      </div>

      <div className="bg-white border-2 border-border rounded-xl p-6">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <SearchInput
              placeholder="Search users..."
              searchTerm={searchQuery}
              onSearchTerm={setSearchQuery}
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccina un filtro" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="noShadowNeutral"
            className="px-4 py-2.5 border-2 border-border rounded-lg hover:bg-gray-50 flex items-center gap-2"
          >
            <FilterIcon size={18} />
            More Filters
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table className="w-full border-none">
            <TableHeader>
              <TableRow className="border-b-2 border-gray-200">
                <TableHead className="text-left py-3 px-4 font-semibold text-sm">
                  User
                </TableHead>
                <TableHead className="text-left py-3 px-4 font-semibold text-sm">
                  Status
                </TableHead>
                <TableHead className="text-left py-3 px-4 font-semibold text-sm">
                  Start Date
                </TableHead>
                <TableHead className="text-left py-3 px-4 font-semibold text-sm">
                  Expiration Date
                </TableHead>
                <TableHead className="text-right py-3 px-4 font-semibold text-sm">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.map((sub) => (
                <TableRow
                  key={sub.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {sub.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <div className="font-medium">{sub.name}</div>
                        <div className="text-sm text-gray-500">{sub.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-4">
                    <StatusBadge status={sub.status as Status} />
                  </TableCell>
                  <TableCell className="py-4 px-4 text-sm">
                    {sub.startDate}
                  </TableCell>
                  <TableCell className="py-4 px-4 text-sm">
                    {sub.endDate}
                  </TableCell>
                  <TableCell className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <ToggleSwitch checked={sub.status === "active"} />
                      <Button>
                        <MoreVerticalIcon size={18} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between mt-6 pt-6 border-t-2 border-border">
          <div className="text-sm text-gray-600">
            Showing 1-4 of 247 subscriptions
          </div>
          <div className="flex gap-2">
            <Button variant="noShadowNeutral" className="hover:bg-gray-50">
              Previous
            </Button>
            <Button
              variant="noShadowNeutral"
              className="px-4 py-2 bg-black text-white rounded-lg"
            >
              1
            </Button>
            <Button
              variant="noShadowNeutral"
              className="px-4 py-2 border-2 border-border rounded-lg hover:bg-gray-50"
            >
              2
            </Button>
            <Button
              variant="noShadowNeutral"
              className="px-4 py-2 border-2 border-border rounded-lg hover:bg-gray-50"
            >
              3
            </Button>
            <Button variant="noShadowNeutral" className="hover:bg-gray-50">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
