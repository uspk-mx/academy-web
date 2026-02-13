import { PageBreadCrumbs } from "ui/components/admin/page-breadcrumbs";
import { StatusBadge, type Status } from "../status-badge";
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "ui/components/index";
import {
  Calendar1,
  CalendarIcon,
  Download,
  Eye,
  TableProperties,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "ui/components/popover";
import { Calendar } from "ui/components/calendar";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "ui/components/table";

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

export function Invoices() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date("2025-06-01"));
  const [month, setMonth] = useState<Date | undefined>(date);
  const [value, setValue] = useState(formatDate(date));
  const invoices = [
    {
      number: "INV-2024-001",
      date: "2024-12-01",
      amount: "$249.00",
      status: "paid",
    },
    {
      number: "INV-2024-002",
      date: "2024-11-01",
      amount: "$249.00",
      status: "paid",
    },
    {
      number: "INV-2024-003",
      date: "2024-10-01",
      amount: "$99.00",
      status: "paid",
    },
    {
      number: "INV-2024-004",
      date: "2024-09-01",
      amount: "$249.00",
      status: "pending",
    },
  ];

  return (
    <div className="p-8">
      <PageBreadCrumbs
        items={[
          { href: "/dashboard", label: "Dashboard" },
          { href: "/billing", label: "Billing" },
          { href: "/billing/invoices", label: "Invoices" },
        ]}
      />
      <h1 className="text-3xl font-bold mb-8">Invoices</h1>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-linear-to-br from-emerald-500 to-emerald-600 text-white rounded-xl p-6">
          <div className="text-sm font-medium mb-2 opacity-90">
            Total Paid (This Year)
          </div>
          <div className="text-4xl font-bold mb-1">$846.00</div>
          <div className="text-sm opacity-75">Across 4 invoices</div>
        </div>
        <div className="bg-linear-to-br from-amber-500 to-amber-600 text-white rounded-xl p-6">
          <div className="text-sm font-medium mb-2 opacity-90">
            Pending Amount
          </div>
          <div className="text-4xl font-bold mb-1">$249.00</div>
          <div className="text-sm opacity-75">1 invoice pending</div>
        </div>
      </div>

      <div className="bg-white border-2 border-border rounded-xl p-6">
        <div className="flex gap-4 mb-6">
          <div className="relative">
            {/*<Calendar1
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Select date range..."
              className="pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black"
            />*/}

            <Input
              id="date"
              value={value}
              placeholder="June 01, 2025"
              className="bg-background pr-10"
              onChange={(e) => {
                const date = new Date(e.target.value);
                setValue(e.target.value);
                if (isValidDate(date)) {
                  setDate(date);
                  setMonth(date);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setOpen(true);
                }
              }}
            />
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  id="date-picker"
                  variant="ghost"
                  className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                >
                  <CalendarIcon className="absolute right-1 top-2 -translate-y-1/2 text-gray-400 size-3.5" />
                  <span className="sr-only">Select date</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="end"
                alignOffset={-8}
                sideOffset={10}
              >
                <Calendar
                  mode="single"
                  selected={date}
                  captionLayout="dropdown"
                  month={month}
                  onMonthChange={setMonth}
                  onSelect={(date) => {
                    setDate(date);
                    setValue(formatDate(date));
                    setOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          <Select>
            <SelectTrigger variant="neutral" className="w-[180px]">
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <Table className="w-full border-none">
            <TableHeader>
              <TableRow>
                <TableHead className="text-left py-3 px-4 font-semibold text-sm">
                  Invoice #
                </TableHead>
                <TableHead className="text-left py-3 px-4 font-semibold text-sm">
                  Date
                </TableHead>
                <TableHead className="text-left py-3 px-4 font-semibold text-sm">
                  Amount
                </TableHead>
                <TableHead className="text-left py-3 px-4 font-semibold text-sm">
                  Status
                </TableHead>
                <TableHead className="text-right py-3 px-4 font-semibold text-sm">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice, idx) => (
                <TableRow key={idx}>
                  <TableCell className="py-4 px-4 font-mono font-medium">
                    {invoice.number}
                  </TableCell>
                  <TableCell className="py-4 px-4">{invoice.date}</TableCell>
                  <TableCell className="py-4 px-4 font-bold">
                    {invoice.amount}
                  </TableCell>
                  <TableCell className="py-4 px-4">
                    <StatusBadge status={invoice.status as Status} />
                  </TableCell>
                  <TableCell className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button>
                        <Download size={18} />
                      </Button>
                      <Button>
                        <Eye size={18} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
