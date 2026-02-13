import { useState } from "react";
import { useCheckout } from "@stripe/react-stripe-js";
import type { ConfirmError } from "@stripe/stripe-js";
import { Button } from "ui/components/button";

const PayButton = () => {
  const checkout = useCheckout();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ConfirmError | null>(null);

  const handleClick = () => {
    setLoading(true);
    checkout.confirm().then((result) => {
      if (result.type === "error") {
        setError(result.error);
      }
      setLoading(false);
    });
  };

  return (
    <div>
      <Button
        type="submit"
        className="w-full h-14 mb-4"
        disabled={!checkout || loading}
        onClick={handleClick}
        form="pay-form"
      >
        {loading ? "Processing..." : "Pay"}
      </Button>
      {error && <div>{error.message}</div>}
    </div>
  );
};

export default PayButton;
