import { useCheckout } from "@stripe/react-stripe-js";
import type { UpdateEmailError } from "@stripe/stripe-js";
import { type ChangeEvent, useId, useState } from "react";
import { MailIcon } from "lucide-react";
import { Input, Label } from "ui/components/index";

function EmailInput() {
  const checkout = useCheckout();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<any | null>(null);
  const id = useId();

  const handleBlur = async () => {
    const result = await  checkout.updateEmail(email)

    if (result.type ==='error') {
      setError(result.error);
    }

  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setEmail(e.target.value);
  };
  return (
    <div className="space-y-2 mb-4">
      <Label htmlFor={id}>Correo electronico</Label>
      <div className="relative">
        <Input
          aria-invalid={error ? error?.message.length > 0 : undefined}
          className="pe-9 peer"
          id={id}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="eg. jay@gmail.com"
          type="email"
          value={email}
        />
        <div className="absolute inset-y-0 flex justify-center items-center peer-disabled:opacity-50 text-muted-foreground/80 pointer-events-none end-0 pe-3">
          <MailIcon aria-hidden="true" size={16} strokeWidth={2} />
        </div>
      </div>
      {error ? <p
          aria-live="polite"
          className="mt-2 text-destructive text-xs"
          role="alert"
        >
          {error.message}
        </p> : null}
    </div>
  );
}

export default EmailInput;
