// src/features/business/billing/SetupIntentDialog.tsx
import * as React from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "ui/components/dialog";
import { Button } from "ui/components/button";

// Stripe
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import type { Stripe } from "@stripe/stripe-js";

/**
 * You must create stripePromise once in your app (not inside this file).
 * Example (somewhere global):
 *   import { loadStripe } from "@stripe/stripe-js";
 *   export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
 */

// ---------- Public component ----------

type SetupIntentDialogProps = {
  open: boolean;
  clientSecret: string | null;
  orderId: string | null;

  // Display context (optional but nice UX)
  planName?: string;
  quantity?: number;
  estimatedTotalLabel?: string; // "MX$1,999.00" (optional)

  // Stripe promise from your app
  stripePromise: Promise<Stripe | null>;

  // Called when user closes dialog
  onOpenChange: (open: boolean) => void;

  /**
   * After confirming setup intent, we need to pay the order using the paymentMethodId.
   * Implemented by parent using your URQL mutation: PayCompanySubscription(orderId, paymentMethodId)
   */
  onPayWithPaymentMethod: (
    orderId: string,
    paymentMethodId: string
  ) => Promise<{ ok: true } | { ok: false; message: string }>;

  /**
   * Optional callback after payment success (e.g. refresh queries, navigate)
   */
  onSuccess?: () => void;
};

export function SetupIntentDialog(props: SetupIntentDialogProps) {
  const {
    open,
    clientSecret,
    stripePromise,
    onOpenChange,
    orderId,
    planName,
    quantity,
    estimatedTotalLabel,
    onPayWithPaymentMethod,
    onSuccess,
  } = props;

  // If we don't have clientSecret, don't render Elements
  const canRender = open && !!clientSecret;
  console.log("clientSecret", clientSecret);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>Add payment method</DialogTitle>
          <DialogDescription>
            Add a card to complete payment. This card can be used for renewals
            (you can change it later).
          </DialogDescription>
        </DialogHeader>

        {/* Context block */}
        <div className="rounded-lg border p-3 text-sm">
          <div className="flex items-center justify-between">
            <div className="font-medium">{planName ?? "Order"}</div>
            <div className="text-muted-foreground">
              {quantity ? `${quantity} seats` : null}
            </div>
          </div>
          {estimatedTotalLabel ? (
            <div className="mt-1 text-muted-foreground">
              Estimated total:{" "}
              <span className="text-foreground font-medium">
                {estimatedTotalLabel}
              </span>
            </div>
          ) : null}
        </div>

        {canRender ? (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret: clientSecret,
              // Optional: appearance to match your theme (keep minimal for MVP)
              appearance: { theme: "stripe" },
            }}
            key={clientSecret}
          >
            <SetupIntentForm
              orderId={orderId}
              onPayWithPaymentMethod={onPayWithPaymentMethod}
              onSuccess={onSuccess}
              onClose={() => onOpenChange(false)}
            />
          </Elements>
        ) : (
          <div className="text-sm text-muted-foreground">
            Preparing payment form…
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ---------- Internal form ----------

function SetupIntentForm(props: {
  orderId: string | null;
  onPayWithPaymentMethod: (
    orderId: string,
    paymentMethodId: string
  ) => Promise<{ ok: true } | { ok: false; message: string }>;
  onSuccess?: () => void;
  onClose: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();

  const [submitting, setSubmitting] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const canSubmit = !!stripe && !!elements && !submitting;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);

    if (!stripe || !elements) return;
    if (!props.orderId) {
      setErrorMsg("Missing order id.");
      return;
    }

    setSubmitting(true);

    // Confirm SetupIntent (save card)
    const result = await stripe.confirmSetup({
      elements,
      confirmParams: {
        // Optional. If bank redirects / 3DS is required, Stripe can redirect back.
        // You can use your own URL. Keep it stable.
        return_url: `${window.location.origin}/licenses/orders`,
      },
      redirect: "if_required",
    });

    if (result.error) {
      setSubmitting(false);
      setErrorMsg(result.error.message ?? "Failed to save payment method.");
      return;
    }

    const setupIntent = result.setupIntent;
    const paymentMethodId =
      typeof setupIntent.payment_method === "string"
        ? setupIntent.payment_method
        : setupIntent.payment_method?.id;

    if (!paymentMethodId) {
      setSubmitting(false);
      setErrorMsg("Payment method was not returned by Stripe.");
      return;
    }

    // Now pay using your backend mutation
    const payRes = await props.onPayWithPaymentMethod(
      props.orderId,
      paymentMethodId
    );
    if (!payRes.ok) {
      setSubmitting(false);
      setErrorMsg(payRes.message);
      return;
    }

    toast.success("Payment confirmed");
    setSubmitting(false);
    props.onClose();
    props.onSuccess?.();
  }

  if (!stripe || !elements) {
  return <div className="text-sm text-muted-foreground">Loading payment form…</div>;
}


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Stripe Payment Element */}
      <div className="rounded-lg border p-3">
        <PaymentElement />
      </div>

      {errorMsg ? (
        <div className="text-sm text-destructive">{errorMsg}</div>
      ) : (
        <div className="text-xs text-muted-foreground">
          Your payment details are handled securely by Stripe.
        </div>
      )}

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="neutral"
          onClick={props.onClose}
          disabled={submitting}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={!canSubmit}>
          {submitting ? "Saving & Paying…" : "Save card & Pay"}
        </Button>
      </div>
    </form>
  );
}
