import { zodResolver } from "@hookform/resolvers/zod";
import type { GraphQLError } from "graphql";
import { InfoIcon, LoaderCircleIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { redirect, useNavigate } from "react-router";
import { toast } from "sonner";
import { useMutation } from "urql";
import { z } from "zod";
import { PageBreadCrumbs } from "ui/components/admin/page-breadcrumbs";
import { Button } from "ui/components/button";
import { Alert, AlertTitle } from "ui/components/alert";
import { PasswordInput } from "ui/components/password-input";
import { UpdateUserPasswordDocument } from "gql-generated/generated/bff.sdk";
import type {
  UpdateUserPasswordMutation,
  UpdateUserPasswordMutationVariables,
} from "gql-generated/generated/types";
import { cn } from "ui/lib/utils";

export const loader = async ({ request }: { request: Request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookies = Object.fromEntries(
    cookieHeader?.split("; ").map((cookie) => cookie.split("=")) || []
  );

  const sessionToken = cookies.session_token;

  if (!sessionToken) {
    // Redirect to login if session token is missing
    return redirect("/login");
  }

  return null; // Proceed if authenticated
};

const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, "La contraseña actual es un campo requerido"),
    newPassword: z
      .string()
      .min(8, "La nueva contraseña debe tener al menos 8 caracteres.")
      .regex(/[0-9]/, "La nueva contraseña debe tener al menos 1 número.")
      .regex(
        /[a-z]/,
        "La nueva contraseña debe tener al menos 1 letra minúscula."
      )
      .regex(
        /[A-Z]/,
        "La nueva contraseña debe tener al menos 1 letra mayúscula."
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
  });

export default function ChangePasswordPage() {
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);
  const [serverErrors, setServerErrors] = useState<GraphQLError[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof changePasswordSchema>>({
    mode: "onSubmit",
    resolver:
      zodResolver<z.output<typeof changePasswordSchema>>(changePasswordSchema),
  });

  const [, updatePasswordMutation] = useMutation<
    UpdateUserPasswordMutation,
    UpdateUserPasswordMutationVariables
  >(UpdateUserPasswordDocument);

  const onChangePasswordAction = async (
    data: z.infer<typeof changePasswordSchema>
  ) => {
    try {
      setIsUpdating(true);
      setServerErrors([]);
      const { currentPassword, newPassword, confirmPassword } = data;
      const result = await updatePasswordMutation({
        input: { currentPassword, newPassword },
      });

      if (result?.data?.updateUserPassword) {
        setIsUpdating(false);
        setServerErrors([]);
      } else {
        console.error("Ocurrio un error", result.error);
        setIsUpdating(false);
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
    <>
      <PageBreadCrumbs
        items={[{ label: "Account" }, { label: "Change Password" }]}
      />

      <form
        className="max-w-md space-y-4"
        onSubmit={handleSubmit(onChangePasswordAction)}
        noValidate
      >
        {serverErrors?.map((serverError) => (
          <Alert key={serverError.name} variant="destructive">
            <InfoIcon className="h-4 w-4" color="white" />
            <AlertTitle>
              {serverError.message.replace("failed to update user: ", "")}
            </AlertTitle>
          </Alert>
        ))}
        <div className="flex flex-col items-start gap-4 w-full">
          <div className="space-y-2 w-full">
            <PasswordInput
              label="Contraseña actual"
              labelClassName="text-sm mb-1"
              className={cn("text-sm font-medium peer")}
              autoComplete="current-password"
              placeholder="••••••••"
              required
              aria-invalid={!!errors.currentPassword?.message}
              {...register("currentPassword")}
            />
            {errors.currentPassword?.message ? (
              <p
                className="text-destructive mt-2 text-xs"
                role="alert"
                aria-live="polite"
              >
                {errors.currentPassword?.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2 w-full">
            <PasswordInput
              label="Nueva contraseña"
              labelClassName="text-sm mb-1"
              className={cn("text-sm font-medium peer")}
              autoComplete="new-password"
              placeholder="••••••••"
              required
              aria-invalid={!!errors.newPassword?.message}
              {...register("newPassword")}
            />
            {errors.newPassword?.message ? (
              <p
                className="text-destructive mt-2 text-xs"
                role="alert"
                aria-live="polite"
              >
                {errors.newPassword?.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2 w-full">
            <PasswordInput
              label="Confirmar contraseña"
              labelClassName="text-sm mb-1"
              className={cn("text-sm font-medium peer")}
              autoComplete="new-password"
              placeholder="••••••••"
              required
              aria-invalid={!!errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword?.message ? (
              <p
                className="text-destructive mt-2 text-xs"
                role="alert"
                aria-live="polite"
              >
                {errors.confirmPassword?.message}
              </p>
            ) : null}
          </div>

          <div className="flex gap-4 mt-2 justify-end">
            <Button variant="neutral" onClick={() => navigate(-1)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? (
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
        </div>
      </form>
    </>
  );
}
