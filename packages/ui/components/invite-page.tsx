import { zodResolver } from "@hookform/resolvers/zod";
import type { GraphQLError } from "graphql";
import { InfoIcon, LoaderCircleIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import { useMutation } from "urql";
import * as z from "zod";
import { Input, Label } from "ui/components/index";
import { Alert, AlertTitle } from "ui/components/alert";
import { Button } from "ui/components/button";
import EmailInput from "ui/components/email-input";
import { PasswordInput } from "ui/components/password-input";
import { CreateUserDocument } from "gql-generated/gql/graphql";
import type {
  CreateUserMutation,
  CreateUserMutationVariables,
} from "gql-generated/generated/types";
import { cn } from "ui/lib/utils";
//@ts-ignore
import backgroundImage from "../lib/images/background.png";

const signUpSchema = z.object({
  fullName: z
    .string({ error: "El nombre completo es un campo obligatorio" })
    .min(2, "El nombre completo es un campo obligatorio"),
  username: z.string().optional(),
  email: z
    .string({ error: "El correo electronico es un campo requerido." })
    .email("Correo electronico invalido"),
  password: z
    .string({ error: "La contraseña es un campo requerido" })
    .min(1, { message: "Tu contaseña debe de tener al menos un caracter." }),
});

export default function InvitePage() {
  const [, createUserAction] = useMutation<
    CreateUserMutation,
    CreateUserMutationVariables
  >(CreateUserDocument);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams()
  const [isLoading, setIsLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState<GraphQLError[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof signUpSchema>>({
    mode: "onSubmit",
    resolver: zodResolver<z.output<typeof signUpSchema>>(signUpSchema),
  });

  const onRegisterAction = async (data: z.infer<typeof signUpSchema>) => {
    try {
      setIsLoading(true);
      const { email, username, fullName, password } = data;

      const result = await createUserAction({
        input: {
          fullName,
          username: username || "",
          email,
          password,
          role: "user",
          token: searchParams.get('token')
        },
      });

      if (result?.data?.createUser) {
        setIsLoading(false);
        navigate("/");
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
      <div className="flex-1 flex items-center justify-center p-6 md:p-10">
        <form
          id="invite"
          onSubmit={handleSubmit(onRegisterAction)}
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
              <h1 className="text-2xl font-bold">Registrate a Uspk Academy</h1>
              <p className="text-muted-foreground">
                Ingresa tus datos para continuar
              </p>
            </div>
            {serverErrors?.map((serverError) => (
              <Alert key={serverError.name} variant="destructive">
                <InfoIcon className="h-4 w-4" color="white" />
                <AlertTitle>{serverError.message}</AlertTitle>
              </Alert>
            ))}
            <div className="space-y-4">
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
                  <Label className="text-sm mb-1" htmlFor="fullName">
                    Usuario
                  </Label>
                  <Input
                    placeholder="johncastle"
                    required
                    autoComplete="username"
                    aria-invalid={errors.username?.message ? true : false}
                    {...register("username")}
                  />
                  {errors.username?.message ? (
                    <p
                      className="text-destructive mt-2 text-xs"
                      role="alert"
                      aria-live="polite"
                    >
                      {errors.username?.message}
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

              <Button
                className="w-full"
                type="submit"
                form="invite"
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting || isLoading ? (
                  <>
                    <LoaderCircleIcon
                      className="-ms-1 mr-2 animate-spin"
                      size={16}
                      aria-hidden="true"
                    />
                    Terminando registro...
                  </>
                ) : (
                  "Terminar registro"
                )}
              </Button>
            </div>

            <div className="text-center text-sm">
              ¿Ya estas registrador?{" "}
              <Link to="/login" className="text-primary p-0" viewTransition>
                Inicia sesion aqui
              </Link>
            </div>
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
