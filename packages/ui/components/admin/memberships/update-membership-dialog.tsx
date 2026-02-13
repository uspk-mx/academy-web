import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMutation } from "urql";
import { Button, Label } from "ui/components/index";
import { AutoGrowTextarea } from "ui/components/autogrow-textarea";
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "ui/components/drawer";
import { Input } from "ui/components/input";
import { PriceInput } from "ui/components/price-input";
import { UpdateSubscriptionPlanDocument } from "gql-generated/gql/graphql";
import type {
  UpdateSubscriptionPlanInput,
  UpdateSubscriptionPlanMutation,
  UpdateSubscriptionPlanMutationVariables,
} from "gql-generated/generated/types";
import {
  memberShipFormSchema,
  type MembershipFormSchemaType,
} from "./form-schema";
import type { MembershipType } from "./membership-card";

export const UpdateMembershipDialog = ({
  membership,
  refetchMemberships,
  isOpen,
  onClose,
}: {
  membership: Omit<
    MembershipType,
    "createdAt" | "updatedAt" | "category"
  > | null;
  refetchMemberships: () => void;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [localMembership, setLocalMembership] = useState<Omit<
    MembershipType,
    "createdAt" | "updatedAt" | "category"
  > | null>(null);

  useEffect(() => {
    if (membership) {
      setLocalMembership(membership);
      form.reset({
        planName: membership.planName,
        planDescription: membership.planDescription || "",
        price: membership.price || 0,
        duration: membership.duration || 0,
      });
      setPlanPrice(membership.price.toString());
    }
  }, [membership]);

  const [planPrice, setPlanPrice] = useState(localMembership?.price ?? "");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<MembershipFormSchemaType>({
    resolver: zodResolver(memberShipFormSchema),
    defaultValues: {
      planName: localMembership?.planName,
      planDescription: localMembership?.planDescription || "",
      price: localMembership?.price || 0,
      duration: localMembership?.duration || 0,
    },
  });

  const [{}, updateMemberhipMutation] = useMutation<
    UpdateSubscriptionPlanMutation,
    UpdateSubscriptionPlanMutationVariables
  >(UpdateSubscriptionPlanDocument);

  async function onSubmit(values: MembershipFormSchemaType) {
    setIsSubmitting(true);

    // Prepare the input with the correct types
    const input: UpdateSubscriptionPlanInput = {
      id: localMembership?.id || "",
      planName: values.planName,
      planDescription: values.planDescription,
      price: Number(values.price.toString()),
      duration: Number(values.duration.toString()),
      categoryId: values.categoryId,
    };

    try {
      const response = await updateMemberhipMutation({ input });
      if (response.error) {
        toast.error("Ocurrió un error", {
          description:
            response.error.message ||
            "Ocurrió un error al crear la membresía, inténtalo nuevamente más tarde.",
        });
      } else if (response.data?.updateSubscriptionPlan) {
        toast.success("La membresía se actualizo correctamente", {
          description: `Se actualizo correctamente la membresía: ${response.data.updateSubscriptionPlan.planName}`,
        });

        form.reset();
        setPlanPrice("");
        onClose();
        refetchMemberships();
      } else {
        toast.error("Ocurrió un error", {
          description:
            "Ocurrió un error desconocido al crear la membresía, inténtalo nuevamente más tarde.",
        });
      }
    } catch (error: any) {
      toast.error("Error", {
        description:
          error.message || "An error occurred while creating the plan",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(isOpened) => {
        if (!isOpened) {
          onClose();
        }
      }}
    >
      <DrawerContent className="sm:p-0 sm:max-w-lg">
        <DrawerHeader containerClassName="sm:p-6 bg-slate-50">
          <DrawerTitle>Crear membresia</DrawerTitle>
          <DrawerDescription className="mt-1 text-sm">
            Create una nueva membresia, rellena todos los datos y haz clic en
            Actualizar membresia.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody className="px-6">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            id="createMembershipForm"
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label>Nombre de la membresia</Label>
              <Input
                placeholder="Enfermeria Premium"
                aria-invalid={
                  form.formState.errors.planName?.message ? true : false
                }
                {...form.register("planName")}
              />
              {form.formState.errors.planName?.message ? (
                <p className="text-[0.8rem] text-red-700 text-muted-foreground">
                  {form.formState.errors.planName?.message}
                </p>
              ) : (
                <p className="text-[0.8rem] text-muted-foreground">
                  Una corta descripcion para la membresia.
                </p>
              )}
            </div>

            <div className="space-y-2">
              <AutoGrowTextarea
                label="Descripcion de la membresia"
                placeholder="Esta membresia consta de acceso a curso de..."
                rows={3}
                helperText="A detailed description of what's included in this subscription plan."
                {...form.register("planDescription")}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Controller
                  control={form.control}
                  name="price"
                  render={({ field: { onChange, value } }) => (
                    <>
                      <PriceInput
                        label="Pecio *"
                        onChange={(e) => {
                          onChange(e);
                          setPlanPrice(e);
                          form.setValue("price", parseInt(e));
                        }}
                        value={planPrice.toString()}
                        isInvalid={
                          form.formState.errors.price?.message ? true : false
                        }
                      />
                    </>
                  )}
                />
                {form.formState.errors.price?.message ? (
                  <p className="text-[0.8rem] text-red-700 text-muted-foreground">
                    {form.formState.errors.price?.message}
                  </p>
                ) : (
                  <p className="text-[0.8rem] text-muted-foreground">
                    Precio en pesos mexicanos.
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Duracion {"(dias)"}*</Label>
                <Input
                  placeholder="30"
                  type="number"
                  aria-invalid={
                    form.formState.errors.duration?.message ? true : false
                  }
                  {...form.register("duration")}
                />
                {form.formState.errors.duration?.message ? (
                  <p className="text-[0.8rem] text-red-700 text-muted-foreground">
                    {form.formState.errors.duration?.message}
                  </p>
                ) : (
                  <p className="text-[0.8rem] text-muted-foreground">
                    Duracion de la membresia en dias.
                  </p>
                )}
              </div>
            </div>
          </form>
        </DrawerBody>
        <DrawerFooter className="mt-6 sm:p-6 sm:justify-between bg-slate-50">
          <DrawerClose asChild>
            <Button className="mt-2 w-full sm:mt-0 sm:w-fit" variant="neutral">
              Cancelar
            </Button>
          </DrawerClose>
          <Button
            className="w-full sm:w-fit"
            type="submit"
            form="createMembershipForm"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                Actualizando membresia...
              </>
            ) : (
              "Actualizar membresia"
            )}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
