import { Link } from "react-router";
import { useQuery } from "urql";
import {
  TeamDashboardDocument,
  CompanyAdminsDocument,
  CompanyAdminInvitesDocument,
} from "gql-generated/generated/bff.sdk";
import type {
  TeamDashboardQuery,
  TeamDashboardQueryVariables,
  CompanyAdminsQuery,
  CompanyAdminsQueryVariables,
  CompanyAdminInvitesQuery,
  CompanyAdminInvitesQueryVariables,
} from "gql-generated/generated/types";
import { useCompanyId } from "ui/components/business/hooks/use-company-id";
import { Card, CardContent, CardHeader, CardTitle } from "ui/components/card";
import { Button } from "ui/components/button";
import { Badge } from "ui/components/badge";
import { PageBreadCrumbs } from "ui/components/admin/page-breadcrumbs";

export default function UsersOverviewPage() {
  const companyId = useCompanyId();

  const [{ data: teamData, fetching: teamFetching }] = useQuery<
    TeamDashboardQuery,
    TeamDashboardQueryVariables
  >({
    query: TeamDashboardDocument,
    variables: { companyId },
    pause: !companyId,
  });

  const [{ data: adminsData, fetching: adminsFetching }] = useQuery<
    CompanyAdminsQuery,
    CompanyAdminsQueryVariables
  >({
    query: CompanyAdminsDocument,
    variables: { companyId },
    pause: !companyId,
  });

  const [{ data: invitesData, fetching: invitesFetching }] = useQuery<
    CompanyAdminInvitesQuery,
    CompanyAdminInvitesQueryVariables
  >({
    query: CompanyAdminInvitesDocument,
    variables: { companyId },
    pause: !companyId,
  });

  const isLoading = teamFetching || adminsFetching || invitesFetching;
  const stats = teamData?.companyTeamStats;
  const adminCount = adminsData?.companyAdmins?.length ?? 0;
  const pendingInvites =
    invitesData?.companyAdminInvites?.filter((i) => i.status === "active")
      .length ?? 0;

  return (
    <>
      <PageBreadCrumbs
        items={[
          { href: "/", label: "Dashboard" },
          { label: "Usuarios" },
        ]}
      />
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Usuarios</h1>
            <p className="text-sm text-muted-foreground">
              Administra empleados, administradores e invitaciones de tu empresa.
            </p>
          </div>

          <div className="flex gap-2">
            <Button asChild variant="neutral">
              <Link to="/users/admins">Administradores</Link>
            </Button>
            <Button asChild>
              <Link to="/users/employees">Empleados</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Empleados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">
                {isLoading ? (
                  <div className="h-9 w-12 bg-muted rounded animate-pulse" />
                ) : (
                  stats?.totalMembers ?? 0
                )}
              </div>
              <div className="text-xs text-muted-foreground">
                Total de empleados
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Activos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">
                {isLoading ? (
                  <div className="h-9 w-12 bg-muted rounded animate-pulse" />
                ) : (
                  stats?.activeMembers ?? 0
                )}
              </div>
              <div className="text-xs text-muted-foreground">
                Cuentas activas
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Administradores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">
                {isLoading ? (
                  <div className="h-9 w-12 bg-muted rounded animate-pulse" />
                ) : (
                  adminCount
                )}
              </div>
              <div className="text-xs text-muted-foreground">
                Admins de la empresa
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Invitaciones pendientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">
                {isLoading ? (
                  <div className="h-9 w-12 bg-muted rounded animate-pulse" />
                ) : (
                  pendingInvites
                )}
              </div>
              <div className="text-xs text-muted-foreground">
                Sin aceptar
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Empleados
                <Badge variant="neutral">Gestionar</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Ve a tus empleados, su progreso en cursos e invita nuevos
                usuarios con las licencias disponibles.
              </p>
              <Button asChild>
                <Link to="/users/employees">Ir a Empleados</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Administradores
                <Badge variant="neutral">Permisos</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Agrega o elimina administradores que pueden gestionar licencias,
                invitaciones y configuracion de la empresa.
              </p>
              <Button asChild variant="neutral">
                <Link to="/users/admins">Ir a Administradores</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
