import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

import {
  useCompanySubscriptions,
  useRequestSubscriptionCodes,
  useSubscriptionPlans,
} from "ui/hooks/use-business-licences";

import { Card, CardContent, CardHeader, CardTitle } from "ui/components/card";
import { Button } from "ui/components/button";
import { Textarea } from "ui/components/textarea";
import { Input } from "ui/components/input";
import { Badge } from "ui/components/badge";
import { Alert, AlertDescription, AlertTitle } from "ui/components/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "ui/components/select";
import { MeDocument } from "gql-generated/gql/graphql";
import type { MeQuery, MeQueryVariables } from "gql-generated/generated/types";
import { useQuery } from "urql";
import { PageBreadCrumbs } from "ui/components/admin/page-breadcrumbs";

type Props = {
  companyId: string; // from BusinessContext (me.company.id)
};

function moneyMXN(amount?: number) {
  if (typeof amount !== "number") return "—";
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 2,
  }).format(amount);
}

export default function RequestLicensesPage() {
  const navigate = useNavigate();
  const [{ data }] = useQuery<MeQuery, MeQueryVariables>({
    query: MeDocument,
    requestPolicy: "cache-and-network",
  });

  const {
    data: plansData,
    fetching: plansLoading,
    error: plansError,
    refresh: refreshPlans,
  } = useSubscriptionPlans();

  const plans = plansData?.subscriptionPlans ?? [];

  const {
    data: ordersData,
    fetching: ordersLoading,
    refresh: refreshOrders,
  } = useCompanySubscriptions(data?.me?.company?.id ?? "");

  const orders = ordersData?.companySubscriptions ?? [];
  const pendingOrders = useMemo(
    () => orders.filter((o: any) => o.status === "pending"),
    [orders]
  );

  const { fetching: requesting, request } = useRequestSubscriptionCodes();

  const [planId, setPlanId] = useState<string>("");
  const selectedPlan = useMemo(
    () => plans.find((p: any) => p.id === planId),
    [plans, planId]
  );

  const [quantity, setQuantity] = useState<number>(10);
  const [notes, setNotes] = useState<string>("");

  useEffect(() => {
    if (!planId && plans.length > 0) setPlanId(plans[0].id);
  }, [plans, planId]);

  const totalEstimate = useMemo(() => {
    if (!selectedPlan) return undefined;
    return (selectedPlan.price ?? 0) * (quantity ?? 0);
  }, [selectedPlan, quantity]);

  async function onSubmit() {
    if (!planId) {
      toast.error("Select a plan");
      return;
    }
    if (!Number.isFinite(quantity) || quantity <= 0) {
      toast.error("Quantity must be greater than 0");
      return;
    }
    if (quantity > 5000) {
      toast.error("Quantity too large for a single request");
      return;
    }

    const res = await request({
      planId,
      companyId: data?.me?.company?.id ?? "",
      quantity,
    });
    if (res.error) {
      toast.error(res.error.message);
      return;
    }

    const created = res.data?.requestSubscriptionCodes;
    toast.success("Request created");

    // Best-effort refresh
    refreshOrders();

    // Navigate to orders and focus the new one
    if (created?.id) {
      navigate(`/licenses/orders-page?focus=${created.id}`);
    } else {
      navigate("/licenses/orders-page");
    }
  }

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
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Request licenses
            </h1>
            <p className="text-sm text-muted-foreground">
              Create a license request. You can pay later from Orders.
            </p>
          </div>

          <div className="flex gap-2">
            <Button asChild variant="neutral">
              <Link to="/licenses">Back</Link>
            </Button>
            <Button asChild variant="neutral">
              <Link to="/licenses/orders">Orders</Link>
            </Button>
          </div>
        </div>

        {/* Pending Orders Callout */}
        {pendingOrders.length > 0 && (
          <Alert>
            <AlertTitle>You have pending orders</AlertTitle>
            <AlertDescription>
              You currently have {pendingOrders.length} pending{" "}
              {pendingOrders.length === 1 ? "order" : "orders"} awaiting
              payment. You can still request more, but it may be easier to pay
              existing orders first.
              <div className="mt-3">
                <Button asChild size="sm">
                  <Link to="/licenses/orders">Go to Orders</Link>
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>New request</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            {/* Plan select */}
            <div className="space-y-2">
              <div className="text-sm font-medium">Plan</div>
              <Select value={planId} onValueChange={setPlanId}>
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={plansLoading ? "Loading…" : "Select plan"}
                  />
                </SelectTrigger>
                <SelectContent>
                  {plans.map((p: any) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.planName} · {moneyMXN(p.price)} · {p.duration} days
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {plansError && (
                <div className="text-sm text-destructive">
                  Failed to load plans.{" "}
                  <button
                    className="underline"
                    onClick={() => refreshPlans()}
                    type="button"
                  >
                    Retry
                  </button>
                </div>
              )}
              {selectedPlan && (
                <div className="flex flex-wrap gap-2 pt-1">
                  <Badge variant="neutral">
                    {moneyMXN(selectedPlan.price)} / seat
                  </Badge>
                  <Badge variant="neutral">{selectedPlan.duration} days</Badge>
                  {selectedPlan.planDescription ? (
                    <Badge variant="neutral">
                      {selectedPlan.planDescription}
                    </Badge>
                  ) : null}
                </div>
              )}
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <div className="text-sm font-medium">Quantity</div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="neutral"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  -
                </Button>
                <Input
                  inputMode="numeric"
                  value={quantity}
                  onChange={(e) => {
                    const n = Number(e.target.value);
                    if (Number.isNaN(n)) return;
                    setQuantity(n);
                  }}
                  className="w-28 text-center"
                />
                <Button
                  type="button"
                  variant="neutral"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </Button>

                <div className="ml-2 text-sm text-muted-foreground">
                  {selectedPlan ? (
                    <>
                      Estimated total:{" "}
                      <span className="font-medium text-foreground">
                        {moneyMXN(totalEstimate)}
                      </span>
                    </>
                  ) : (
                    "Select a plan to see estimate"
                  )}
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                This creates codes in{" "}
                <span className="font-medium">pending</span> state until you pay
                the order.
              </div>
            </div>

            {/* Notes (optional) */}
            <div className="space-y-2">
              <div className="text-sm font-medium">Notes (optional)</div>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Anything we should know? (internal notes)"
                rows={4}
              />
              <div className="text-xs text-muted-foreground">
                Notes are optional and not required for MVP.
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Button asChild variant="neutral">
                <Link to="/licenses">Cancel</Link>
              </Button>
              <Button
                onClick={onSubmit}
                disabled={requesting || plansLoading || !planId}
              >
                {requesting ? "Creating…" : "Create request"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Helpful footer */}
        <div className="text-xs text-muted-foreground">
          After creating a request, go to{" "}
          <Link className="underline" to="/licenses/orders">
            Orders
          </Link>{" "}
          to pay. Once paid, you can invite employees from{" "}
          <Link className="underline" to="/licenses/assign">
            Invite & Assign
          </Link>
          .
        </div>
      </div>
    </>
  );
}
