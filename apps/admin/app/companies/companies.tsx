/*
 * Copyright (c) Uspk Academy. and its affiliates.
 */
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import { toast } from "sonner";
import { useMutation, useQuery } from "urql";
import {
  companyFormSchema,
  type CompanyFormSchemaType,
} from "ui/components/admin/companies-form-schema";
import { ContentCard } from "ui/components/admin/content-card";
import { ContentCardSkeleton } from "ui/components/admin/content-card-skeleton";
import { DeleteResourceDialog } from "ui/components/admin/delete-resource-modal";
import { PageBreadCrumbs } from "ui/components/admin/page-breadcrumbs";
import { UpdateCompanyDialog } from "ui/components/admin/update-company-dialog";
import { CourseEmptyPage } from "ui/components/courses/course-empty-page";
import { CoursesPageToolbar as MembershipsPageToolbar } from "ui/components/courses/course-page-toolbar";
import { Button } from "ui/components/button";
import { Input } from "ui/components/input";
import { Label } from "ui/components/label";
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "ui//components/drawer";
import {
  CompaniesDocument,
  CreateCompanyDocument,
  DeleteCompanyDocument,
} from "gql-generated/generated/bff.sdk";
import type {
  CompaniesQuery,
  CompaniesQueryVariables,
  Company,
  CreateCompanyInput,
  CreateCompanyMutation,
  CreateCompanyMutationVariables,
  DeleteCompanyMutation,
  DeleteCompanyMutationVariables,
} from "gql-generated/generated/types";
import { useToggleState } from "ui/hooks/use-toggle-state";

