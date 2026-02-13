import { useEffect, useMemo, useState } from "react";
import {
  useCompanyInvites,
  useCompanySubscriptions,
  useInviteEmployees,
  useResendInvite,
  useSubscriptionReport,
} from "ui/hooks/use-business-licences";
import { Card, CardContent, CardHeader, CardTitle } from "ui/components/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "ui/components/tabs";
import { Textarea } from "ui/components/textarea";
import { Button } from "ui/components/button";
import { Input } from "ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "ui/components/select";
import { Badge } from "ui/components/badge";
import { toast } from "sonner";
import { PageBreadCrumbs } from "ui/components/admin/page-breadcrumbs";
import { useSearchParams } from "react-router";
import { useQuery } from "urql";
import type { MeQuery, MeQueryVariables } from "gql-generated/generated/types";
import { MeDocument } from "gql-generated/gql/graphql";


function parseEmails(text: string): string[] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

export default function AssignPage() {
  const [{ data: meData }] = useQuery<MeQuery, MeQueryVariables>({
    query: MeDocument,
    requestPolicy: "cache-and-network",
  });
  const {
    data: ordersData,
    fetching: ordersLoading,
    error: ordersError,
    refresh: refreshOrders,
  } = useCompanySubscriptions(meData?.me?.company?.id ?? "");

  const orders = ordersData?.companySubscriptions ?? [];
  const paidOrders = useMemo(
    () => orders.filter((o: any) => o.status === "paid"),
    [orders],
  );

  const [selectedOrderId, setSelectedOrderId] = useState<string>("");

  useEffect(() => {
    if (!selectedOrderId && paidOrders.length > 0) {
      setSelectedOrderId(paidOrders[0].id);
    }
  }, [paidOrders, selectedOrderId]);


  const {
    data: reportData,
    fetching: reportLoading,
    refresh: refreshReport,
  } = useSubscriptionReport(meData?.me?.company?.id ?? "", selectedOrderId);

  const report = reportData?.subscriptionReport;

  const {
    data: invitesData,
    fetching: invitesLoading,
    refresh: refreshInvites,
  } = useCompanyInvites(selectedOrderId);

  const invites = invitesData?.companyInvites ?? [];

  const { fetching: inviting, invite } = useInviteEmployees();
  const { fetching: resending, resend } = useResendInvite();

  const [emailsText, setEmailsText] = useState("");
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"all" | "active" | "expired" | "redeemed">(
    "all",
  );

  const [sp] = useSearchParams();
  useEffect(() => {
    const orderId = sp.get("orderId");
    if (orderId) setSelectedOrderId(orderId);
  }, [sp]);

  const filteredInvites = useMemo(() => {
    const base = invites.filter((i: any) =>
      search ? i.email.toLowerCase().includes(search.toLowerCase()) : true,
    );
    if (tab === "all") return base;
    return base.filter((i: any) => i.status === tab);
  }, [invites, search, tab]);

  const availableSeats = report?.unredeemedSubscriptions ?? 0;
  console.log("Available seats:", availableSeats);

  async function onSendInvites() {
    if (!selectedOrderId) {
      toast.error("Select a paid order first");
      return;
    }
    const emails = parseEmails(emailsText);
    if (emails.length === 0) {
      toast.error("Paste at least one email");
      return;
    }
    if (availableSeats === 0) {
      toast.error("No available seats in this order");
      return;
    }

    const res = await invite({
      input: { companySubscriptionId: selectedOrderId, emails },
    });
    if (res.error) {
      toast.error(res.error.message);
      return;
    }

    const payload = res.data?.inviteEmployees;
    console.log("Invite payload:", payload);
    toast.success(`Invited ${payload?.invited ?? 0} employees`);

    // refresh right panel
    await Promise.all([refreshInvites(), refreshReport(), refreshOrders()]);
    setEmailsText("");
  }

  async function onResend(email: string) {
    if (!selectedOrderId) return;
    const res = await resend({ companySubscriptionId: selectedOrderId, email });
    if (res.error) {
      toast.error(res.error.message);
      return;
    }
    toast.success("Invite resent");
    refreshInvites();
  }

  return (
    <div>
      <PageBreadCrumbs
        items={[
          {
            href: "/dashboard",
            label: "Dashboard",
          },
          { href: "/licences", label: "Licences" },
          {
            href: "/licences/assign",
            label: "Asignar Licencias",
          },
        ]}
      />
      <h1 className="text-3xl font-bold mb-8">Asignar Licencias</h1>

      <div className="grid grid-cols-12 gap-4">
        {/* Left: form */}
        <div className="col-span-12 lg:col-span-5">
          <Card>
            <CardHeader>
              <CardTitle>Invite employees</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm font-medium">Order</div>
                <Select
                  value={selectedOrderId}
                  onValueChange={setSelectedOrderId}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        paidOrders.length
                          ? "Select a paid order"
                          : "No paid orders"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {paidOrders.map((o: any) => (
                      <SelectItem key={o.id} value={o.id}>
                        {o.plan?.planName} · {o.quantity} seats ·{" "}
                        {new Date(o.createdAt).toLocaleDateString()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex gap-2 pt-2">
                  <Badge variant="neutral">
                    Available:{" "}
                    {reportLoading
                      ? "…"
                      : (report?.unredeemedSubscriptions ?? 0)}
                  </Badge>
                  <Badge variant="neutral">
                    Redeemed:{" "}
                    {reportLoading ? "…" : (report?.redeemedSubscriptions ?? 0)}
                  </Badge>
                  <Badge variant="neutral">
                    Total:{" "}
                    {reportLoading ? "…" : (report?.totalSubscriptions ?? 0)}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Emails</div>
                <Textarea
                  value={emailsText}
                  onChange={(e) => setEmailsText(e.target.value)}
                  placeholder="one email per line"
                  rows={10}
                />
                <div className="text-xs text-muted-foreground">
                  We&apos;ll skip duplicates and invalid emails. Licenses are
                  reserved automatically.
                </div>
              </div>

              <Button
                className="w-full"
                onClick={onSendInvites}
                disabled={
                  inviting ||
                  paidOrders.length === 0 ||
                  !selectedOrderId ||
                  availableSeats === 0
                }
              >
                {inviting ? "Sending…" : "Send invites"}
              </Button>

              {paidOrders.length === 0 && (
                <div className="text-sm text-muted-foreground">
                  You don’t have paid orders yet. Go to Orders and complete
                  payment first.
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right: invites */}
        <div className="col-span-12 lg:col-span-7">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle>Invites</CardTitle>
                <Input
                  placeholder="Search email…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="max-w-xs"
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Tabs value={tab} onValueChange={(v) => setTab(v as any)}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="expired">Expired</TabsTrigger>
                  <TabsTrigger value="redeemed">Redeemed</TabsTrigger>
                </TabsList>

                <TabsContent value={tab} className="pt-3">
                  <div className="rounded-md border">
                    <table className="w-full text-sm">
                      <thead className="border-b">
                        <tr>
                          <th className="text-left p-3">Email</th>
                          <th className="text-left p-3">Status</th>
                          <th className="text-left p-3">Expires</th>
                          <th className="text-right p-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invitesLoading ? (
                          <tr>
                            <td className="p-3" colSpan={4}>
                              Loading…
                            </td>
                          </tr>
                        ) : filteredInvites.length === 0 ? (
                          <tr>
                            <td
                              className="p-3 text-muted-foreground"
                              colSpan={4}
                            >
                              No invites.
                            </td>
                          </tr>
                        ) : (
                          filteredInvites.map((i: any) => (
                            <tr key={i.id} className="border-b last:border-b-0">
                              <td className="p-3">{i.email}</td>
                              <td className="p-3">
                                <Badge variant="neutral">{i.status}</Badge>
                              </td>
                              <td className="p-3">
                                {new Date(i.expiresAt).toLocaleString()}
                              </td>
                              <td className="p-3 text-right">
                                <Button
                                  variant="neutral"
                                  size="sm"
                                  disabled={
                                    resending || i.status === "redeemed"
                                  }
                                  onClick={() => onResend(i.email)}
                                >
                                  Resend
                                </Button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
