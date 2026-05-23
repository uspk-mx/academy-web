import { useState } from "react";
import { Link } from "react-router";
import { useQuery } from "urql";
import { TeamDashboardDocument } from "gql-generated/generated/bff.sdk";
import type {
  TeamDashboardQuery,
  TeamDashboardQueryVariables,
} from "gql-generated/generated/types";
import { useCompanyId } from "ui/components/business/hooks/use-company-id";
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

export default function EmployeesPage() {
  const companyId = useCompanyId();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");

  const [{ data, fetching }] = useQuery<
    TeamDashboardQuery,
    TeamDashboardQueryVariables
  >({
    query: TeamDashboardDocument,
    variables: {
      companyId,
      filter: {
        search: search || undefined,
        isActive: statusFilter === "all" ? undefined : statusFilter === "active",
        limit: 100,
      },
    },
    pause: !companyId,
  });

  const members = data?.companyTeamMembers?.members ?? [];
  const total = data?.companyTeamMembers?.total ?? 0;

  return (
    <>
      <PageBreadCrumbs
        items={[
          { href: "/", label: "Dashboard" },
          { href: "/users", label: "Usuarios" },
          { label: "Empleados" },
        ]}
      />
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Empleados</h1>
            <p className="text-sm text-muted-foreground">
              Administra los empleados de tu empresa y su progreso.
            </p>
          </div>

          <div className="flex gap-2">
            <Button asChild variant="neutral">
              <Link to="/users">Regresar</Link>
            </Button>
            <Button asChild>
              <Link to="/licenses/assign">Invitar empleados</Link>
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <CardTitle>
                Directorio{" "}
                <span className="text-muted-foreground font-normal text-sm">
                  ({total})
                </span>
              </CardTitle>
              <div className="flex flex-col gap-2 md:flex-row md:items-center">
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar por nombre o email..."
                  className="md:w-70"
                />
                <Select
                  value={statusFilter}
                  onValueChange={(v) => setStatusFilter(v as "all" | "active" | "inactive")}
                >
                  <SelectTrigger className="md:w-45">
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="active">Activos</SelectItem>
                    <SelectItem value="inactive">Inactivos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="rounded-md border">
              <table className="w-full text-sm">
                <thead className="border-b bg-muted/50">
                  <tr>
                    <th className="p-3 text-left font-medium">Nombre</th>
                    <th className="p-3 text-left font-medium">Email</th>
                    <th className="p-3 text-left font-medium">Estado</th>
                    <th className="p-3 text-center font-medium">Cursos</th>
                    <th className="p-3 text-center font-medium">Completados</th>
                    <th className="p-3 text-center font-medium">Progreso</th>
                    <th className="p-3 text-center font-medium">Certificados</th>
                  </tr>
                </thead>
                <tbody>
                  {fetching ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <tr key={i} className="border-b last:border-b-0">
                        {Array.from({ length: 7 }).map((_, j) => (
                          <td key={j} className="p-3">
                            <div className="h-4 bg-muted rounded animate-pulse" />
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : members.length === 0 ? (
                    <tr>
                      <td className="p-8 text-center text-muted-foreground" colSpan={7}>
                        {search || statusFilter !== "all"
                          ? "No se encontraron empleados con esos filtros."
                          : "Aun no hay empleados registrados."}
                      </td>
                    </tr>
                  ) : (
                    members.map((member) => (
                      <tr key={member.id} className="border-b last:border-b-0">
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            {member.profilePicture ? (
                              <img
                                src={member.profilePicture}
                                alt={member.fullName}
                                className="w-7 h-7 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                                {member.fullName.charAt(0).toUpperCase()}
                              </div>
                            )}
                            <span className="font-medium">{member.fullName}</span>
                          </div>
                        </td>
                        <td className="p-3 text-muted-foreground">{member.email}</td>
                        <td className="p-3">
                          <Badge variant={member.isActive ? "default" : "neutral"}>
                            {member.isActive ? "Activo" : "Inactivo"}
                          </Badge>
                        </td>
                        <td className="p-3 text-center tabular-nums">
                          {member.coursesInProgress}
                        </td>
                        <td className="p-3 text-center tabular-nums">
                          {member.coursesCompleted}
                        </td>
                        <td className="p-3 text-center tabular-nums">
                          {Math.round(member.avgProgress)}%
                        </td>
                        <td className="p-3 text-center tabular-nums">
                          {member.certificatesEarned}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
