import { LoaderCircleIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { gql, useMutation, useQuery } from "urql";
import { PageBreadCrumbs } from "ui/components/admin/page-breadcrumbs";
import { Badge } from "ui/components/badge";
import { Button, Label } from "ui/components/index";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "ui/components/dialog";
import { Input } from "ui/components/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "ui/components/table";
import { InstructorCoursesDocument } from "gql-generated/generated/bff.sdk";
import {
  CourseStatus,
  type InstructorCoursesQuery,
} from "gql-generated/generated/types";
import type { Route } from "./+types/demo-access";

/*
 * Accesos demo: a few days of free access to some courses, by email
 * invitation, so people can try them and leave a review. The days count
 * from when the person accepts; at the end the API takes the courses away
 * and their reviews show "Acceso de cortesía".
 *
 * Plain urql documents (no codegen) so this page doesn't need the generated
 * types to be refreshed.
 */

type Status = "INVITED" | "INVITE_EXPIRED" | "ACTIVE" | "ENDED" | "REVOKED";

interface DemoAccess {
  id: string;
  email: string;
  fullName: string | null;
  courses: { id: string; title: string }[];
  days: number;
  status: Status;
  invitedAt: string;
  acceptedAt: string | null;
  endsAt: string | null;
}

const FIELDS = `
  id
  email
  fullName
  courses { id title }
  days
  status
  invitedAt
  acceptedAt
  endsAt
`;

const DEMO_ACCESSES = gql`
  query DemoAccesses {
    demoAccesses { ${FIELDS} }
  }
`;

const INVITE = gql`
  mutation InviteDemoUser($email: String!, $courseIds: [ID!]!, $days: Int) {
    inviteDemoUser(email: $email, courseIds: $courseIds, days: $days) { ${FIELDS} }
  }
`;

const RESEND = gql`
  mutation ResendDemoInvite($id: ID!) {
    resendDemoInvite(id: $id) { ${FIELDS} }
  }
`;

const REVOKE = gql`
  mutation RevokeDemoAccess($id: ID!) {
    revokeDemoAccess(id: $id) { ${FIELDS} }
  }
`;

const STATUS: Record<Status, { label: string; className: string }> = {
  INVITED: { label: "Invitado", className: "bg-[#FFF4CC]" },
  INVITE_EXPIRED: { label: "Invitación vencida", className: "bg-[#EDEDED]" },
  ACTIVE: { label: "Activo", className: "bg-[#D7F5DD]" },
  ENDED: { label: "Terminó", className: "bg-[#EDEDED]" },
  REVOKED: { label: "Cancelado", className: "bg-[#FFE1DE]" },
};

const dateFormat = new Intl.DateTimeFormat("es-MX", {
  dateStyle: "medium",
  timeZone: "America/Mexico_City",
});

function formatDate(value: string | null) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : dateFormat.format(date);
}

/** Emails pasted one per line or separated by commas. */
function parseEmails(raw: string) {
  return Array.from(
    new Set(
      raw
        .split(/[\s,;]+/)
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean),
    ),
  );
}

// biome-ignore lint/correctness/noEmptyPattern: route meta signature
export function meta({}: Route.MetaArgs) {
  return [{ title: "Uspk Academy | Accesos demo" }];
}

