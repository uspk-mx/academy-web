import {
  type TeamDashboardQuery,
  type TeamDashboardQueryVariables,
  TeamDashboardDocument,
} from "gql-generated/gql/graphql";
import {
  Award,
  BookOpen,
  ChartBarIcon,
  Loader2,
  Mail,
  Search,
  TrendingUp,
  Users,
  Users2Icon,
} from "lucide-react";
import { useState } from "react";
import { useCompanyId } from "ui/components/business/hooks/use-company-id";
import { Button } from "ui/components/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "ui/components/tabs";
import { useQuery } from "urql";

export function meta() {
  return [
    { title: `Uspk Academy | Mi Equipo` },
    { name: "description", content: "Información del equipo de trabajo." },
  ];
}

export default function MiEquipoPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const companyId = useCompanyId();

  const [{ data, fetching }] = useQuery<
    TeamDashboardQuery,
    TeamDashboardQueryVariables
  >({
    query: TeamDashboardDocument,
    variables: { companyId },
  });

  const teamStats = data?.companyTeamStats;
  const teamMembersData = data?.companyTeamMembers;
  const teamMembers = teamMembersData?.members || [];

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.occupation?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Loading state
  if (fetching) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <div className="text-center">
          <Loader2 className="mx-auto h-16 w-16 animate-spin text-main" />
          <p className="mt-4 text-xl font-black">
            Cargando información del equipo...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="relative">
          <div className="relative rounded-xl border-4 border-black bg-card p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="rounded-lg border-4 border-black bg-chart-4 p-2">
                  <Users
                    className="h-8 w-8 stroke-white"
                    strokeWidth={2.5}
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-black">Mi Equipo</h1>
                  <p className="text-sm text-muted-foreground">
                    {teamStats?.activeMembers || 0} miembros activos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="stats" className="w-full">
          <TabsList className="grid w-full grid-cols-2 border-4 border-black">
            <TabsTrigger value="stats" className="text-base font-bold">
              <ChartBarIcon /> Stats del Equipo
            </TabsTrigger>
            <TabsTrigger value="directory" className="text-base font-bold">
              <Users2Icon /> Directorio
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stats" className="mt-6 space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border-4 border-black bg-card p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border-2 border-black bg-chart-4/20">
                    <Users className="h-6 w-6 text-chart-4" strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-3xl font-black tabular-nums">
                      {teamStats?.activeMembers || 0}
                    </p>
                    <p className="text-xs font-bold text-muted-foreground">
                      Miembros Activos
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border-4 border-black bg-card p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border-2 border-black bg-chart-1/20">
                    <BookOpen
                      className="h-6 w-6 text-chart-1"
                      strokeWidth={2.5}
                    />
                  </div>
                  <div>
                    <p className="text-3xl font-black tabular-nums">
                      {teamStats?.coursesInProgress || 0}
                    </p>
                    <p className="text-xs font-bold text-muted-foreground">
                      Cursos en Progreso
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border-4 border-black bg-card p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border-2 border-black bg-chart-2/20">
                    <Award className="h-6 w-6 text-chart-2" strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-3xl font-black tabular-nums">
                      {teamStats?.certificatesEarned || 0}
                    </p>
                    <p className="text-xs font-bold text-muted-foreground">
                      Certificados
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border-4 border-black bg-card p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border-2 border-black bg-chart-3/20">
                    <TrendingUp
                      className="h-6 w-6 text-chart-3"
                      strokeWidth={2.5}
                    />
                  </div>
                  <div>
                    <p className="text-3xl font-black tabular-nums">
                      {teamStats?.avgProgressPercentage?.toFixed(0) || 0}%
                    </p>
                    <p className="text-xs font-bold text-muted-foreground">
                      Progreso Promedio
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border-4 border-black bg-card shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="border-b-4 border-black bg-main p-4">
                <h2 className="text-xl font-black">
                  Tu Posición vs Promedio del Equipo
                </h2>
              </div>
              <div className="p-6">
                <div className="rounded-lg border-2 border-black bg-chart-1/10 p-4 text-center">
                  <p className="text-sm font-bold">
                    Esta sección mostrará tu progreso comparado con el promedio
                    del equipo
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Necesitamos obtener tus stats personales para hacer la
                    comparación
                  </p>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border-2 border-black bg-muted p-4">
                    <p className="text-sm font-bold text-muted-foreground">
                      Promedio de Cursos en Progreso
                    </p>
                    <p className="mt-1 text-2xl font-black">
                      {teamStats?.activeMembers
                        ? (
                            (teamStats.coursesInProgress || 0) /
                            teamStats.activeMembers
                          ).toFixed(1)
                        : 0}
                    </p>
                  </div>
                  <div className="rounded-lg border-2 border-black bg-muted p-4">
                    <p className="text-sm font-bold text-muted-foreground">
                      Progreso Promedio del Equipo
                    </p>
                    <p className="mt-1 text-2xl font-black">
                      {teamStats?.avgProgressPercentage?.toFixed(0) || 0}%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border-4 border-black bg-card shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="border-b-4 border-black bg-chart-2 p-4">
                <h2 className="text-xl font-black text-white">
                  🏆 Logros del Equipo
                </h2>
              </div>
              <div className="p-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-lg border-2 border-black bg-main p-4 text-center">
                    <div className="text-4xl">🎯</div>
                    <p className="mt-2 text-2xl font-black">
                      {teamStats?.coursesInProgress &&
                      teamStats?.coursesCompleted
                        ? Math.round(
                            (teamStats.coursesCompleted /
                              (teamStats.coursesInProgress +
                                teamStats.coursesCompleted)) *
                              100,
                          )
                        : 0}
                      %
                    </p>
                    <p className="text-xs font-bold text-muted-foreground">
                      Tasa de Completación
                    </p>
                  </div>
                  <div className="rounded-lg border-2 border-black bg-main p-4 text-center">
                    <div className="text-4xl">📚</div>
                    <p className="mt-2 text-2xl font-black">
                      {teamStats?.activeMembers
                        ? (
                            (teamStats.coursesInProgress || 0) /
                            teamStats.activeMembers
                          ).toFixed(1)
                        : 0}
                    </p>
                    <p className="text-xs font-bold text-muted-foreground">
                      Cursos por Persona
                    </p>
                  </div>
                  <div className="rounded-lg border-2 border-black bg-main p-4 text-center">
                    <div className="text-4xl">⚡</div>
                    <p className="mt-2 text-2xl font-black">
                      {teamStats?.avgProgressPercentage?.toFixed(0) || 0}%
                    </p>
                    <p className="text-xs font-bold text-muted-foreground">
                      Progreso Promedio
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="directory" className="mt-6 space-y-6">
            <div className="rounded-xl border-4 border-black bg-card p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar por nombre, email, rol o departamento..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border-4 border-black bg-card py-3 pl-12 pr-4 font-bold placeholder:text-muted-foreground focus:outline-none focus:ring-4 focus:ring-main"
                />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {filteredMembers.length} de {teamMembers.length} miembros
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="group rounded-xl border-4 border-black bg-card p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                >
                  <div className="flex items-start gap-3">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-4 border-black">
                      {member.profilePicture ? (
                        <img
                          src={member.profilePicture}
                          alt={member.fullName || "Member"}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-main text-2xl">
                          {member.fullName?.charAt(0) || "?"}
                        </div>
                      )}
                      {!member.isActive && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-xs font-bold text-white">
                            Inactivo
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="truncate font-black">{member.fullName}</h3>
                      <p className="truncate text-sm font-bold text-muted-foreground">
                        {member.occupation || member.role || "Miembro"}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2 text-xs">
                        <div className="rounded-md border-2 border-black bg-chart-1/20 px-2 py-1 font-bold">
                          {member.coursesInProgress || 0} en progreso
                        </div>
                        <div className="rounded-md border-2 border-black bg-chart-2/20 px-2 py-1 font-bold">
                          {member.certificatesEarned || 0} cert.
                        </div>
                      </div>
                    </div>
                  </div>
                  <a
                    href={`mailto:${member.email}`}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-black bg-main py-2 font-bold transition-all hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <Mail className="h-4 w-4" />
                    Enviar Email
                  </a>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredMembers.length === 0 && (
              <div className="rounded-xl border-4 border-black bg-card p-12 text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <Search className="mx-auto h-16 w-16 text-muted-foreground" />
                <h3 className="mt-4 text-xl font-black">
                  No se encontraron resultados
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Intenta con otro término de búsqueda
                </p>
                <Button
                  onClick={() => setSearchQuery("")}
                  className="mt-4"
                  variant="neutral"
                >
                  Limpiar búsqueda
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
