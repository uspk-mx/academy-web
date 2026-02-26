import { zodResolver } from "@hookform/resolvers/zod";
import type {
  LoginMutation,
  LoginMutationVariables,
} from "gql-generated/gql/graphql";
import { LoginDocument } from "gql-generated/gql/graphql";
import type { GraphQLError } from "graphql";
import { Eye, EyeOff, InfoIcon, LoaderCircleIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLoaderData, useNavigate } from "react-router";
import { toast } from "sonner";
import { Alert, AlertTitle } from "ui/components/alert";
import { Button } from "ui/components/button";
import { logos } from "ui/lib/config/site";
import { useMutation } from "urql";
import * as z from "zod";

const signInSchema = z.object({
  email: z.email({
    error: "Por favor, introduce un correo electrónico válido",
  }),
  password: z
    .string({ error: "La contraseña es un campo requerido" })
    .min(1, { message: "Tu contaseña debe de tener al menos un caracter." }),
});

function loader() {
  return null;
}

export default function LoginPage() {
  const [, loginAction] = useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
  );
  const navigate = useNavigate();
  const data: any = useLoaderData<typeof loader>();
  const [isLoading, setIsLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState<GraphQLError[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = (): void => {
    setIsVisible((prevState) => !prevState);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof signInSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(signInSchema),
  });

  // TODO: test google integration
  const handleGoogleLogin = () => {
    // Redirect to the backend's Google login endpoint
    window.location.href = `${data.ENV.API_URL}/auth/google/login`;
  };

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
    <div className="flex min-h-screen items-center justify-center bg-bg p-6">
      <div className="w-full max-w-md">
        <div className="mb-6 rounded-xl border-4 border-black bg-card p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="space-y-2 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/5 shadow-xl mx-auto flex items-center justify-center">
              <img
                src={logos.icon}
                className="size-10"
                alt=""
              />
            </div>
            <h1 className="text-2xl font-bold">Bienvenido de nuevo</h1>
            <p className="text-muted-foreground">
              Por favor, introduce tus datos.
            </p>
          </div>
        </div>

        <div className="rounded-xl border-4 border-black bg-card p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
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
          <form
            id="signin"
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit(onLoginAction)();
            }}
            className="w-full"
            noValidate
          >
            <div className="flex flex-col items-start gap-4">
              <div className="w-full gap-2 flex flex-col items-start">
                <label className="block text-sm font-bold">Email</label>
                <input
                  type="email"
                  placeholder="email@youremail.com"
                  className="w-full rounded-xl border-4 border-black bg-card py-3 px-4 font-bold aria-invalid:border-red-500"
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

              <div className="w-full gap-2 flex flex-col items-start">
                <label className="block text-sm font-bold">Contraseña</label>
                <div className="relative w-full">
                  <input
                    type={isVisible ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full rounded-xl border-4 pr-10 border-black bg-card py-3 px-4 font-bold aria-invalid:border-red-500"
                    aria-invalid={!!errors.password?.message}
                    {...register("password")}
                  />
                  <button
                    aria-controls="password"
                    aria-label={isVisible ? "Hide password" : "Show password"}
                    aria-pressed={isVisible}
                    className="absolute inset-y-0 end-2 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-blue/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={toggleVisibility}
                    type="button"
                  >
                    {isVisible ? (
                      <EyeOff aria-hidden="true" size={16} strokeWidth={2} />
                    ) : (
                      <Eye aria-hidden="true" size={16} strokeWidth={2} />
                    )}
                  </button>
                </div>

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

              <Button type="submit" className="w-full" form="signin">
                {isSubmitting || isLoading ? (
                  <>
                    <LoaderCircleIcon
                      className="-ms-1 mr-2 animate-spin"
                      size={16}
                      aria-hidden="true"
                    />
                    Iniciando sesión...
                  </>
                ) : (
                  "Iniciar sesión"
                )}
              </Button>
              {/* <Button
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
                  <title>Goggle</title>
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
              </Button> */}
              <Link
                className="text-primary p-0 w-full text-center"
                to="/password/reset"
              >
                Olvide mi contraseña
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
