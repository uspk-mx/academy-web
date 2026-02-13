import * as React from "react";
import { Link, useNavigate } from "react-router";

import { Card, CardContent, CardHeader, CardTitle } from "ui/components/card";
import { Button } from "ui/components/button";
import { Input } from "ui/components/input";
import { Badge } from "ui/components/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "ui/components/select";
import { PageBreadCrumbs } from "ui/components/admin/page-breadcrumbs";

type Props = { companyId: string };

type Employee = {
  id: string;
  fullName: string;
  email: string;
  isActive: boolean;
  // Optional license state (if you can compute it)
  licenseStatus?: "active" | "none" | "pending_invite";
};

function LicenseBadge({ status }: { status?: Employee["licenseStatus"] }) {
  if (!status) return <Badge variant="neutral">—</Badge>;
  if (status === "active") return <Badge variant="neutral">Licensed</Badge>;
  if (status === "pending_invite") return <Badge variant="neutral">Invite sent</Badge>;
  return <Badge variant="neutral">No license</Badge>;
}

export default function EmployeesPage({ companyId }: Props) {
  const navigate = useNavigate();

  // TODO: hook -> useCompanyEmployees(companyId)
  const loading = false;
  const employees: Employee[] = [];

  const [q, setQ] = React.useState("");
  const [status, setStatus] = React.useState<"all" | "active" | "inactive">("all");

  const filtered = React.useMemo(() => {
    return employees
      .filter((e) => (q ? (e.fullName + e.email).toLowerCase().includes(q.toLowerCase()) : true))
      .filter((e) => (status === "all" ? true : status === "active" ? e.isActive : !e.isActive));
  }, [employees, q, status]);

  function onInvite(email: string) {
    // UX: send them to Licenses Assign with prefill email
    navigate(`/licenses/assign?prefill=${encodeURIComponent(email)}`);
  }

  return (
    <>
      <PageBreadCrumbs
        items={[
          {
            href: " ",
            label: "Dashboard",
          },
          { href: "users/employees", label: "Empleados" },
        ]}
      />
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Employees</h1>
            <p className="text-sm text-muted-foreground">
              Manage employees in your company and their license status.
            </p>
          </div>

          <div className="flex gap-2">
            <Button asChild variant="neutral">
              <Link to="/users">Back</Link>
            </Button>
            <Button asChild>
              <Link to="/licenses/assign">Invite employees</Link>
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <CardTitle>Directory</CardTitle>
              <div className="flex flex-col gap-2 md:flex-row md:items-center">
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search name or email…"
                  className="md:w-70"
                />
                <Select
                  value={status}
                  onValueChange={(v) => setStatus(v as any)}
                >
                  <SelectTrigger className="md:w-45">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="rounded-md border">
              <table className="w-full text-sm">
                <thead className="border-b">
                  <tr>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Account</th>
                    <th className="p-3 text-left">License</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td className="p-3" colSpan={5}>
                        Loading…
                      </td>
                    </tr>
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td className="p-3 text-muted-foreground" colSpan={5}>
                        No employees found.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((e) => (
                      <tr key={e.id} className="border-b last:border-b-0">
                        <td className="p-3">{e.fullName}</td>
                        <td className="p-3">{e.email}</td>
                        <td className="p-3">
                          <Badge variant="neutral">
                            {e.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <LicenseBadge status={e.licenseStatus} />
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="neutral" asChild>
                              <Link to={`/users/employees/${e.id}`}>
                                View
                              </Link>
                            </Button>

                            {/* If already licensed, you can disable invite */}
                            <Button
                              size="sm"
                              onClick={() => onInvite(e.email)}
                              disabled={e.licenseStatus === "active"}
                            >
                              Invite
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-3 text-xs text-muted-foreground">
              Tip: “Invite” takes you to Licenses → Invite & Assign with the
              email pre-filled.
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
