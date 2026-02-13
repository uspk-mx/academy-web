import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMutation } from "urql";
import { Button, Label } from "ui/components/index";
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
import { UpdateCompanyDocument } from "gql-generated/gql/graphql";
import type {
  Company,
  UpdateCompanyInput,
  UpdateCompanyMutation,
  UpdateCompanyMutationVariables,
} from "gql-generated/generated/types";
import { Switch } from "ui/components/switch";
import {
  companyFormSchema,
  type CompanyFormSchemaType,
} from "./companies-form-schema";

export const UpdateCompanyDialog = ({
  company,
  refetchCompanies,
  isOpen,
  onClose,
}: {
  company: Omit<Company, "createdAt" | "updatedAt" | "category"> | null;
  refetchCompanies: () => void;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [localData, setLocalData] = useState<Omit<
    Company,
    "createdAt" | "updatedAt" | "category"
  > | null>(null);

  useEffect(() => {
    if (company) {
      setLocalData(company);
      form.reset({
        name: company.name,
        email: company.email,
        address: company.address || "",
        taxId: company.taxId || "",
        taxName: company.taxName || "",
        isActive: company.isActive || undefined,
      });
    }
  }, [company]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<CompanyFormSchemaType>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      name: localData?.name || "",
      email: localData?.email || "",
      address: localData?.address || "",
      taxId: localData?.taxId || "",
      taxName: localData?.taxName || "",
      isActive: localData?.isActive || undefined,
    },
  });

  const [{}, updateCompanyMutation] = useMutation<
    UpdateCompanyMutation,
    UpdateCompanyMutationVariables
  >(UpdateCompanyDocument);

  async function onSubmit(values: CompanyFormSchemaType) {
    setIsSubmitting(true);

    // Prepare the input with the correct types
    const input: UpdateCompanyInput = values;

    try {
      const response = await updateCompanyMutation({
        companyId: localData?.id || "",
        input,
      });
      if (response.error) {
        toast.error("Ocurrió un error", {
          description:
            response.error.message ||
            "Ocurrió un error al crear la empresa, inténtalo nuevamente más tarde.",
        });
      } else if (response.data?.updateCompany) {
        toast.success("La empresa se actualizo correctamente", {
          description: `Se actualizo correctamente la empresa: ${response.data.updateCompany.name}`,
        });

        form.reset();
        onClose();
        refetchCompanies();
      } else {
        toast.error("Ocurrió un error", {
          description:
            "Ocurrió un error desconocido al crear la empresa, inténtalo nuevamente más tarde.",
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
          <DrawerTitle>Actualizar empresa</DrawerTitle>
          <DrawerDescription className="mt-1 text-sm">
            Create una nueva empresa, rellena todos los datos y haz clic en
            Actualizar empresa.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody className="px-6">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            id="updateCompanyForm"
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label>Nombre</Label>
              <Input
                placeholder="Company Inc."
                aria-invalid={
                  form.formState.errors.name?.message ? true : false
                }
                {...form.register("name")}
              />
              {form.formState.errors.name?.message ? (
                <p className="text-[0.8rem] text-red-700 text-muted-foreground">
                  {form.formState.errors.name?.message}
                </p>
              ) : (
                <p className="text-[0.8rem] text-muted-foreground">
                  Nombre de la empresa asociada.
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Correo Electronico</Label>
              <Input
                placeholder="companyemail@email.com"
                aria-invalid={
                  form.formState.errors.email?.message ? true : false
                }
                {...form.register("email")}
              />
              {form.formState.errors.email?.message ? (
                <p className="text-[0.8rem] text-red-700 text-muted-foreground">
                  {form.formState.errors.email?.message}
                </p>
              ) : (
                <p className="text-[0.8rem] text-muted-foreground">
                  El correo electronico de la empresa asociada.
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Direccion {"(Opcional)"}</Label>
              <Input
                placeholder="Holliwood Blvd 123"
                aria-invalid={
                  form.formState.errors.address?.message ? true : false
                }
                {...form.register("address")}
              />
              {form.formState.errors.address?.message ? (
                <p className="text-[0.8rem] text-red-700 text-muted-foreground">
                  {form.formState.errors.address?.message}
                </p>
              ) : (
                <p className="text-[0.8rem] text-muted-foreground">
                  La direccion de la empresa.
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>RFC de la empresa {"(Opcional)"}</Label>
              <Input
                placeholder="XXXX660530X66"
                aria-invalid={
                  form.formState.errors.taxId?.message ? true : false
                }
                max={10}
                maxLength={10}
                {...form.register("taxId")}
              />
              {form.formState.errors.taxId?.message ? (
                <p className="text-[0.8rem] text-red-700 text-muted-foreground">
                  {form.formState.errors.taxId?.message}
                </p>
              ) : (
                <p className="text-[0.8rem] text-muted-foreground">
                  RFC de la empresa.
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Nombre o Razon social {"(Opcional)"}</Label>
              <Input
                placeholder="XXXX660530X66"
                aria-invalid={
                  form.formState.errors.taxName?.message ? true : false
                }
                {...form.register("taxName")}
              />
              {form.formState.errors.taxName?.message ? (
                <p className="text-[0.8rem] text-red-700 text-muted-foreground">
                  {form.formState.errors.taxName?.message}
                </p>
              ) : (
                <p className="text-[0.8rem] text-muted-foreground">
                  Nombre o Razon social de la empresa.
                </p>
              )}
            </div>

            <div className="space-y-2 flex flex-col">
              <Label>Estado de la empresa {"(Opcional)"}</Label>
              <Controller
                control={form.control}
                name="isActive"
                render={({ field: { onChange, value } }) => (
                  <>
                    <Switch
                      aria-invalid={
                        form.formState.errors.taxName?.message ? true : false
                      }
                      onCheckedChange={onChange}
                      checked={value}
                    />
                  </>
                )}
              />

              {form.formState.errors.taxName?.message ? (
                <p className="text-[0.8rem] text-red-700 text-muted-foreground">
                  {form.formState.errors.taxName?.message}
                </p>
              ) : (
                <p className="text-[0.8rem] text-muted-foreground">
                  Este es un checkbox para activar o desactivar la empresa.
                </p>
              )}
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
            form="updateCompanyForm"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                Actualizando empresa...
              </>
            ) : (
              "Actualizar empresa"
            )}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
