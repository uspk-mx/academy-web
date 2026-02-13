import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import {
  useCompanyInvites,
  useCompanySubscriptions,
  useSubscriptionReport,
} from "ui/hooks/use-business-licences";

import { Card, CardContent, CardHeader, CardTitle } from "ui/components/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "ui/components/tabs";
import { Badge } from "ui/components/badge";
import { Button } from "ui/components/button";
import { Input } from "ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "ui/components/select";

// Optional: if you use react-router v7 hooks
import { Link, useSearchParams } from "react-router";
import { MeDocument } from "gql-generated/gql/graphql";
import type { MeQuery, MeQueryVariables } from "gql-generated/gql/graphql";
import { useQuery } from "urql";
import { PageBreadCrumbs } from "ui/components/admin/page-breadcrumbs";

type Props = {
  companyId: string; // from BusinessContext (me.company.id)
};

function formatDate(s: string) {
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? "—" : d.toLocaleDateString();
}

function statusBadge(status: string) {
  return <Badge variant="neutral">{status}</Badge>;
}

export default function LicensesOverviewPage() {
  const [searchParams, setSearchParams] = useSearchParams();
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

  // Default selection: latest paid order, else latest order
  const [selectedOrderId, setSelectedOrderId] = useState<string>("");

  useEffect(() => {
    if (selectedOrderId) return;
    if (paidOrders.length > 0) {
      setSelectedOrderId(paidOrders[0].id);
      return;
    }
    if (orders.length > 0) setSelectedOrderId(orders[0].id);
  }, [orders, paidOrders, selectedOrderId]);

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

  // Banner: checkout success
  useEffect(() => {
    const checkout = searchParams.get("checkout");
    const orderId = searchParams.get("orderId");
    if (checkout === "success") {
      toast.success("Payment received. Updating licenses…");
      // Best-effort refresh
      Promise.all([refreshOrders(), refreshReport(), refreshInvites()]).finally(
        () => {
          // Clear params
          const next = new URLSearchParams(searchParams);
          next.delete("checkout");
          next.delete("orderId");
          setSearchParams(next, { replace: true });
        },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Summary
  const totalPurchased = useMemo(() => {
    // paid only
    return orders
      .filter((o: any) => o.status === "paid")
      .reduce((acc: number, o: any) => acc + (o.quantity ?? 0), 0);
  }, [orders]);

  const redeemed = report?.redeemedSubscriptions ?? 0;
  const available = report?.unredeemedSubscriptions ?? 0;

  // Invites tab state
  const [inviteTab, setInviteTab] = useState<
    "all" | "active" | "expired" | "redeemed"
  >("all");
  const [inviteSearch, setInviteSearch] = useState("");

  const filteredInvites = useMemo(() => {
    const base = invites.filter((i: any) =>
      inviteSearch
        ? i.email.toLowerCase().includes(inviteSearch.toLowerCase())
        : true,
    );
    if (inviteTab === "all") return base;
    return base.filter((i: any) => i.status === inviteTab);
  }, [invites, inviteSearch, inviteTab]);

  return (
    <>
      <PageBreadCrumbs
        items={[
          {
            href: "/",
            label: "Dashboard",
          },
          { href: "licenses", label: "Licenses" },
        ]}
      />
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Licenses</h1>
            <p className="text-sm text-muted-foreground">
              Manage orders, invites, and seat availability.
            </p>
          </div>

          <div className="flex gap-2">
            <Button asChild variant="neutral">
              <Link to="/licenses/assign">Invite employees</Link>
            </Button>
            <Button asChild variant="neutral">
              <Link to="/licenses/request">Request licenses</Link>
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Purchased</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">{totalPurchased}</div>
              <div className="text-xs text-muted-foreground">
                Total seats from paid orders
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Available</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">
                {reportLoading ? "…" : available}
              </div>
              <div className="text-xs text-muted-foreground">
                Seats not yet redeemed (selected order)
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Redeemed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">
                {reportLoading ? "…" : redeemed}
              </div>
              <div className="text-xs text-muted-foreground">
                Redeemed seats (selected order)
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <CardTitle>Overview</CardTitle>

              <div className="flex flex-col gap-2 md:flex-row md:items-center">
                <div className="text-sm text-muted-foreground">Order</div>
                <Select
                  value={selectedOrderId}
                  onValueChange={setSelectedOrderId}
                >
                  <SelectTrigger className="w-full md:w-85">
                    <SelectValue placeholder="Select an order" />
                  </SelectTrigger>
                  <SelectContent>
                    {orders.map((o: any) => (
                      <SelectItem key={o.id} value={o.id}>
                        {o.plan?.planName ?? "Plan"} · {o.quantity} · {o.status}{" "}
                        · {formatDate(o.createdAt)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  variant="neutral"
                  onClick={() =>
                    Promise.all([
                      refreshOrders(),
                      refreshReport(),
                      refreshInvites(),
                    ])
                  }
                  disabled={ordersLoading}
                >
                  Refresh
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="orders">
              <TabsList>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="invites">Invites</TabsTrigger>
              </TabsList>

              {/* Orders */}
              <TabsContent value="orders" className="pt-4">
                <div className="rounded-md border">
                  <table className="w-full text-sm">
                    <thead className="border-b">
                      <tr>
                        <th className="p-3 text-left">Created</th>
                        <th className="p-3 text-left">Plan</th>
                        <th className="p-3 text-left">Qty</th>
                        <th className="p-3 text-left">Status</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ordersLoading ? (
                        <tr>
                          <td className="p-3" colSpan={5}>
                            Loading…
                          </td>
                        </tr>
                      ) : ordersError ? (
                        <tr>
                          <td className="p-3 text-destructive" colSpan={5}>
                            Failed to load orders
                          </td>
                        </tr>
                      ) : orders.length === 0 ? (
                        <tr>
                          <td className="p-3 text-muted-foreground" colSpan={5}>
                            No orders yet. Request licenses to get started.
                          </td>
                        </tr>
                      ) : (
                        orders.map((o: any) => (
                          <tr key={o.id} className="border-b last:border-b-0">
                            <td className="p-3">{formatDate(o.createdAt)}</td>
                            <td className="p-3">{o.plan?.planName ?? "—"}</td>
                            <td className="p-3">{o.quantity}</td>
                            <td className="p-3">{statusBadge(o.status)}</td>
                            <td className="p-3 text-right">
                              {o.status === "pending" ? (
                                <Button asChild size="sm">
                                  <Link
                                    to={`/licenses/orders?focus=${o.id}`}
                                  >
                                    Pay
                                  </Link>
                                </Button>
                              ) : o.status === "paid" ? (
                                <Button asChild size="sm" variant="neutral">
                                  <Link
                                    to={`/licenses/assign?orderId=${o.id}`}
                                  >
                                    Invite
                                  </Link>
                                </Button>
                              ) : (
                                <Button size="sm" variant="neutral" disabled>
                                  View
                                </Button>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              {/* Invites */}
              <TabsContent value="invites" className="pt-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <Tabs
                    value={inviteTab}
                    onValueChange={(v) => setInviteTab(v as any)}
                  >
                    <TabsList>
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="active">Active</TabsTrigger>
                      <TabsTrigger value="expired">Expired</TabsTrigger>
                      <TabsTrigger value="redeemed">Redeemed</TabsTrigger>
                    </TabsList>
                  </Tabs>

                  <div className="flex gap-2">
                    <Input
                      placeholder="Search email…"
                      value={inviteSearch}
                      onChange={(e) => setInviteSearch(e.target.value)}
                      className="w-full md:w-65"
                    />
                    <Button asChild variant="neutral">
                      <Link to="/licenses/assign">
                        Open Invite & Assign
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="mt-3 rounded-md border">
                  <table className="w-full text-sm">
                    <thead className="border-b">
                      <tr>
                        <th className="p-3 text-left">Email</th>
                        <th className="p-3 text-left">Status</th>
                        <th className="p-3 text-left">Expires</th>
                        <th className="p-3 text-left">Redeemed By</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invitesLoading ? (
                        <tr>
                          <td className="p-3" colSpan={4}>
                            Loading…
                          </td>
                        </tr>
                      ) : !selectedOrderId ? (
                        <tr>
                          <td className="p-3 text-muted-foreground" colSpan={4}>
                            Select an order to view invites.
                          </td>
                        </tr>
                      ) : filteredInvites.length === 0 ? (
                        <tr>
                          <td className="p-3 text-muted-foreground" colSpan={4}>
                            No invites for this order yet.
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
                            <td className="p-3">
                              {i.redeemedByUserId ? i.redeemedByUserId : "—"}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="mt-3 text-xs text-muted-foreground">
                  Tip: Use “Invite & Assign” to resend invites, batch invite,
                  and manage statuses.
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
