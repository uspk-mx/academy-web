import {
  DownloadIcon,
  EditIcon,
  Eye,
  PlusIcon,
  SearchIcon,
  Trash2Icon,
  UploadIcon,
} from "lucide-react";
import { PageBreadCrumbs } from "ui/components/admin/page-breadcrumbs";
import {
  Button,
  Checkbox,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "ui/components/index";
import { StatusBadge } from "../status-badge";
import { SearchInput } from "ui/components/search-input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "ui/components/table";

export function ManageEmployees() {
  const employees = [
    {
      name: "Maria Garcia",
      email: "maria.garcia@company.com",
      department: "Engineering",
      status: "active",
      lastLogin: "2024-12-20",
    },
    {
      name: "Carlos Rodriguez",
      email: "carlos.r@company.com",
      department: "Sales",
      status: "active",
      lastLogin: "2024-12-19",
    },
    {
      name: "Ana Martinez",
      email: "ana.m@company.com",
      department: "Marketing",
      status: "inactive",
      lastLogin: "2024-11-15",
    },
    {
      name: "Luis Hernandez",
      email: "luis.h@company.com",
      department: "Engineering",
      status: "active",
      lastLogin: "2024-12-20",
    },
  ];

  return (
    <div className="p-8">
      <PageBreadCrumbs
        items={[
          { href: "/dashboard", label: "Dashboard" },
          { href: "/users", label: "Users" },
          {
            href: "/users/manage-employees",
            label: "Manage Employees",
          },
        ]}
      />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Manage Employees</h1>
        <div className="flex gap-3">
          <Button variant="neutral">
            <UploadIcon size={18} />
            Import CSV
          </Button>
          <Button>
            <PlusIcon size={18} />
            Add Employee
          </Button>
        </div>
      </div>

      <div className="bg-white border-2 border-border rounded-xl p-6">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <SearchInput className="w-full" placeholder="Search employees..." />
          </div>
          <Select>
            <SelectTrigger variant="neutral" className="w-[180px]">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger variant="neutral" className="w-[180px]">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="noShadow">
            <DownloadIcon size={18} />
            Export
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table className="w-full border-none">
            <TableHeader>
              <TableRow>
                <TableHead className="text-left py-3 px-4 font-semibold text-sm">
                  <Checkbox className="rounded" />
                </TableHead>
                <TableHead className="text-left py-3 px-4 font-semibold text-sm">
                  Employee
                </TableHead>
                <TableHead className="text-left py-3 px-4 font-semibold text-sm">
                  Department
                </TableHead>
                <TableHead className="text-left py-3 px-4 font-semibold text-sm">
                  Status
                </TableHead>
                <TableHead className="text-left py-3 px-4 font-semibold text-sm">
                  Last Login
                </TableHead>
                <TableHead className="text-right py-3 px-4 font-semibold text-sm">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((emp, idx) => (
                <TableRow key={idx}>
                  <TableCell className="py-4 px-4">
                    <Checkbox className="rounded" />
                  </TableCell>
                  <TableCell className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-linear-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {emp.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <div className="font-medium">{emp.name}</div>
                        <div className="text-sm text-gray-500">{emp.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-4">{emp.department}</TableCell>
                  <TableCell className="py-4 px-4">
                    <StatusBadge status={emp.status as any} />
                  </TableCell>
                  <TableCell className="py-4 px-4 text-sm">
                    {emp.lastLogin}
                  </TableCell>
                  <TableCell className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button>
                        <Eye size={18} />
                      </Button>
                      <Button>
                        <EditIcon size={18} />
                      </Button>
                      <Button>
                        <Trash2Icon size={18} className="text-red-600" />
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
            Showing 1-4 of 189 employees
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
