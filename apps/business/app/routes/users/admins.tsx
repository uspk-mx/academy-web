import * as React from "react";

import {
  CompanyAdminInvitesDocument,
  CompanyAdminsDocument,
  InviteAdminsDocument,
  MeDocument,
  ResendAdminInviteDocument,
  type CompanyAdminInvitesQuery,
  type CompanyAdminInvitesQueryVariables,
  type CompanyAdminsQuery,
  type CompanyAdminsQueryVariables,
  type InviteAdminsMutation,
  type InviteAdminsMutationVariables,
  type ResendAdminInviteMutation,
  type ResendAdminInviteMutationVariables,
} from "gql-generated/gql/graphql";
import { Badge } from "ui/components/badge";
import { Button } from "ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "ui/components/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "ui/components/dialog";
import { Input } from "ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "ui/components/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "ui/components/table";
import { Textarea } from "ui/components/textarea";
import { useMutation, useQuery } from "urql";
import { PageBreadCrumbs } from "ui/components/admin/page-breadcrumbs";

type Props = { companyId: string };

type AdminUser = {
  id: string;
  fullName: string;
  userName: string;
  email: string;
  isVerified?: boolean | null;
  isActive?: boolean | null;
  createdAt?: string | null;
};

type AdminInvite = {
  id: string;
  email: string;
  companyId: string;
  type: string;
  createdAt: string;
  expiresAt?: string | null;
  status: "active" | "expired" | string;
};

function safeDate(s?: string | null) {
  if (!s) return "—";
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return s;
  return d.toLocaleString();
}

