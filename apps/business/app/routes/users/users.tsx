import { Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "ui/components/card";
import { Button } from "ui/components/button";
import { Badge } from "ui/components/badge";
import { PageBreadCrumbs } from "ui/components/admin/page-breadcrumbs";

type Props = { companyId: string };

export default function UsersOverviewPage({ companyId }: Props) {
  // TODO: hook -> useCompanyUsersSummary(companyId)
  const summary = {
    totalEmployees: 0,
    activeEmployees: 0,
    admins: 0,
    pendingInvites: 0,
  };

  return (
    <>
      <PageBreadCrumbs
        items={[
          {
            href: " ",
            label: "Dashboard",
          },
          { href: "users", label: "Usuarios" },
        ]}
      />
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
            <p className="text-sm text-muted-foreground">
              Manage employees, admins, and invitations for your company.
            </p>
          </div>

          <div className="flex gap-2">
            <Button asChild variant="neutral">
              <Link to="/users/admins">Admins</Link>
            </Button>
            <Button asChild>
              <Link to="/users/employees">Employees</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Employees</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">
                {summary.totalEmployees}
              </div>
              <div className="text-xs text-muted-foreground">
                Total employees
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">
                {summary.activeEmployees}
              </div>
              <div className="text-xs text-muted-foreground">
                Active accounts
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Admins</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">{summary.admins}</div>
              <div className="text-xs text-muted-foreground">
                Company admins
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Pending invites
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">
                {summary.pendingInvites}
              </div>
              <div className="text-xs text-muted-foreground">
                Not accepted yet
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Employees
                <Badge variant="neutral">Manage</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                View employees, see license status, and invite new users using
                available seats.
              </p>
              <Button asChild>
                <Link to="/users/employees">Go to Employees</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Admins
                <Badge variant="neutral">Permissions</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Add/remove admins who can manage licenses, invites, and company
                settings.
              </p>
              <Button asChild variant="neutral">
                <Link to="/users/admins">Go to Admins</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
