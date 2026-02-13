import { zodResolver } from "@hookform/resolvers/zod";
import type {
  ChangePasswordMutation,
  ChangePasswordMutationVariables,
} from "gql-generated/gql/graphql";
import { ChangePasswordDocument } from "gql-generated/gql/graphql";
import type { GraphQLError } from "graphql";
import { InfoIcon, LoaderCircleIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router";
import { toast } from "sonner";
import { Button } from "ui/components/button";
import { Alert, AlertDescription, AlertTitle } from "ui/components/alert";
import { PasswordInput } from "ui/components/password-input";
import { capitalizeFirstLetter, cn } from "ui/lib/utils";
import { useMutation } from "urql";
import { z } from "zod";


const changePasswordSchema = z.object({
    password: z
        .string({
            error: "La contraseña es un campo requerido.",
        })
        .min(8, "La contraseña debe tener al menos 8 caracteres.")
        .regex(/[0-9]/, "La contraseña debe tener al menos 1 número.")
        .regex(/[a-z]/, "La contraseña debe tener al menos 1 letra minúscula.")
        .regex(/[A-Z]/, "La contraseña debe tener al menos 1 letra mayúscula."),
});


export default function ChangePasswordPage() {
  const [, changePasswordMutation] = useMutation<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >(ChangePasswordDocument);
  
  const [isLoading, setIsLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState<GraphQLError[]>([]);
  const [showBanner, setShowBanner] = useState(false);
  const [bannerMessage, setBannerMessage] = useState("");
  const [searchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof changePasswordSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(changePasswordSchema),
  });

  const onChangePasswordAction = async (data: z.infer<typeof changePasswordSchema>) => {
    try {
      setIsLoading(true);
      const { password } = data;

      const result = await changePasswordMutation({
        token: searchParams.get("token") || "",
        password,
      });

      if (result?.data?.changePassword) {
        setIsLoading(false);
        setShowBanner(true);
        setBannerMessage(result?.data?.changePassword);
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
                  src="https://res.cloudinary.com/uspk/image/upload/v1642566273/logos/svg/uspk-u-mark.svg"
                  className="size-10"
                  alt=""
                />
              </div>
              <Alert className="text-left">
                <AlertTitle>Tu contraseña ha sido actualizada!</AlertTitle>
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
            onSubmit={handleSubmit(onChangePasswordAction)}
            className="w-full max-w-md space-y-6"
            noValidate
          >
            <div className="w-full max-w-md space-y-6">
              <div className="space-y-2 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/5 shadow-xl mx-auto flex items-center justify-center">
                  <img
                    src="https://res.cloudinary.com/uspk/image/upload/v1642566273/logos/svg/uspk-u-mark.svg"
                    className="size-10"
                    alt=""
                  />
                </div>
                <h1 className="text-2xl font-bold">Cambia tu contraseña</h1>
                <p className="text-muted-foreground">
                  Ingresa tu nueva contraseña y haz clic en actualizar
                  contraseña.
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
                  <PasswordInput
                    label="Nueva contraseña"
                    labelClassName="text-sm mb-1"
                    className={cn("text-sm font-medium peer")}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    required
                    aria-invalid={errors.password?.message ? true : false}
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
                      Actualizando contraseña...
                    </>
                  ) : (
                    "Atualizar contraseña"
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