export default function CompaniesPage() {
  const [isCreateDialogOpen, showCreateDialog, closeCreateDialog] =
    useToggleState();
  const [isUpdateDialogOpen, showUpdateDialog, closeUpdateDialog] =
    useToggleState(false);

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || undefined;
  const sortOrder = searchParams.get("sort") || undefined;

  const [isDeletingDialogOpen, setIsDeletingDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const [{}, createCompany] = useMutation<
    CreateCompanyMutation,
    CreateCompanyMutationVariables
  >(CreateCompanyDocument);

  const [{}, deleteCompany] = useMutation<
    DeleteCompanyMutation,
    DeleteCompanyMutationVariables
  >(DeleteCompanyDocument);

  const [{ data, fetching }, refetchCompanies] = useQuery<
    CompaniesQuery,
    CompaniesQueryVariables
  >({
    query: CompaniesDocument,
  });

  const [companies, setCompanies] = useState<CompaniesQuery | undefined>(data);

  useEffect(() => {
    setCompanies(data);
    return () => setCompanies(undefined);
  }, [data]);

  // Initialize form with react-hook-form and zod validation
  const form = useForm<CompanyFormSchemaType>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      taxId: "",
      taxName: "",
      isActive: true,
    },
  });

  async function onSubmit(values: CompanyFormSchemaType) {
    setIsSubmitting(true);

    // Prepare the input with the correct types
    const input: CreateCompanyInput = {
      name: values.name,
      email: values.email,
      address: values.address || "",
      taxId: values.taxId || null,
      taxName: values.taxName || null,
      isActive: values.isActive || true,
    };

    try {
      const response = await createCompany({ input });
      if (response.error) {
        toast.error("Ocurrió un error", {
          description:
            response.error.message ||
            "Ocurrió un error al crear la empresa, inténtalo nuevamente más tarde.",
        });
      } else if (response.data?.createCompany) {
        toast.success("La empresa se creó correctamente", {
          description: `Se creó correctamente la empresa: ${response.data.createCompany.name}`,
        });

        form.reset();
        closeCreateDialog();
        const newCompanies = [
          ...(companies?.companies || []),
          response.data.createCompany,
        ];
        setCompanies({ companies: newCompanies });
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

  async function onDeleteCompany(id: string) {
    try {
      setIsSubmitting(true);
      const response = await deleteCompany({ companyId: id });
      if (response.data?.deleteCompany) {
        toast.success("Se borro correctamente la empresa");
        setIsDeletingDialogOpen(false);
        setIsSubmitting(false);
        const updatedCompanies = companies?.companies.filter(
          (item) => item.id !== selectedCompany?.id,
        );
        setCompanies({ companies: updatedCompanies || [] });
      } else if (response.error?.message) {
        toast.error("Algo extraño sucedio", {
          description: "Intentalo nuevamente mas tarde.",
        });
        setIsDeletingDialogOpen(false);
        setIsSubmitting(false);
      }
    } catch (error) {
      toast.error("Algo extraño sucedio", {
        description: "Intentalo nuevamente mas tarde.",
      });
      setIsDeletingDialogOpen(false);
      setIsSubmitting(false);
    }
  }

  const filteredCompanies = companies?.companies
    .filter((company) => {
      if (!searchQuery) return true;
      return company.name.toLowerCase().includes(searchQuery);
    })
    .sort((a, b) => {
      if (sortOrder === "a-z") {
        return a.name.localeCompare(b.name);
      }
      if (sortOrder === "z-a") {
        return b.name.localeCompare(a.name);
      }
      if (sortOrder === "newest") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      if (sortOrder === "oldest") {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      }
      return 0;
    });

  const showNoResults = searchQuery && filteredCompanies?.length === 0;

  return (
    <>
      <PageBreadCrumbs items={[{ label: "Empresas" }]} />
      {companies?.companies.length === 0 ? (
        <CourseEmptyPage
          title="Sin empresas creadas aun"
          description="Crea tu primer empresa para iniciar."
          buttonLabel="Nueva empresa"
          action={showCreateDialog}
        />
      ) : (
        <div className="flex flex-col items-start gap-8 h-full">
          <MembershipsPageToolbar
            isLoading={false}
            hasPublishFilters={false}
            ctaLabel="Nueva empresa"
            ctaAction={showCreateDialog}
          />
          <div className="grid gap-10 w-full sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4">
            {fetching ? (
              Array.from([1, 2, 3, 4, 5, 6, 7, 8], (index) => (
                <ContentCardSkeleton key={index} />
              ))
            ) : showNoResults ? (
              <div className="col-span-full text-center py-8">
                <p className="text-lg text-gray-500">
                  No se encontraron cursos que coincidan con tu búsqueda
                </p>
              </div>
            ) : (
              filteredCompanies?.map((company) => (
                <ContentCard
                  key={company.name}
                  content={{
                    id: company.id,
                    title: company?.name,
                    description: company.email,
                    metadata: [
                      {
                        id: company.address || "",
                        name: company.address || "",
                        label: "Dirección",
                      },
                      {
                        id: company.taxId || "",
                        name: company.taxId || "",
                        label: "RFC",
                      },
                      {
                        id: String(company.isActive) || "",
                        name: company.isActive ? "Activo" : "Inactivo",
                        label: "Estado",
                        isBadge: true,
                        isActive: company.isActive || false,
                      },
                    ],
                    createdAt: company.createdAt,
                    updatedAt: company.updatedAt,
                  }}
                  onEdit={() => {
                    showUpdateDialog();
                    //@ts-ignore
                    setSelectedCompany(company);
                  }}
                  actionsMenu={[
                    {
                      label: "Ver detalles",
                      onClick: () => {
                        showUpdateDialog();
                        //@ts-ignore
                        setSelectedCompany(company);
                      },
                    },
                    {
                      label: "Borrar membresia",
                      className:
                        "text-destructive hover:!text-destructive hover:!bg-destructive/20",
                      onClick: () => {
                        setIsDeletingDialogOpen(true);
                        //@ts-ignore
                        setSelectedCompany(company);
                      },
                    },
                  ]}
                />
              ))
            )}
          </div>
        </div>
      )}

      <UpdateCompanyDialog
        isOpen={isUpdateDialogOpen}
        onClose={() => {
          closeUpdateDialog();
          setSelectedCompany(null);
        }}
        company={selectedCompany}
        refetchCompanies={() =>
          refetchCompanies({ requestPolicy: "network-only" })
        }
      />

      <DeleteResourceDialog
        open={isDeletingDialogOpen}
        onOpenChange={setIsDeletingDialogOpen}
        resourceType="Empresa"
        resourceName={selectedCompany?.name || ""}
        onDelete={() => onDeleteCompany(selectedCompany?.id || "")}
        isLoading={isSubmitting}
      />

      <Drawer
        open={isCreateDialogOpen}
        onOpenChange={(isOpened) => {
          if (!isOpened) {
            closeCreateDialog();
          }
        }}
      >
        <DrawerContent className="sm:p-0 sm:max-w-lg">
          <DrawerHeader containerClassName="sm:p-6 bg-slate-50">
            <DrawerTitle>Crear empresa</DrawerTitle>
            <DrawerDescription className="mt-1 text-sm">
              Create una nueva empresa, rellena todos los datos y haz clic en
              Guardar cambios.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerBody className="px-6">
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              id="createCompanyForm"
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

              {/* <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Controller
                    control={form.control}
                    name="name"
                    render={({ field: { onChange, value } }) => (
                      <>
                        <PriceInput
                          label="Pecio *"
                          onChange={(e) => {
                            onChange(e);
                            setPlanPrice(e);
                            form.setValue("name", parseInt(e));
                          }}
                          value={planPrice}
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

              <div className="space-y-2">
                <Controller
                  control={form.control}
                  name="categoryId"
                  render={({ field: { onChange, value } }) => (
                    <>
                      <Label>Categoria</Label>
                      <Select
                        onValueChange={(e) => {
                          onChange(e);
                          form.setValue("categoryId", e);
                        }}
                        value={value}
                      >
                        <SelectTrigger className="h-auto ps-2 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_img]:shrink-0">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {data?.getCategories.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={category.id}
                              disabled={category.coursesCount === 0}
                            >
                              <span className="flex items-center text-left gap-2">
                                <span>
                                  <span className="block font-medium">
                                    {category.name}
                                  </span>
                                  <span className="text-muted-foreground text-left mt-0.5 block text-xs">
                                    {category.coursesCount
                                      ? `${category.coursesCount} curso${
                                          category.coursesCount > 1 ? "s" : ""
                                        }`
                                      : "sin cursos"}
                                  </span>
                                </span>
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-[0.8rem] text-muted-foreground">
                        Selecciona una categoria si tu membresia sera
                        categorizada.
                      </p>
                    </>
                  )}
                />
              </div> */}
            </form>
          </DrawerBody>
          <DrawerFooter className="mt-6 sm:p-6 sm:justify-between bg-slate-50">
            <DrawerClose asChild>
              <Button
                className="mt-2 w-full sm:mt-0 sm:w-fit"
                variant="neutral"
              >
                Cancelar
              </Button>
            </DrawerClose>
            <Button
              className="w-full sm:w-fit"
              type="submit"
              form="createCompanyForm"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  Creando membresia...
                </>
              ) : (
                "Crear membresia"
              )}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
