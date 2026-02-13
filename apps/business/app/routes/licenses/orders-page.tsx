import { useMemo, useState } from "react";
import {
  useCompanySubscriptions,
  usePayCompanySubscription,
} from "ui/hooks/use-business-licences";
import { Card, CardContent, CardHeader, CardTitle } from "ui/components/card";
import { Badge } from "ui/components/badge";
import { Button } from "ui/components/button";
import { toast } from "sonner";
import { useQuery } from "urql";
import type { MeQuery, MeQueryVariables } from "gql-generated/generated/types";
import { MeDocument } from "gql-generated/gql/graphql";
import { SetupIntentDialog } from "ui/components/business/billing/setup-intent-dialog";
import { useNavigate, useSearchParams } from "react-router";
import { loadStripe } from "@stripe/stripe-js";
import { PageBreadCrumbs } from "ui/components/admin/page-breadcrumbs";

type Props = { companyId: string };

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY || "", {
  betas: ["custom_checkout_beta_5"],
  locale: "es",
});

console.log("PK", import.meta.env.VITE_STRIPE_KEY);


export default function OrdersPage() {
  const [{ data: meData }] = useQuery<MeQuery, MeQueryVariables>({
    query: MeDocument,
    requestPolicy: "cache-and-network",
  });
  const { data, fetching, error, refresh } = useCompanySubscriptions(
    meData?.me?.company?.id ?? ""
  );
  const navigate = useNavigate();
  const [sp] = useSearchParams();

  const orders = data?.companySubscriptions ?? [];

  const { fetching: paying, pay } = usePayCompanySubscription();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [setupSecret, setSetupSecret] = useState<string | null>(null);
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);

  const activeOrder = useMemo(() => {
    return orders.find((o: any) => o.id === activeOrderId) ?? null;
  }, [orders, activeOrderId]);

  // optional: focus order from ?focus=
  const focusId = sp.get("focus");
  // If you want, auto-select the focused order when list loads (left out for brevity)

  async function startPay(orderId: string) {
    setActiveOrderId(orderId);

    const res = await pay({
      companySubscriptionId: orderId,
      paymentMethodId: null,
    });
    if (res.error) {
      toast.error(res.error.message);
      return;
    }

    const payload = res.data?.payCompanySubscription;
    if (payload?.__typename === "SetupIntentRequired") {
      if (!payload.clientSecret) {
        toast.error("SetupIntent clientSecret is empty.");
        return;
      }
      setSetupSecret(payload.clientSecret);
      setDialogOpen(true);
      return;
    }

    if (payload?.__typename === "CompanySubscription") {
      toast.success("Payment confirmed");
      refresh();
      navigate(`/business/licenses?checkout=success&orderId=${orderId}`);
      return;
    }

    toast.error("Unexpected payment response");
  }

  return (
    <>
      <PageBreadCrumbs
        items={[
          {
            href: " ",
            label: "Dashboard",
          },
          { href: "licenses/orders", label: "Ordenes" },
        ]}
      />
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <table className="w-full text-sm">
                <thead className="border-b">
                  <tr>
                    <th className="text-left p-3">Created</th>
                    <th className="text-left p-3">Plan</th>
                    <th className="text-left p-3">Qty</th>
                    <th className="text-left p-3">Status</th>
                    <th className="text-right p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {fetching ? (
                    <tr>
                      <td className="p-3" colSpan={5}>
                        Loading…
                      </td>
                    </tr>
                  ) : orders.length === 0 ? (
                    <tr>
                      <td className="p-3 text-muted-foreground" colSpan={5}>
                        No orders yet.
                      </td>
                    </tr>
                  ) : (
                    orders.map((o: any) => (
                      <tr key={o.id} className="border-b last:border-b-0">
                        <td className="p-3">
                          {new Date(o.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-3">{o.plan?.planName ?? "—"}</td>
                        <td className="p-3">{o.quantity}</td>
                        <td className="p-3">
                          <Badge variant="neutral">{o.status}</Badge>
                        </td>
                        <td className="p-3 text-right">
                          {o.status === "pending" ? (
                            <Button
                              size="sm"
                              onClick={() => startPay(o.id)}
                              disabled={paying && activeOrderId === o.id}
                            >
                              {paying && activeOrderId === o.id
                                ? "Starting…"
                                : "Pay"}
                            </Button>
                          ) : (
                            <Button size="sm" variant="neutral" disabled>
                              Paid
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <SetupIntentDialog
          open={dialogOpen}
          clientSecret={setupSecret}
          orderId={activeOrderId}
          stripePromise={stripePromise}
          planName={activeOrder?.plan?.planName}
          quantity={activeOrder?.quantity}
          // Optional: compute in your UI if you want
          // estimatedTotalLabel={...}
          onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) setSetupSecret(null);
          }}
          onPayWithPaymentMethod={async (orderId, paymentMethodId) => {
            const res = await pay({
              companySubscriptionId: orderId,
              paymentMethodId,
            });
            if (res.error) return { ok: false, message: res.error.message };

            const payload = res.data?.payCompanySubscription;
            if (payload?.__typename === "CompanySubscription") {
              await refresh();
              navigate(
                `/business/licenses?checkout=success&orderId=${orderId}`,
              );
              return { ok: true };
            }

            // If it returns SetupIntentRequired again, something is off (pm not attached / wrong customer)
            if (payload?.__typename === "SetupIntentRequired") {
              return {
                ok: false,
                message:
                  "Payment method was not saved correctly. Please try again.",
              };
            }

            return { ok: false, message: "Unexpected payment response." };
          }}
          onSuccess={() => {
            // optional extra refresh/navigation is already handled above
          }}
        />
      </div>
    </>
  );
}