export default function DemoAccessPage() {
  const context = useMemo(() => ({ additionalTypenames: ["DemoAccess"] }), []);
  const [{ data, fetching, error }, refetch] = useQuery<{
    demoAccesses: DemoAccess[];
  }>({ query: DEMO_ACCESSES, context });
  const [{ data: coursesData }] = useQuery<InstructorCoursesQuery>({
    query: InstructorCoursesDocument,
    variables: { limit: 200 },
  });
  const [, invite] = useMutation(INVITE);
  const [, resend] = useMutation(RESEND);
  const [, revoke] = useMutation(REVOKE);

  const [open, setOpen] = useState(false);
  const [emails, setEmails] = useState("");
  const [courseIds, setCourseIds] = useState<string[]>([]);
  const [days, setDays] = useState("7");
  const [sending, setSending] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const courses = (coursesData?.instructorCourses?.course ?? []).filter(
    (course) => course.status === CourseStatus.Published,
  );

  const reset = () => {
    setEmails("");
    setCourseIds([]);
    setDays("7");
  };

  const handleInvite = async () => {
    const list = parseEmails(emails);
    const n = Number(days);
    if (list.length === 0) return toast.error("Escribe al menos un correo.");
    if (courseIds.length === 0) return toast.error("Elige al menos un curso.");
    if (!Number.isInteger(n) || n < 1 || n > 60)
      return toast.error("Los días van de 1 a 60.");
    setSending(true);
    const failed: string[] = [];
    for (const email of list) {
      const result = await invite({ email, courseIds, days: n }, context);
      if (result.error) {
        failed.push(
          `${email}: ${result.error.graphQLErrors[0]?.message ?? result.error.message}`,
        );
      }
    }
    setSending(false);
    const sent = list.length - failed.length;
    if (sent > 0)
      toast.success(
        sent === 1 ? "Invitación enviada." : `${sent} invitaciones enviadas.`,
      );
    if (failed.length > 0) {
      toast.error("No se enviaron todas", { description: failed.join("\n") });
      return;
    }
    reset();
    setOpen(false);
    refetch({ requestPolicy: "network-only" });
  };

  const act = async (
    id: string,
    run: typeof resend,
    success: string,
  ) => {
    setBusyId(id);
    const result = await run({ id }, context);
    setBusyId(null);
    if (result.error) {
      toast.error(
        result.error.graphQLErrors[0]?.message ?? result.error.message,
      );
      return;
    }
    toast.success(success);
    refetch({ requestPolicy: "network-only" });
  };

  const rows = data?.demoAccesses ?? [];

  return (
    <>
      <PageBreadCrumbs
        items={[{ label: "Cursos", href: "courses" }, { label: "Accesos demo" }]}
      />
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <p className="max-w-2xl text-sm text-muted-foreground">
            Unos días de acceso gratis a uno o varios cursos, por invitación,
            para que la persona los pruebe y deje su reseña. Los días cuentan
            desde que acepta. Al terminar pierde el acceso a esos cursos (su
            cuenta y su progreso se quedan) y su reseña aparece como “Acceso de
            cortesía”.
          </p>
          <Button type="button" variant="noShadow" onClick={() => setOpen(true)}>
            Invitar
          </Button>
        </div>

        {error ? (
          <p className="text-sm text-red-600">{error.message}</p>
        ) : fetching && !data ? (
          <p className="text-sm text-muted-foreground">Cargando…</p>
        ) : rows.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Todavía no hay accesos demo.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Persona</TableHead>
                <TableHead>Cursos</TableHead>
                <TableHead>Días</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Termina</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => {
                const status = STATUS[row.status];
                const busy = busyId === row.id;
                const canResend =
                  row.status === "INVITED" || row.status === "INVITE_EXPIRED";
                const canRevoke =
                  row.status === "INVITED" ||
                  row.status === "INVITE_EXPIRED" ||
                  row.status === "ACTIVE";
                return (
                  <TableRow key={row.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-semibold">
                          {row.fullName ?? row.email}
                        </span>
                        {row.fullName && (
                          <span className="text-xs text-muted-foreground">
                            {row.email}
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground">
                          Invitado el {formatDate(row.invitedAt)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs text-sm">
                      {row.courses.map((c) => c.title).join(", ")}
                    </TableCell>
                    <TableCell>{row.days}</TableCell>
                    <TableCell>
                      <Badge className={status.className}>{status.label}</Badge>
                    </TableCell>
                    <TableCell>{formatDate(row.endsAt)}</TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        {canResend && (
                          <Button
                            type="button"
                            variant="neutral"
                            size="sm"
                            disabled={busy}
                            onClick={() =>
                              act(row.id, resend, "Invitación reenviada.")
                            }
                          >
                            Reenviar
                          </Button>
                        )}
                        {canRevoke && (
                          <Button
                            type="button"
                            variant="neutral"
                            size="sm"
                            disabled={busy}
                            onClick={() => {
                              const what =
                                row.status === "ACTIVE"
                                  ? `¿Quitar ahora el acceso de ${row.email}?`
                                  : `¿Cancelar la invitación de ${row.email}?`;
                              if (window.confirm(what))
                                act(
                                  row.id,
                                  revoke,
                                  row.status === "ACTIVE"
                                    ? "Acceso terminado."
                                    : "Invitación cancelada.",
                                );
                            }}
                          >
                            {row.status === "ACTIVE" ? "Terminar" : "Cancelar"}
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>

      <Dialog
        open={open}
        onOpenChange={(value) => {
          setOpen(value);
          if (!value) reset();
        }}
      >
        <DialogContent className="flex flex-col gap-0 p-0 sm:max-w-lg">
          <DialogHeader className="border-b bg-[#F7F7F7] px-6 py-4 text-left">
            <DialogTitle className="text-base">Invitar a un acceso demo</DialogTitle>
            <DialogDescription>
              Le llega un correo para aceptar (con su cuenta o creando una con
              ese correo). La invitación vence en 14 días.
            </DialogDescription>
          </DialogHeader>
          <form
            id="demo-invite-form"
            className="flex flex-col gap-4 px-6 pt-4 pb-6"
            onSubmit={(event) => {
              event.preventDefault();
              void handleInvite();
            }}
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="demo-emails">Correos</Label>
              <textarea
                id="demo-emails"
                rows={3}
                value={emails}
                onChange={(event) => setEmails(event.target.value)}
                placeholder={"ana@correo.com\nluis@correo.com"}
                className="rounded-base border-2 border-border bg-white px-3 py-2 text-sm"
              />
              <span className="text-xs text-muted-foreground">
                Uno por línea o separados por coma. Cada uno recibe su propia
                invitación.
              </span>
            </div>
            <fieldset className="flex flex-col gap-2">
              <legend className="mb-2 text-sm font-semibold">Cursos</legend>
              <div className="flex max-h-56 flex-col gap-2 overflow-y-auto rounded-base border-2 border-border p-3">
                {courses.length === 0 && (
                  <span className="text-sm text-muted-foreground">
                    No hay cursos publicados.
                  </span>
                )}
                {courses.map((course) => (
                  <label
                    key={course.id}
                    className="flex items-center gap-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      className="size-4"
                      checked={courseIds.includes(course.id)}
                      onChange={(event) =>
                        setCourseIds((ids) =>
                          event.target.checked
                            ? [...ids, course.id]
                            : ids.filter((id) => id !== course.id),
                        )
                      }
                    />
                    {course.title}
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="flex flex-col gap-2">
              <Label htmlFor="demo-days">Días de acceso</Label>
              <Input
                id="demo-days"
                type="number"
                min={1}
                max={60}
                value={days}
                onChange={(event) => setDays(event.target.value)}
                className="w-28"
              />
            </div>
          </form>
          <DialogFooter className="border-t px-6 py-4">
            <Button
              type="button"
              variant="neutral"
              onClick={() => setOpen(false)}
              disabled={sending}
            >
              Cancelar
            </Button>
            <Button type="submit" form="demo-invite-form" disabled={sending}>
              {sending && (
                <LoaderCircleIcon className="mr-2 size-4 animate-spin" />
              )}
              Enviar invitación
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
