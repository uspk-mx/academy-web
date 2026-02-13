import {
  MeDocument,
  type MeQuery,
  type MeQueryVariables,
} from "gql-generated/gql/graphql";
import {
  Award,
  Calendar,
  CheckCircle2,
  Copy,
  Download,
  ExternalLink,
  Loader2,
  Mail,
  Search,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "ui/components/button";
import { useQuery } from "urql";

export default function CertificadosPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "name">("recent");

  // Fetch user data with certificates
  const [{ data, fetching }] = useQuery<MeQuery, MeQueryVariables>({
    query: MeDocument,
  });

  const user = data?.me;
  const certificates =
    user?.courses
      ?.flatMap((item) => item?.certificates ?? [])
      .filter((cert): cert is NonNullable<typeof cert> => cert != null) || [];

  // Get completed courses count from courses
  const completedCoursesCount =
    user?.courses?.filter((e) => e?.progress?.progressPercentage === 100)
      .length || 0;

  // Calculate stats
  const certificateStats = {
    totalEarned: certificates.length,
    thisMonth: certificates.filter((cert) => {
      const issuedDate = new Date(cert?.issuedAt ?? "");
      const now = new Date();
      return (
        issuedDate.getMonth() === now.getMonth() &&
        issuedDate.getFullYear() === now.getFullYear()
      );
    }).length,
    pending: completedCoursesCount - certificates.length, // Courses completed but no cert yet
    averageScore: 0, // Could calculate from courses if needed
  };

  const filteredCertificates = certificates
    .filter((cert) =>
      cert?.template?.name?.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "recent") {
        return (
          new Date(b?.issuedAt ?? "").getTime() -
          new Date(a?.issuedAt ?? "").getTime()
        );
      }
      return (a?.template?.name || "").localeCompare(b?.template?.name || "");
    });

  const handleDownload = (certId: string, courseName: string) => {
    toast.success("Descargando certificado", {
      description: `${courseName} - PDF`,
    });
    // Here would be actual download logic
    // Example: window.open(`/api/certificates/${certId}/download`, '_blank');
  };

  const handleShare = (certId: string, courseName: string) => {
    const shareUrl = `${window.location.origin}/certificates/${certId}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copiado al portapapeles", {
      description: "Puedes compartir tu certificado en LinkedIn o email",
    });
  };

  const handleShareEmail = (certId: string, courseName: string) => {
    const subject = encodeURIComponent(`Mi Certificado: ${courseName}`);
    const body = encodeURIComponent(
      `¡He completado el curso "${courseName}"! Ver certificado: ${window.location.origin}/certificates/${certId}`,
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  // Loading state
  if (fetching) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <div className="text-center">
          <Loader2 className="mx-auto h-16 w-16 animate-spin text-main" />
          <p className="mt-4 text-xl font-black">
            Cargando tus certificados...
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
                <div className="rounded-lg border-4 border-black bg-chart-2 p-2">
                  <Award
                    className="h-8 w-8 stroke-white"
                    strokeWidth={2.5}
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-black">Mis Certificados</h1>
                  <p className="text-sm text-muted-foreground">
                    Todos tus logros en un solo lugar
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border-4 border-black bg-card p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border-2 border-black bg-chart-2/20">
                <Award className="h-6 w-6 text-chart-2" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-3xl font-black tabular-nums">
                  {certificateStats.totalEarned}
                </p>
                <p className="text-xs font-bold text-muted-foreground">
                  Total Obtenidos
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border-4 border-black bg-card p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border-2 border-black bg-chart-1/20">
                <Calendar className="h-6 w-6 text-chart-1" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-3xl font-black tabular-nums">
                  {certificateStats.thisMonth}
                </p>
                <p className="text-xs font-bold text-muted-foreground">Este Mes</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border-4 border-black bg-card p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border-2 border-black bg-chart-4/20">
                <CheckCircle2 className="h-6 w-6 text-chart-4" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-3xl font-black tabular-nums">
                  {certificateStats.pending}
                </p>
                <p className="text-xs font-bold text-muted-foreground">
                  Cursos Pendientes
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border-4 border-black bg-card p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border-2 border-black bg-chart-3/20">
                <TrendingUp className="h-6 w-6 text-chart-3" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-3xl font-black tabular-nums">
                  {completedCoursesCount}
                </p>
                <p className="text-xs font-bold text-muted-foreground">
                  Cursos Completados
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Only show filters if there are certificates */}
        {certificates.length > 0 && (
          <div className="rounded-xl border-4 border-black bg-card p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar por nombre de curso..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border-4 border-black bg-card py-3 pl-12 pr-4 font-bold placeholder:text-muted-foreground focus:outline-none focus:ring-4 focus:ring-main"
                />
              </div>

              {/* Sort */}
              <div className="flex gap-2">
                <span className="flex items-center text-sm font-bold text-muted-foreground">
                  Ordenar:
                </span>
                {(
                  [
                    { value: "recent", label: "Más reciente" },
                    { value: "name", label: "Nombre" },
                  ] as const
                ).map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSortBy(option.value)}
                    className={`rounded-lg border-2 border-black px-3 py-1 text-sm font-bold transition-all ${
                      sortBy === option.value
                        ? "bg-black text-white"
                        : "bg-card hover:bg-muted"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {filteredCertificates.length} de {certificates.length} certificados
            </p>
          </div>
        )}

        {/* Certificates Grid */}
        {certificates.length === 0 ? (
          <div className="rounded-xl border-4 border-black bg-card p-12 text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <Award className="mx-auto h-16 w-16 text-muted-foreground" />
            <h3 className="mt-4 text-xl font-black">Aún no tienes certificados</h3>
            <p className="mt-2 text-muted-foreground">
              Completa tus cursos para obtener certificados profesionales
            </p>
            <Button
              className="mt-6"
              onClick={() => (window.location.href = "/courses")}
            >
              Ver Mis Cursos
            </Button>
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2">
              {filteredCertificates.map((cert) => (
                <div
                  key={cert.id}
                  className="group rounded-xl border-4 border-black bg-card shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                >
                  {/* Certificate Preview */}
                  <div className="relative aspect-video overflow-hidden rounded-t-lg border-b-4 border-black bg-linear-to-br from-chart-1 to-chart-2">
                    {cert.template?.background ? (
                      <img
                        src={cert.template.background}
                        alt={cert.template.name || "Certificate"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center p-8">
                        {cert.template?.logoUrl && (
                          <img
                            src={cert.template.logoUrl}
                            alt="Logo"
                            className="max-h-24 max-w-full object-contain"
                          />
                        )}
                      </div>
                    )}
                    {/* Verified Badge */}
                    <div className="absolute right-4 top-4 rounded-lg border-4 border-black bg-chart-2 px-3 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <CheckCircle2 className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  {/* Certificate Info */}
                  <div className="p-6">
                    <div className="mb-3 flex items-start justify-between gap-2">
                      <h3 className="text-xl font-black leading-tight">
                        {cert.template?.name || "Certificado"}
                      </h3>
                      <div className="shrink-0 rounded-full border-2 border-black bg-chart-2 p-1.5">
                        <Award className="h-5 w-5 text-white" />
                      </div>
                    </div>

                    <div className="mb-4 space-y-2 text-sm">
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <span className="flex items-center gap-1 font-bold">
                          <Calendar className="h-4 w-4" />
                          {new Date(cert.issuedAt ?? "").toLocaleDateString(
                            "es-MX",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Certificate ID */}
                    <div className="mb-4 rounded-lg border-2 border-black bg-muted p-3">
                      <p className="text-xs font-bold text-muted-foreground">
                        ID de Certificado
                      </p>
                      <p className="mt-1 font-mono text-sm font-bold">
                        {cert.id.slice(0, 16)}...
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        onClick={() =>
                          handleDownload(cert.id, cert.template?.name || "Certificado")
                        }
                        className="flex-1"
                        size="sm"
                      >
                        <Download className="h-4 w-4" />
                        Descargar
                      </Button>
                      <Button
                        onClick={() =>
                          handleShare(cert.id, cert.template?.name || "Certificado")
                        }
                        variant="neutral"
                        size="sm"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() =>
                          handleShareEmail(
                            cert.id,
                            cert.template?.name || "Certificado"
                          )
                        }
                        variant="neutral"
                        size="sm"
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* View Certificate Link */}
                    <a
                      href={`/certificates/${cert.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 flex items-center justify-center gap-2 text-sm font-bold text-chart-1 hover:underline"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Ver certificado completo
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty Filter State */}
            {filteredCertificates.length === 0 && (
              <div className="rounded-xl border-4 border-black bg-card p-12 text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <Search className="mx-auto h-16 w-16 text-muted-foreground" />
                <h3 className="mt-4 text-xl font-black">
                  No se encontraron certificados
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

            {/* Motivation Card - ONLY if there are certificates */}
            <div className="rounded-xl border-4 border-black bg-chart-1 p-8 text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-6xl">🏆</div>
              <h3 className="mt-4 text-2xl font-black">
                ¡{certificateStats.totalEarned}{" "}
                {certificateStats.totalEarned === 1
                  ? "Certificado Obtenido"
                  : "Certificados Obtenidos"}
                !
              </h3>
              <p className="mt-2 text-lg font-bold">
                Sigue aprendiendo y obteniendo más certificados profesionales
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <Button
                  className="font-bold"
                  onClick={() => (window.location.href = "/courses")}
                >
                  Ver Cursos Disponibles
                </Button>
                <Button
                  variant="neutral"
                  className="font-bold"
                  onClick={() => {
                    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                      window.location.origin + "/certificates"
                    )}`;
                    window.open(linkedInUrl, "_blank");
                  }}
                >
                  Compartir en LinkedIn
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
