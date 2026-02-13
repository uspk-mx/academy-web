import { zodResolver } from "@hookform/resolvers/zod";
import { LoginDocument } from "gql-generated/generated/bff.sdk";
import type {
  LoginMutation,
  LoginMutationVariables,
} from "gql-generated/generated/types";
import type { GraphQLError } from "graphql";
import {
  InfoIcon
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { Alert, AlertTitle } from "ui/components/alert";
import { Button } from "ui/components/button";
import EmailInput from "ui/components/email-input";
import { Input, Label } from "ui/components/index";
import { PasswordInput } from "ui/components/password-input";
import useStep from "ui/hooks/use-step";
import { cn } from "ui/lib/utils";
import { useMutation } from "urql";
import * as z from "zod";
//@ts-ignore
import backgroundImage from "ui/lib/images/background.png";


const signUpSchema = z.object({
  fullName: z
    .string({ error: "El nombre completo es un campo obligatorio" })
    .min(2, "El nombre completo es un campo obligatorio"),
  email: z
    .string({ error: "El correo electronico es un campo requerido." })
    .email("Correo electronico invalido"),
  password: z
    .string({ error: "La contraseña es un campo requerido" })
    .min(1, { message: "Tu contaseña debe de tener al menos un caracter." }),
});

export default function SignUpPage() {
  const [loginResult, loginAction] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LoginDocument);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState<GraphQLError[]>([]);

  const [currentStep, helpers] = useStep(3);

  const {
    canGoToPrevStep,
    canGoToNextStep,
    goToNextStep,
    goToPrevStep,
    reset,
    setStep,
  } = helpers;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof signUpSchema>>({
    mode: "onSubmit",
    resolver: zodResolver<z.output<typeof signUpSchema>>(signUpSchema),
  });

  const handleGoogleLogin = () => {
    // Redirect to the backend's Google login endpoint
    window.location.href = `${
      //@ts-ignore
      import.meta.env.VITE_API_TARGET
    }/auth/google/login`;
  };

  const onLoginAction = async (data: z.infer<typeof signUpSchema>) => {
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
        setIsLoading(false);
        if (email.includes("@uspk.com.mx")) {
          navigate("/courses");
        } else {
          navigate("/");
        }
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
                  src="https://res.cloudinary.com/uspk/image/upload/v1642566273/logos/svg/uspk-u-mark.svg"
                  className="size-10"
                  alt=""
                />
              </div>
              <h1 className="text-2xl font-bold">Registrate con correo</h1>
              {currentStep === 1 && (
                <p className="text-muted-foreground">
                  Ingresa tus datos para continuar
                </p>
              )}
              {currentStep === 2 && (
                <p className="text-muted-foreground">
                  Ahora escoje un usario y contraseña
                </p>
              )}
            </div>
            {serverErrors?.map((serverError) => (
              <Alert key={serverError.name} variant="destructive">
                <InfoIcon className="h-4 w-4" color="white" />
                <AlertTitle>{serverError.message}</AlertTitle>
              </Alert>
            ))}
            <div className="space-y-4">
              {currentStep === 1 && (
                <>
                  <div className="space-y-2">
                    <Label className="text-sm mb-1" htmlFor="fullName">
                      Nombre completo
                    </Label>
                    <Input
                      placeholder="John Castle"
                      required
                      autoComplete="name"
                      aria-invalid={errors.fullName?.message ? true : false}
                      {...register("fullName")}
                    />
                    {errors.fullName?.message ? (
                      <p
                        className="text-destructive mt-2 text-xs"
                        role="alert"
                        aria-live="polite"
                      >
                        {errors.fullName?.message}
                      </p>
                    ) : null}
                  </div>
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
                </>
              )}
              {currentStep === 2 && (
                <div className="space-y-2">
                  <PasswordInput
                    label="Contraseña"
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
              )}
              {currentStep === 1 && (
                <Button className="w-full" type="button" onClick={goToNextStep}>
                  Continuar con correo
                </Button>
              )}
              {currentStep === 2 && (
                <Button className="w-full" type="button" onClick={goToNextStep}>
                  Validar datos
                </Button>
              )}
              {/* <Button
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
              </Button> */}
              {currentStep === 1 && (
                <Button
                  variant="neutral"
                  className="w-full"
                  type="button"
                  onClick={handleGoogleLogin}
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Inicia sesion con Google
                </Button>
              )}
            </div>
            {currentStep === 1 && (
              <div className="text-center text-sm">
                ¿Ya estas registrador?{" "}
                <Link to="/login" className="text-primary p-0" viewTransition>
                  Inicia sesion aqui
                </Link>
              </div>
            )}
          </div>
        </form>
      </div>

      <div className="hidden md:flex flex-1 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={backgroundImage}
            alt="Background testimonial"
            className="object-cover rounded-4xl w-full h-full"
          />
        </div>
        <div className="absolute inset-0 bg-black/30 flex items-end p-10 text-white rounded-3xl">
          <div className="space-y-4 max-w-full">
            <p className="text-2xl font-medium leading-relaxed">
              "El Ingles te abre las puertas a un mundo lleno de posibilidades."
            </p>
            <div className="space-y-1">
              <h3 className="font-semibold text-lg">George Gardea</h3>
              <p className="text-sm text-gray-300">CEO, Uspk Academy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