function normalizeEmails(raw: string): string[] {
  return raw
    .split(/[\n,; ]+/g)
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

function statusBadge(status: string) {
  const s = status.toLowerCase();
  if (s === "active") return <Badge>Activo</Badge>;
  if (s === "expired") return <Badge variant="neutral">Expirado</Badge>;
  return <Badge variant="neutral">{status}</Badge>;
}

export default function AdminsPage() {
  const [{ data: meData, fetching: meLoading, error: meError }] = useQuery({
    query: MeDocument,
  });

  const companyId = meData?.me?.company?.id as string | undefined;

  const [adminsResult, reexecAdmins] = useQuery<
    CompanyAdminsQuery,
    CompanyAdminsQueryVariables
  >({
    query: CompanyAdminsDocument,
    variables: { companyId: companyId || "" },
    pause: !companyId,
    requestPolicy: "cache-and-network",
  });

  const [invitesResult, reexecInvites] = useQuery<
    CompanyAdminInvitesQuery,
    CompanyAdminInvitesQueryVariables
  >({
    query: CompanyAdminInvitesDocument,
    variables: { companyId: companyId || "" },
    pause: !companyId,
    requestPolicy: "cache-and-network",
  });

  const [, inviteAdmins] = useMutation<
    InviteAdminsMutation,
    InviteAdminsMutationVariables
  >(InviteAdminsDocument);
  const [, resendInvite] = useMutation<
    ResendAdminInviteMutation,
    ResendAdminInviteMutationVariables
  >(ResendAdminInviteDocument);

  const admins: AdminUser[] = adminsResult.data?.companyAdmins ?? [];
  const invites: AdminInvite[] = invitesResult.data?.companyAdminInvites ?? [];

  const [searchAdmins, setSearchAdmins] = React.useState("");
  const [searchInvites, setSearchInvites] = React.useState("");

  const filteredAdmins = React.useMemo(() => {
    const q = searchAdmins.trim().toLowerCase();
    if (!q) return admins;
    return admins.filter((a) =>
      [a.fullName, a.userName, a.email].some((x) =>
        (x ?? "").toLowerCase().includes(q),
      ),
    );
  }, [admins, searchAdmins]);

  const filteredInvites = React.useMemo(() => {
    const q = searchInvites.trim().toLowerCase();
    if (!q) return invites;
    return invites.filter(
      (i) =>
        i.email.toLowerCase().includes(q) || i.status.toLowerCase().includes(q),
    );
  }, [invites, searchInvites]);

  const refreshAll = React.useCallback(() => {
    reexecAdmins({ requestPolicy: "network-only" });
    reexecInvites({ requestPolicy: "network-only" });
  }, [reexecAdmins, reexecInvites]);

  // Invite modal state
  const [openInviteModal, setOpenInviteModal] = React.useState(false);
  const [emailsText, setEmailsText] = React.useState("");
  const [mode, setMode] = React.useState<"reuse_active" | "renew_if_expired">(
    "renew_if_expired",
  );
  const [submitting, setSubmitting] = React.useState(false);

  async function onInviteSubmit() {
    if (!companyId) return;

    const emails = normalizeEmails(emailsText);
    if (emails.length === 0) {
      alert("Agrega al menos un email.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await inviteAdmins({
        input: {
          companyId,
          emails,
          mode,
        },
      });

      if (res.error) {
        alert(res.error.message);
        return;
      }

      const payload = res.data?.inviteAdmins;
      const errs: string[] = payload?.errors ?? [];

      // UX: show quick summary
      const invited = payload?.invited ?? 0;
      const skipped = payload?.skipped ?? 0;

      if (errs.length > 0) {
        alert(
          `Invitados: ${invited}\nSkipped: ${skipped}\nErrores:\n- ${errs.join("\n- ")}`,
        );
      }

      setOpenInviteModal(false);
      setEmailsText("");
      refreshAll();
    } finally {
      setSubmitting(false);
    }
  }

  async function onResend(inviteId: string) {
    const res = await resendInvite({ inviteId });
    if (res.error) {
      alert(res.error.message);
      return;
    }

    const t = res.data?.resendAdminInvite?.__typename;
    if (t === "InviteNotFoundError" || t === "InviteNotActiveError") {
      alert(res.data?.resendAdminInvite.message);
      return;
    }

    // success cases: AdminInvite | InviteExpiredAndRenewed
    refreshAll();
  }

  if (meLoading) {
    return <div className="p-6">Cargando…</div>;
  }
  if (meError) {
    return <div className="p-6">Error: {meError.message}</div>;
  }
  if (!companyId) {
    return (
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Admins</CardTitle>
            <CardDescription>
              No hay company asociada a tu usuario.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <>
      <PageBreadCrumbs
        items={[
          {
            href: " ",
            label: "Dashboard",
          },
          { href: "users/admins", label: "Administradores" },
        ]}
      />
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Admins de Empresa</h1>
            <p className="text-sm text-muted-foreground">
              Invita nuevos admins business y administra invitaciones
              existentes.
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="neutral" onClick={refreshAll}>
              Refrescar
            </Button>

            <Dialog open={openInviteModal} onOpenChange={setOpenInviteModal}>
              <DialogTrigger asChild>
                <Button>Invitar Admins</Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Invitar Admins</DialogTitle>
                  <DialogDescription>
                    Pega los correos (uno por línea). Se enviará una invitación
                    para registrarse como <b>business</b>.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Emails</label>
                    <Textarea
                      value={emailsText}
                      onChange={(e) => setEmailsText(e.target.value)}
                      placeholder={"admin1@empresa.com\nadmin2@empresa.com"}
                      rows={6}
                    />
                    <p className="text-xs text-muted-foreground">
                      Tip: puedes separar por comas, espacios o saltos de línea.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Modo</label>
                    <Select
                      value={mode}
                      onValueChange={(v) => setMode(v as any)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un modo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="renew_if_expired">
                          Renovar si expiró (recomendado)
                        </SelectItem>
                        <SelectItem value="reuse_active">
                          Reusar invite activo (no renueva expirados)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      “Renovar” crea un token nuevo cuando el anterior ya
                      expiró.
                    </p>
                  </div>
                </div>

                <DialogFooter className="gap-2">
                  <Button
                    variant="neutral"
                    onClick={() => setOpenInviteModal(false)}
                    disabled={submitting}
                  >
                    Cancelar
                  </Button>
                  <Button onClick={onInviteSubmit} disabled={submitting}>
                    {submitting ? "Enviando…" : "Enviar invitaciones"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Admins table */}
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Admins actuales</CardTitle>
                <CardDescription>
                  Usuarios con rol business dentro de la empresa.
                </CardDescription>
              </div>
              <div className="w-full sm:w-64">
                <Input
                  value={searchAdmins}
                  onChange={(e) => setSearchAdmins(e.target.value)}
                  placeholder="Buscar admin…"
                />
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {adminsResult.fetching ? (
              <div className="text-sm text-muted-foreground">
                Cargando admins…
              </div>
            ) : adminsResult.error ? (
              <div className="text-sm text-destructive">
                Error: {adminsResult.error.message}
              </div>
            ) : filteredAdmins.length === 0 ? (
              <div className="text-sm text-muted-foreground">
                No hay admins business aún.
              </div>
            ) : (
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Creado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAdmins.map((a) => (
                      <TableRow key={a.id}>
                        <TableCell className="font-medium">
                          <div className="flex flex-col">
                            <span>{a.fullName}</span>
                            <span className="text-xs text-muted-foreground">
                              @{a.userName}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{a.email}</TableCell>
                        <TableCell>
                          {a.isActive ? (
                            <Badge>Activo</Badge>
                          ) : (
                            <Badge variant="neutral">Inactivo</Badge>
                          )}
                        </TableCell>
                        <TableCell>{safeDate(a.createdAt)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Invites table */}
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Invitaciones</CardTitle>
                <CardDescription>
                  Invites de registro como business admin.
                </CardDescription>
              </div>
              <div className="w-full sm:w-64">
                <Input
                  value={searchInvites}
                  onChange={(e) => setSearchInvites(e.target.value)}
                  placeholder="Buscar invite…"
                />
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {invitesResult.fetching ? (
              <div className="text-sm text-muted-foreground">
                Cargando invites…
              </div>
            ) : invitesResult.error ? (
              <div className="text-sm text-destructive">
                Error: {invitesResult.error.message}
              </div>
            ) : filteredInvites.length === 0 ? (
              <div className="text-sm text-muted-foreground">
                No hay invitaciones aún.
              </div>
            ) : (
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Creado</TableHead>
                      <TableHead>Expira</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {filteredInvites.map((inv) => (
                      <TableRow key={inv.id}>
                        <TableCell className="font-medium">
                          {inv.email}
                        </TableCell>
                        <TableCell>{statusBadge(inv.status)}</TableCell>
                        <TableCell>{safeDate(inv.createdAt)}</TableCell>
                        <TableCell>{safeDate(inv.expiresAt)}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            variant="neutral"
                            onClick={() => onResend(inv.id)}
                          >
                            Reenviar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
