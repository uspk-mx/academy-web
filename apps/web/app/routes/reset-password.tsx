import { zodResolver } from "@hookform/resolvers/zod";
import type { GraphQLError } from "graphql";
import { InfoIcon, LoaderCircleIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLoaderData } from "react-router";
import { toast } from "sonner";
import { useMutation } from "urql";
import { z } from "zod";
import { Button } from "ui/components/button";
import { Alert, AlertDescription, AlertTitle } from "ui/components/alert";
import EmailInput from "ui/components/email-input";
import { ResetPasswordDocument } from "gql-generated/gql/graphql";
import type {
  ResetPasswordMutation,
  ResetPasswordMutationVariables,
} from "gql-generated/gql/graphql";
import { capitalizeFirstLetter } from "ui/lib/utils";
import { logos } from "ui/lib/config/site";

export async function loader() {
  return Response.json({
    ENV: {
      API_TARGET: process.env.API_TARGET,
      STRIPE_KEY: process.env.STRIPE_KEY,
    },
  });
}

const resetPasswordSchema = z.object({
  email: z
    .string({ error: "El correo electronico es un campo requerido." })
    .email("Correo electronico invalido"),
});

export function meta() {
  return [
    { title: `Uspk Academy | Reiniciar contraseña` },
    {
      name: "description",
      content: "Página para reiniciar la contraseña del usuario.",
    },
  ];
}

export default function ResetPasswordPage() {
  const [, resetPasswordMutation] = useMutation<
    ResetPasswordMutation,
    ResetPasswordMutationVariables
  >(ResetPasswordDocument);
  const data: any = useLoaderData<typeof loader>();
  const [isLoading, setIsLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState<GraphQLError[]>([]);
  const [showBanner, setShowBanner] = useState(false);
  const [bannerMessage, setBannerMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(resetPasswordSchema),
  });

  const onLoginAction = async (data: z.infer<typeof resetPasswordSchema>) => {
    try {
      setIsLoading(true);
      const { email } = data;

      const result = await resetPasswordMutation({
        email,
      });

      if (result?.data?.resetPassword) {
        setIsLoading(false);
        setShowBanner(true);
        setBannerMessage(result?.data?.resetPassword);
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
    <div className="min-h-screen w-full flex flex-col md:flex-row p-6 font-sans">
      {/* Login Form Section */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-10">
        {showBanner ? (
          <div className="w-full max-w-xl space-y-6">
            <div className="space-y-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/5 shadow-xl mx-auto flex items-center justify-center">
                <img
                  src={logos.icon}
                  className="size-10"
                  alt=""
                />
              </div>
              <Alert className="text-left">
                <AlertTitle>Tu contraseña se reinicio con exito!</AlertTitle>
                <AlertDescription>{bannerMessage}</AlertDescription>
                <div className="mt-4 mr-auto flex justify-start">
                  <Button
                    className="bg-black text-white"
                    type="button"
                    variant="noShadow"
                    asChild
                  >
                    <Link to="/login">Iniciar sesion</Link>
                  </Button>
                </div>
              </Alert>
            </div>
          </div>
        ) : (
          <form
            id="signin"
            onSubmit={handleSubmit(onLoginAction)}
            className="w-full max-w-md space-y-6"
            noValidate
          >
            <div className="w-full max-w-md space-y-6">
              <div className="space-y-2 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/5 shadow-xl mx-auto flex items-center justify-center">
                  <img
                    src={logos.icon}
                    className="size-10"
                    alt=""
                  />
                </div>
                <h1 className="text-2xl font-bold">Reinicia tu contraseña</h1>
                <p className="text-muted-foreground">
                  Ingresa tus datos y haz clic en cambiar contraseña.
                </p>
              </div>
              {serverErrors?.map((serverError) => (
                <Alert key={serverError.name} variant="destructive">
                  <InfoIcon className="h-4 w-4" color="white" />
                  <AlertTitle>
                    {capitalizeFirstLetter(serverError.message)}
                  </AlertTitle>
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
                    aria-invalid={errors.email?.message ? true : false}
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
                      Reiniciando contraseña...
                    </>
                  ) : (
                    "Reiniciar contraseña"
                  )}
                </Button>
              </div>
              <div className="text-center text-sm">
                <Link to="/login" className="p-0">
                  Regresar al inicio de sesion
                </Link>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
