import {
  PaymentElement,
  useCheckout,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState, type FormEvent } from "react";
import EmailInput from "./email-input";

export function CheckoutForm() {
  const checkout = useCheckout();
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const { confirmationRequirements } = checkout || {};
    setStatus(
      confirmationRequirements && confirmationRequirements.length > 0
        ? `Missing: ${confirmationRequirements.join(", ")}`
        : ""
    );
  }, [checkout, setStatus]);


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !checkout) {
      return;
    }

    try {
      setLoading(true);
      await checkout.confirm({
        email,
        phoneNumber,
        returnUrl: window.location.href,
      });
      setLoading(false);
    } catch (err: any) {
      console.error(err);
      setStatus(err.message);
    }
  };

  return (
    <form id="pay-form" onSubmit={handleSubmit}>
      <EmailInput />
      <PaymentElement options={{ layout: "tabs" }} />
    </form>
  );
}
