import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import { toast } from "sonner";
import { useMutation, useQuery } from "urql";
import { DeleteResourceDialog } from "ui/components/admin/delete-resource-modal";
import {
  memberShipFormSchema,
  type MembershipFormSchemaType,
} from "ui/components/admin/memberships/form-schema";
import {
  MembershipCard,
  type MembershipType,
} from "ui/components/admin/memberships/membership-card";
import { MembershipCardSkeleton } from "ui/components/admin/memberships/membership-card-skeleton";
import { UpdateMembershipDialog } from "ui/components/admin/memberships/update-membership-dialog";
import { PageBreadCrumbs } from "ui/components/admin/page-breadcrumbs";
import { CourseEmptyPage } from "ui/components/courses/course-empty-page";
import { CoursesPageToolbar as MembershipsPageToolbar } from "ui/components/courses/course-page-toolbar";
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "ui/components/index";
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
import { PriceInput } from "ui/components/price-input";
import {
  CreateSubscriptionPlanDocument,
  DeleteSubscriptionPlanDocument,
  GetCategoriesDocument,
  SubscriptionPlansDocument,
} from "gql-generated/generated/bff.sdk";
import type {
  CreateSubscriptionPlanMutation,
  CreateSubscriptionPlanMutationVariables,
  DeleteSubscriptionPlanMutation,
  DeleteSubscriptionPlanMutationVariables,
  GetCategoriesQuery,
  GetCategoriesQueryVariables,
  SubscriptionPlansQuery,
  SubscriptionPlansQueryVariables,
} from "gql-generated/generated/types";
import { useToggleState } from "ui/hooks/use-toggle-state";

