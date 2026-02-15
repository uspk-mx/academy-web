import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  ArrowRight,
  Building2,
  CheckCircle2,
  Eye,
  EyeOff,
  InfoIcon,
  Loader2,
  Sparkles,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import { Alert, AlertTitle } from "ui/components/alert";
import { Button } from "ui/components/button";
import { useMutation, useQuery } from "urql";
import { z } from "zod";


import {
  ActivateCompanySubscriptionDocument,
  CheckUserExistsDocument,
  CreateUserDocument,
  LoginDocument,
  ValidateInviteTokenDocument,
  type ActivateCompanySubscriptionMutation,
  type ActivateCompanySubscriptionMutationVariables,
  type CreateUserMutation,
  type CreateUserMutationVariables,
  type InviteData,
  type LoginMutation,
  type LoginMutationVariables,
} from "gql-generated/gql/graphql";
import type { GraphQLError } from "graphql";
import { redirect } from "react-router";

export function meta() {
  return [
    { title: "Uspk Academy | Invitacion" },
    { name: "description", content: "Bienvenido a Uspk Academy!" },
  ];
}

export const loader = async ({ request }: { request: Request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookies = Object.fromEntries(
    cookieHeader?.split("; ").map((cookie) => cookie.split("=")) || [],
  );

  // biome-ignore lint/complexity/useLiteralKeys: <explanation>
  const sessionToken = cookies["session_token"];

  if (sessionToken) {
    // Redirect to home if session token exists
    return redirect("/");
  }

  return null; // Proceed if authenticated
};

const newUserSchema = z
  .object({
    fullName: z.string().min(2, "Nombre debe tener al menos 2 caracteres"),
    username: z
      .string()
      .min(3, "Usuario debe tener al menos 3 caracteres")
      .regex(/^[a-zA-Z0-9_]+$/, "Solo letras, números y guiones bajos"),
    email: z.email("Email inválido"),
    password: z
      .string()
      .min(8, "Contraseña debe tener al menos 8 caracteres")
      .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
      .regex(/[0-9]/, "Debe contener al menos un número"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

// Schema for EXISTING user login
const existingUserSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(1, "Contraseña requerida"),
});

const FlowState = {
  Validating: "validating",
  NewUser: "new_user",
  ExistingUser: "existing_user",
  Invalid: "invalid",
  Expired: "expired",
  Used: "used",
} as const;

export type FlowState = (typeof FlowState)[keyof typeof FlowState];

export default function Invite() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [flowState, setFlowState] = useState<FlowState>("validating");
  const [inviteData, setInviteData] = useState<InviteData | null>(null);
  const [serverErrors, setServerErrors] = useState<GraphQLError[]>([]);

    const [isPasswordFieldVisible, setIsPasswordFieldVisible] = useState({ 
      password: false,
      confirmPassword: false
    });
  
    const toggleVisibility = (field: string): void => {
      setIsPasswordFieldVisible((prevState) => ({
        ...prevState,
        [field]: !prevState[field as keyof typeof prevState],
      }));
    };
  

  const [{ data: tokenData }] = useQuery({
    query: ValidateInviteTokenDocument,
    variables: { token: token || "" },
    pause: !token,
  });
  const [{ data: userExistsData }] = useQuery({
    query: CheckUserExistsDocument,
    variables: { email: inviteData?.email || "" },
    pause: !inviteData?.email,
  });
  const [, activateSubscription] = useMutation<
    ActivateCompanySubscriptionMutation,
    ActivateCompanySubscriptionMutationVariables
  >(ActivateCompanySubscriptionDocument);
  const [, createUser] = useMutation<
    CreateUserMutation,
    CreateUserMutationVariables
  >(CreateUserDocument);
  const [, loginUser] = useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
  );

  const newUserForm = useForm<z.infer<typeof newUserSchema>>({
    resolver: zodResolver(newUserSchema),
  });

  const existingUserForm = useForm<z.infer<typeof existingUserSchema>>({
    resolver: zodResolver(existingUserSchema),
  });

  useEffect(() => {
    if (!token) {
      setFlowState(FlowState.Invalid);
      return;
    }

    if (tokenData?.validateInviteToken) {
      const { valid, data } = tokenData.validateInviteToken;

      if (!valid) {
        setFlowState(FlowState.Invalid);
        return;
      }

      if (data) {
        setInviteData(data);
        setFlowState(
          userExistsData?.checkUserExists
            ? FlowState.ExistingUser
            : FlowState.NewUser,
        );
      }
    }
  }, [token, tokenData, userExistsData]);

  // Handle NEW USER signup + subscription activation
  const onNewUserSubmit = async (data: z.infer<typeof newUserSchema>) => {
    try {
      setServerErrors([]);

      // Step 1: Create user account
      const createResult = await createUser({
        input: {
          email: data.email,
          fullName: data.fullName,
          username: data.username,
          password: data.password,
          role: "student",
          token: token || "",
        },
      });

      if (createResult.error) {
        setServerErrors(
          createResult.error.graphQLErrors as GraphQLError[],
        );
        return;
      }

      // Step 2: Activate company subscription
      const activateResult = await activateSubscription({ token: token || "" });

      if (activateResult.error) {
        setServerErrors(
          activateResult.error.graphQLErrors as GraphQLError[],
        );
        return;
      }

      toast.success("¡Bienvenido a tu equipo!", {
        description: "Tu cuenta y suscripción han sido activadas",
      });

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Error in signup flow:", error);
      toast.error("Ocurrió un error inesperado");
    }
  };

  // Handle EXISTING USER login + subscription activation
  const onExistingUserSubmit = async (
    data: z.infer<typeof existingUserSchema>,
  ) => {
    try {
      setServerErrors([]);

      // Step 1: Login user
      const loginResult = await loginUser({ input: data });

      if (loginResult.error) {
        setServerErrors(
          loginResult.error.graphQLErrors as GraphQLError[],
        );
        return;
      }

      // Step 2: Activate company subscription
      const activateResult = await activateSubscription({ token: token || "" });

      if (activateResult.error) {
        setServerErrors(
          activateResult.error.graphQLErrors as GraphQLError[],
        );
        return;
      }

      toast.success("¡Suscripción activada!", {
        description: "Ahora eres parte del equipo empresarial",
      });

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Error in activation flow:", error);
      toast.error("Ocurrió un error inesperado");
    }
  };

  if (flowState === FlowState.Validating) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg p-6">
        <div className="w-full max-w-md">
          <div className="rounded-xl border-4 border-black bg-card p-8 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <Loader2 className="mx-auto h-16 w-16 animate-spin text-main" />
            <h2 className="mt-4 text-2xl font-black">
              Validando invitación...
            </h2>
          </div>
        </div>
      </div>
    );
  }

  // Invalid token state
  if (flowState === FlowState.Invalid) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg p-6">
        <div className="w-full max-w-md">
          <div className="relative">
            <div className="absolute inset-0 rotate-1 rounded-xl border-4 border-black bg-destructive" />
            <div className="relative rounded-xl border-4 border-black bg-card p-8 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-4 border-black bg-destructive/20">
                <XCircle className="h-12 w-12 text-destructive" />
              </div>
              <h2 className="mt-6 text-2xl font-black">Invitación Inválida</h2>
              <p className="mt-2 text-muted-foreground">
                El link de invitación empresarial no es válido o ha sido
                manipulado.
              </p>
              <div className="mt-6 space-y-3">
                <p className="text-sm font-bold">¿Qué puedes hacer?</p>
                <ul className="space-y-2 text-left text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-main">•</span>
                    <span>
                      Verifica que copiaste el link completo del email
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-main">•</span>
                    <span>
                      Solicita un nuevo link al administrador de tu empresa
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-main">•</span>
                    <span>Contacta al soporte empresarial</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 flex gap-3">
                <Link to="/contact" className="flex-1">
                  <Button variant="neutral" className="w-full">
                    Contactar Soporte
                  </Button>
                </Link>
                <Link to="/login" className="flex-1">
                  <Button className="w-full">Ir al Login</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Expired token state
  if (flowState === FlowState.Expired) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg p-6">
        <div className="w-full max-w-md">
          <div className="relative">
            <div className="absolute inset-0 rotate-1 rounded-xl border-4 border-black bg-chart-3" />
            <div className="relative rounded-xl border-4 border-black bg-card p-8 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-4 border-black bg-chart-3/20">
                <AlertCircle className="h-12 w-12 text-chart-3" />
              </div>
              <h2 className="mt-6 text-2xl font-black">Invitación Expirada</h2>
              <p className="mt-2 text-muted-foreground">
                Este link de invitación ha expirado. Las invitaciones
                empresariales son válidas por 7 días.
              </p>
              <div className="mt-6 rounded-lg border-2 border-black bg-main p-4">
                <p className="font-bold">Solicita un nuevo link</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Contacta al administrador de tu empresa para que te envíe una
                  nueva invitación empresarial.
                </p>
              </div>
              <div className="mt-6 flex gap-3">
                <Link to="/contact" className="flex-1">
                  <Button variant="neutral" className="w-full">
                    Contactar Empresa
                  </Button>
                </Link>
                <Link to="/login" className="flex-1">
                  <Button className="w-full">Ir al Login</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Already used token state
  if (flowState === FlowState.Used) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg p-6">
        <div className="w-full max-w-md">
          <div className="relative">
            <div className="absolute inset-0 rotate-1 rounded-xl border-4 border-black bg-chart-2" />
            <div className="relative rounded-xl border-4 border-black bg-card p-8 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-4 border-black bg-chart-2/20">
                <CheckCircle2 className="h-12 w-12 text-chart-2" />
              </div>
              <h2 className="mt-6 text-2xl font-black">
                Suscripción Ya Activada
              </h2>
              <p className="mt-2 text-muted-foreground">
                Este link de invitación ya fue utilizado para activar tu
                suscripción empresarial.
              </p>
              <div className="mt-6 rounded-lg border-2 border-black bg-chart-2/10 p-4">
                <p className="font-bold text-chart-2">
                  ¡Tu suscripción está activa!
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Inicia sesión para acceder a tu dashboard empresarial
                </p>
              </div>
              <Link to="/login" className="mt-6 block">
                <Button className="w-full">
                  Iniciar Sesión
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // NEW USER - Signup Form
  if (flowState === FlowState.NewUser && inviteData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg p-6">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="mb-6 overflow-hidden rounded-xl border-4 border-black bg-card shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="border-b-4 border-black bg-chart-1 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border-4 border-black bg-white">
                  <Building2 className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-black">
                      Invitación Empresarial
                    </h1>
                    <Sparkles className="h-6 w-6 text-chart-4" />
                  </div>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm">
                      <span className="font-bold">
                        {inviteData.companyName}
                      </span>{" "}
                      te ha invitado a unirte como Business User
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Plan: {inviteData.planName} • Por: {inviteData.invitedBy}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-main p-4">
              <p className="text-center text-sm font-bold">
                🎉 ¡Crea tu cuenta y obtén acceso inmediato!
              </p>
            </div>
          </div>

          {/* Signup Form */}
          <div className="rounded-xl border-4 border-black bg-card p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="mb-6 text-xl font-black">Crea tu Cuenta</h2>

            {serverErrors?.map((serverError) => (
              <Alert
                key={serverError.message}
                variant="destructive"
                className="mb-6"
              >
                <InfoIcon className="h-4 w-4" color="white" />
                <AlertTitle>{serverError.message}</AlertTitle>
              </Alert>
            ))}

            <form
              onSubmit={newUserForm.handleSubmit(onNewUserSubmit)}
              className="space-y-4"
            >
              {/* Full Name */}
              <div>
                <label className="mb-2 block text-sm font-bold">
                  Nombre Completo
                </label>
                <input
                  {...newUserForm.register("fullName")}
                  type="text"
                  placeholder="John Doe"
                  aria-invalid={
                    !!newUserForm.formState.errors.fullName?.message
                  }
                  className="w-full rounded-xl border-4 border-black bg-card py-3 px-4 font-bold aria-invalid:border-red-500"
                />
                {newUserForm.formState.errors.fullName?.message ? (
                  <p
                    className="text-destructive mt-2 text-xs"
                    role="alert"
                    aria-live="polite"
                  >
                    {newUserForm.formState.errors.fullName.message}
                  </p>
                ) : null}
              </div>

              {/* Username */}
              <div>
                <label className="mb-2 block text-sm font-bold">Usuario</label>
                <input
                  {...newUserForm.register("username")}
                  type="text"
                  placeholder="johndoe"
                  aria-invalid={
                    !!newUserForm.formState.errors.username?.message
                  }
                  className="w-full rounded-xl border-4 border-black bg-card py-3 px-4 font-bold aria-invalid:border-red-500"
                />
                {newUserForm.formState.errors.username?.message ? (
                  <p
                    className="text-destructive mt-2 text-xs"
                    role="alert"
                    aria-live="polite"
                  >
                    {newUserForm.formState.errors.username.message}
                  </p>
                ) : null}
              </div>

              {/* Email (pre-filled) */}
              <div>
                <label className="mb-2 block text-sm font-bold">Email</label>
                <input
                  {...newUserForm.register("email")}
                  type="email"
                  value={inviteData.email ?? ""}
                  readOnly
                  className="w-full rounded-xl border-4 border-black bg-muted py-3 px-4 font-bold"
                />
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-bold">
                  Contraseña
                </label>
                <div className="relative w-full">
                  <input
                    {...newUserForm.register("password")}
                    type={isPasswordFieldVisible.password ? "text" : "password"}
                    placeholder="••••••••"
                    aria-invalid={
                      !!newUserForm.formState.errors.password?.message
                    }
                    className="w-full rounded-xl border-4 border-black bg-card py-3 px-4 font-bold aria-invalid:border-red-500"
                  />
                  <button
                    aria-controls="password"
                    aria-label={
                      isPasswordFieldVisible.password
                        ? "Hide password"
                        : "Show password"
                    }
                    aria-pressed={isPasswordFieldVisible.password}
                    className="absolute inset-y-0 end-2 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-blue/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={() => toggleVisibility("password")}
                    type="button"
                  >
                    {isPasswordFieldVisible.password ? (
                      <EyeOff aria-hidden="true" size={16} strokeWidth={2} />
                    ) : (
                      <Eye aria-hidden="true" size={16} strokeWidth={2} />
                    )}
                  </button>
                </div>
                {newUserForm.formState.errors.password?.message ? (
                  <p
                    className="text-destructive mt-2 text-xs"
                    role="alert"
                    aria-live="polite"
                  >
                    {newUserForm.formState.errors.password.message}
                  </p>
                ) : null}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="mb-2 block text-sm font-bold">
                  Confirmar Contraseña
                </label>
                <div className="relative w-full">
                  <input
                    {...newUserForm.register("confirmPassword")}
                    type={
                      isPasswordFieldVisible.confirmPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="••••••••"
                    aria-invalid={
                      !!newUserForm.formState.errors.confirmPassword?.message
                    }
                    className="w-full rounded-xl border-4 border-black bg-card py-3 px-4 font-bold aria-invalid:border-red-500"
                  />
                  <button
                    aria-controls="confirmPassword"
                    aria-label={
                      isPasswordFieldVisible.confirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                    aria-pressed={isPasswordFieldVisible.confirmPassword}
                    className="absolute inset-y-0 end-2 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-blue/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={() => toggleVisibility("confirmPassword")}
                    type="button"
                  >
                    {isPasswordFieldVisible.confirmPassword ? (
                      <EyeOff aria-hidden="true" size={16} strokeWidth={2} />
                    ) : (
                      <Eye aria-hidden="true" size={16} strokeWidth={2} />
                    )}
                  </button>
                </div>
                {newUserForm.formState.errors.confirmPassword?.message ? (
                  <p
                    className="text-destructive mt-2 text-xs"
                    role="alert"
                    aria-live="polite"
                  >
                    {newUserForm.formState.errors.confirmPassword.message}
                  </p>
                ) : null}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={newUserForm.formState.isSubmitting}
              >
                {newUserForm.formState.isSubmitting ? (
                  <>
                    <Loader2
                      className="-ms-1 mr-2 animate-spin"
                      size={16}
                      aria-hidden="true"
                    />
                    Creando cuenta...
                  </>
                ) : (
                  <>
                    Crear Cuenta y Activar Suscripción
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // EXISTING USER - Login Form
  if (flowState === FlowState.ExistingUser && inviteData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg p-6">
        <div className="w-full max-w-md">
          <div className="mb-6 rounded-xl border-4 border-black bg-card p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h1 className="text-2xl font-black">¡Ya Tienes Cuenta!</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Inicia sesión para activar tu acceso a{" "}
              <span className="font-bold">{inviteData.companyName}</span>
            </p>
          </div>

          <div className="rounded-xl border-4 border-black bg-card p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            {serverErrors?.map((serverError) => (
              <Alert
                key={serverError.message}
                variant="destructive"
                className="mb-6"
              >
                <InfoIcon className="h-4 w-4" color="white" />
                <AlertTitle>{serverError.message}</AlertTitle>
              </Alert>
            ))}

            <form
              onSubmit={existingUserForm.handleSubmit(onExistingUserSubmit)}
              className="space-y-4"
            >
              <div>
                <label className="mb-2 block text-sm font-bold">Email</label>
                <input
                  {...existingUserForm.register("email")}
                  type="email"
                  value={inviteData.email ?? ""}
                  readOnly
                  className="w-full rounded-xl border-4 border-black bg-muted py-3 px-4 font-bold"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold">
                  Contraseña
                </label>
                <input
                  {...existingUserForm.register("password")}
                  type="password"
                  placeholder="••••••••"
                  aria-invalid={!!existingUserForm.formState.errors.password?.message}
                  className="w-full rounded-xl border-4 border-black bg-card py-3 px-4 font-bold aria-invalid:border-red-500"
                />
                {existingUserForm.formState.errors.password?.message ? (
                  <p className="text-destructive mt-2 text-xs" role="alert" aria-live="polite">
                    {existingUserForm.formState.errors.password.message}
                  </p>
                ) : null}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={existingUserForm.formState.isSubmitting}
              >
                {existingUserForm.formState.isSubmitting ? (
                  <>
                    <Loader2
                      className="-ms-1 mr-2 animate-spin"
                      size={16}
                      aria-hidden="true"
                    />
                    Iniciando sesión...
                  </>
                ) : (
                  <>
                    Iniciar Sesión y Activar
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
