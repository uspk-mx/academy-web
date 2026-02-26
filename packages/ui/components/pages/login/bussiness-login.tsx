import { zodResolver } from "@hookform/resolvers/zod";
import {
  type LoginMutation,
  type LoginMutationVariables,
  LoginDocument,
} from "gql-generated/gql/graphql";
import type { GraphQLError } from "graphql";
import { InfoIcon, LoaderCircleIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLoaderData, useNavigate } from "react-router";
import { toast } from "sonner";
import { Alert, AlertTitle } from "ui/components/alert";
import { Button } from "ui/components/button";
import EmailInput from "ui/components/email-input";
import { PasswordInput } from "ui/components/password-input";
import { logos } from "ui/lib/config/site";
import { cn } from "ui/lib/utils";
import { useMutation } from "urql";
import { z } from "zod";

const signInSchema = z.object({
  email: z
    .string({ error: "El correo electronico es un campo requerido." })
    .email("Correo electronico invalido"),
  password: z
    .string({ error: "La contraseña es un campo requerido" })
    .min(1, { message: "Tu contaseña debe de tener al menos un caracter." }),
});

export const BusinessLogin = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const [, loginAction] = useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
  );
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState<GraphQLError[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof signInSchema>>({
    mode: "onSubmit",
    resolver: zodResolver<z.output<typeof signInSchema>>(signInSchema),
  });

  const onLoginAction = async (data: z.infer<typeof signInSchema>) => {
    try {
      setIsLoading(true);
      const { email, password } = data;

      const result = await loginAction({
        input: {
          email,
          password,
        },
      });

      if (result?.data?.login.token) {
        navigate("/");
        setIsLoading(false);
      } else {
        console.error("Ocurrio un error", result.error);
        setIsLoading(false);
        setServerErrors(result.error?.graphQLErrors as GraphQLError[]);
      }
    } catch (error) {
      toast.error("Ocurrio un error", {
        description: "Intentalo nuevamenete.",
      });
      console.error("Ocurrio un error", error);
    }
  };

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <form
            id="signin"
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit(onLoginAction)();
            }}
            noValidate
          >
            <div>
              <div className="space-y-2 text-center mb-2">
                <div className="w-12 h-12 rounded-full bg-primary/5 shadow-xl mx-auto flex items-center justify-center">
                  <img
                    src={logos.icon}
                    className="size-10"
                    alt=""
                  />
                </div>
                <h1 className="text-2xl font-bold">Bienvenido de nuevo</h1>
                <p className="text-muted-foreground">
                  ¡Bienvenido de nuevo! Por favor, introduce tus datos.
                </p>
              </div>
              {serverErrors?.map((serverError) => (
                <Alert
                  key={serverError.name}
                  variant="destructive"
                  className="mb-6"
                >
                  <InfoIcon className="h-4 w-4" color="white" />
                  <AlertTitle>{serverError.message}</AlertTitle>
                </Alert>
              ))}
              <div className="space-y-4">
                <div className="space-y-2">
                  <EmailInput
                    label="Correo electronico"
                    labelClassName="text-sm mb-1"
                    placeholder="john@email.com"
                    hasRightIcon
                    required
                    autoComplete="email"
                    aria-invalid={!!errors.email?.message}
                    {...register("email")}
                  />
                  {errors.email?.message ? (
                    <p
                      className="text-destructive mt-2 text-xs"
                      role="alert"
                      aria-live="polite"
                    >
                      {errors.email?.message}
                    </p>
                  ) : null}
                </div>
                <div className="space-y-2">
                  <PasswordInput
                    label="Contraseña"
                    labelClassName="text-sm mb-1"
                    className={cn("text-sm font-medium peer")}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    required
                    aria-invalid={!!errors.password?.message}
                    {...register("password")}
                  />
                  {errors.password?.message ? (
                    <p
                      className="text-destructive mt-2 text-xs"
                      role="alert"
                      aria-live="polite"
                    >
                      {errors.password?.message}
                    </p>
                  ) : null}
                </div>
                <div className="flex items-center justify-end">
                  <Link className="text-primary p-0" to="/password/reset">
                    Olvide mi contraseña
                  </Link>
                </div>
                <Button
                  className="w-full"
                  type="submit"
                  form="signin"
                  disabled={isSubmitting || isLoading}
                >
                  {isSubmitting || isLoading ? (
                    <>
                      <LoaderCircleIcon
                        className="-ms-1 mr-2 animate-spin"
                        size={16}
                        aria-hidden="true"
                      />
                      Iniciando sesion...
                    </>
                  ) : (
                    "Iniciar session"
                  )}
                </Button>
              </div>
            </div>
          </form>
          <div className="px-6 text-center">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
};