export default function MembershipsPage() {
  const [isCreateDialogOpen, showCreateDialog, closeCreateDialog] =
    useToggleState();
  const [isUpdateDialogOpen, showUpdateDialog, closeUpdateDialog] =
    useToggleState(false);

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || undefined;
  const sortOrder = searchParams.get("sort") || undefined;

  const [isDeletingDialogOpen, setIsDeletingDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedMembership, setSelectedMembership] =
    useState<MembershipType | null>(null);
  const [planPrice, setPlanPrice] = useState("");

  const [{}, createSubscriptionMutation] = useMutation<
    CreateSubscriptionPlanMutation,
    CreateSubscriptionPlanMutationVariables
  >(CreateSubscriptionPlanDocument);

  const [{}, deleteMembershipMutation] = useMutation<
    DeleteSubscriptionPlanMutation,
    DeleteSubscriptionPlanMutationVariables
  >(DeleteSubscriptionPlanDocument);

  const [{ data }] = useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>({
    query: GetCategoriesDocument,
  });

  const [
    { data: memberships, fetching: fetchingMemberships },
    refetchSubscriptionPlans,
  ] = useQuery<SubscriptionPlansQuery, SubscriptionPlansQueryVariables>({
    query: SubscriptionPlansDocument,
  });

  const [membershipPlans, setMembershipPlans] = useState<
    SubscriptionPlansQuery | undefined
  >(memberships);

  useEffect(() => {
    setMembershipPlans(memberships);
    return () => setMembershipPlans(undefined);
  }, [memberships]);

  // Initialize form with react-hook-form and zod validation
  const form = useForm<MembershipFormSchemaType>({
    resolver: zodResolver(memberShipFormSchema),
    defaultValues: {
      planName: "",
      planDescription: "",
      price: undefined,
      duration: undefined,
      categoryId: undefined,
    },
  });

  async function onSubmit(values: MembershipFormSchemaType) {
    setIsSubmitting(true);

    // Prepare the input with the correct types
    const input = {
      planName: values.planName,
      planDescription: values.planDescription,
      price: Number(values.price.toString()),
      duration: Number(values.duration.toString()),
      categoryId: values.categoryId,
    };

    try {
      const response = await createSubscriptionMutation({ input });
      if (response.error) {
        toast.error("Ocurrió un error", {
          description:
            response.error.message ||
            "Ocurrió un error al crear la membresía, inténtalo nuevamente más tarde.",
        });
      } else if (response.data?.createSubscriptionPlan) {
        toast.success("La membresía se creó correctamente", {
          description: `Se creó correctamente la membresía: ${response.data.createSubscriptionPlan.planName}`,
        });

        form.reset();
        setPlanPrice("");
        closeCreateDialog();
        const newMemberships = [
          ...(membershipPlans?.subscriptionPlans || []),
          response.data.createSubscriptionPlan,
        ];
        //@ts-ignore
        setMembershipPlans({ subscriptionPlans: newMemberships });
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

  async function onDeleteMembership(id: string) {
    try {
      setIsSubmitting(true);
      const response = await deleteMembershipMutation({ id });
      if (response.data?.deleteSubscriptionPlan) {
        toast.success("Se borro correctamente la membresia");
        setIsDeletingDialogOpen(false);
        setIsSubmitting(false);
        const updatedMemberships = membershipPlans?.subscriptionPlans.filter(
          (item) => item.id !== selectedMembership?.id
        );
        setMembershipPlans({ subscriptionPlans: updatedMemberships || [] });
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

  const filteredMemberships = membershipPlans?.subscriptionPlans
    .filter((membership) => {
      if (!searchQuery) return true;
      return membership.planName.toLowerCase().includes(searchQuery);
    })
    .sort((a, b) => {
      if (sortOrder === "a-z") {
        return a.planName.localeCompare(b.planName);
      }
      if (sortOrder === "z-a") {
        return b.planName.localeCompare(a.planName);
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

  const showNoResults = searchQuery && filteredMemberships?.length === 0;

  return (
    <>
      <PageBreadCrumbs items={[{ label: "Membresias" }]} />
      {membershipPlans?.subscriptionPlans.length === 0 ? (
        <CourseEmptyPage
          title="Sin membresias creadas aun"
          description="Crea tu primer membresia para iniciar."
          buttonLabel="Nueva membresia"
          action={showCreateDialog}
        />
      ) : (
        <div className="flex flex-col items-start gap-8 h-full">
          <MembershipsPageToolbar
            isLoading={false}
            hasPublishFilters={false}
            ctaLabel="Nueva membresia"
            ctaAction={showCreateDialog}
          />
          <div className="grid gap-10 w-full sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4">
            {fetchingMemberships ? (
              Array.from([1, 2, 3, 4, 5, 6, 7, 8], (index) => (
                <MembershipCardSkeleton />
              ))
            ) : showNoResults ? (
              <div className="col-span-full text-center py-8">
                <p className="text-lg text-gray-500">
                  No se encontraron cursos que coincidan con tu búsqueda
                </p>
              </div>
            ) : (
              filteredMemberships?.map((membership) => (
                <MembershipCard
                  key={membership.id}
                  membership={membership}
                  onEdit={() => {
                    showUpdateDialog();
                    setSelectedMembership(membership);
                  }}
                  actionsMenu={[
                    {
                      label: "Ver detalles",
                      onClick: () => {
                        showUpdateDialog();
                        setSelectedMembership(membership);
                      },
                    },
                    {
                      label: "Borrar membresia",
                      className:
                        "text-destructive hover:!text-destructive hover:!bg-destructive/20",
                      onClick: () => {
                        setIsDeletingDialogOpen(true);
                        setSelectedMembership(membership);
                      },
                    },
                  ]}
                />
              ))
            )}
          </div>
        </div>
      )}

      <UpdateMembershipDialog
        isOpen={isUpdateDialogOpen}
        onClose={() => {
          closeUpdateDialog();
          setSelectedMembership(null);
        }}
        membership={selectedMembership}
        refetchMemberships={() =>
          refetchSubscriptionPlans({ requestPolicy: "network-only" })
        }
      />

      <DeleteResourceDialog
        open={isDeletingDialogOpen}
        onOpenChange={setIsDeletingDialogOpen}
        resourceType="Membresia"
        resourceName={selectedMembership?.planName || ""}
        onDelete={() => onDeleteMembership(selectedMembership?.id || "")}
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
            <DrawerTitle>Crear membresia</DrawerTitle>
            <DrawerDescription className="mt-1 text-sm">
              Create una nueva membresia, rellena todos los datos y haz clic en
              Guardar cambios.
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
              </div>
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
              form="createMembershipForm"
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
