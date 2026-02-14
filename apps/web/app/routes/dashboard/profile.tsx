import type React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import type {
  UpdateUserProfileMutation,
  UpdateUserProfileMutationVariables
} from "gql-generated/gql/graphql";
import { ArrowLeftIcon, Camera, Check, Edit, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { toast } from "sonner";
import { Button } from "ui/components/button";
import { useMutation } from "urql";
import type { z } from "zod";
import { PageLoader } from "ui/components/admin";
import { Skeleton } from "ui/components/skeleton";
import { Header } from "ui/components/dashboard/header";
import {
  type EditProfileFormSchema,
  editProfileFormSchema,
} from "ui/components/dashboard/profile/edit-profile-form-schema";
import { useCustomerContextProvider } from "ui/context";
import { UpdateUserProfileDocument } from "gql-generated/gql/graphql";
import { cn } from "ui/lib/utils";
import { Input } from 'ui/components/input';

export default function ProfilePage() {
  const {customerData: userData } = useCustomerContextProvider()
  const [interests, setInterests] = useState(userData?.interests);
  const [proflePicture, setProflePicture] = useState(userData?.profilePicture);
  const [imagePreview, setImagePreview] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isImageModified, setIsImageModified] = useState(false);
  const imageUploadRef = useRef<HTMLInputElement | null>(null);
  const [, updateProfileMutation] = useMutation<
    UpdateUserProfileMutation,
    UpdateUserProfileMutationVariables
  >(UpdateUserProfileDocument);

  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newInterest, setNewInterest] = useState("");

  const { register, reset, handleSubmit, setValue } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(
      editProfileFormSchema
    ),
    defaultValues: {
      email: userData?.email,
      fullName: userData?.fullName,
      userName: userData?.userName,
      phoneNumber: userData?.phoneNumber || "",
      interests: interests?.map((i) => i ?? undefined) || [],
      major: userData?.major || "",
      occupation: userData?.occupation || "",
      profilePicture: proflePicture || "",
    },
  });

  useEffect(() => {
    if (userData) {
      setInterests(userData.interests);
      setProflePicture(userData.profilePicture);
      reset({
        email: userData.email,
        fullName: userData.fullName,
        userName: userData.userName,
        phoneNumber: userData.phoneNumber || "",
        interests: userData.interests?.map((i) => i ?? undefined) || [],
        major: userData.major || "",
        occupation: userData.occupation || "",
        profilePicture: userData.profilePicture || "",
      });
    }
  }, [userData, reset]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;

    if (selectedFile) {
      setImage(selectedFile);
      setIsImageModified(true);

      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    } else {
      setImage(null);
      setImagePreview("");
    }
  };

  const handleUploadImage = async () => {
    if (!image) {
      console.error("No image selected for upload.");
      setIsUploadingImage(false);
      return;
    }

    setIsUploadingImage(true);
    setIsImageModified(true);
    try {
      const uploadImage = async () => {
        const formData = new FormData();
        formData.append("file", image as File);
        formData.append("folder", "attachments");

        const response = await fetch(
          `${import.meta.env.VITE_API_TARGET}/api/files/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(`Failed to upload ${image?.name}`);
        }

        return result;
      };

      const result = await uploadImage();
      setProflePicture(result.url);

      setImage(null);
      return result;
    } catch (error) {
      return [];
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleAddInterest = () => {
    if (newInterest.trim()) {
      setInterests((prev) =>
        prev ? [...prev, newInterest.trim()] : [newInterest.trim()]
      );
      setNewInterest("");
      setValue("interests", [
        ...(interests?.filter((i): i is string => i !== null) || []),
        newInterest.trim(),
      ]);
    }
  };

  const handleRemoveInterest = (index: number) => {
    setInterests((prev) => (prev ? prev.filter((_, i) => i !== index) : []));
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async (formValues: EditProfileFormSchema) => {
    try {
      let image = "";
      if (isImageModified) {
        const result = await handleUploadImage();
        image = result.url;
      }

      const response = await updateProfileMutation({
        input: {
          ...formValues,
          profilePicture: isImageModified ? image : proflePicture,
        },
      });
      if (response.error?.message) {
        toast.error("Algo salio mal", {
          description: "Intentalo nuevamente mas tarde.",
        });
        console.error(response.error?.message);
      }
      toast.success("Perfil actualizado correctamente.");
      setIsEditing(false);
    } catch (error) {
      toast.error("Algo salio mal, intentalo nuevamente");
    }
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
    setInterests([]);
  };

  return (
    <div className="min-h-screen bg-[#FDFAEE]">
      <Header userData={userData} />
      <div className="mx-auto max-w-7xl p-6 2xl:px-0">
        {/* Header with back button */}
        <div className="mb-8 flex items-center justify-between">
          <Button type="button" variant="noShadow" asChild>
            <Link to="/" className="group relative inline-block">
              <ArrowLeftIcon />
              Regresar al dashboard
            </Link>
          </Button>

          <Button
            type="button"
            onClick={isEditing ? handleSubmit(handleSave) : toggleEditMode}
            variant={!isEditing ? "noShadowNeutral" : "neutral"}
          >
            {isEditing ? (
              <>
                <Check className="h-5 w-5" />
                Save Changes
              </>
            ) : (
              <>
                <Edit className="h-5 w-5" />
                Editar Perfil
              </>
            )}
          </Button>
        </div>

        {/* Main content */}
        {!userData ? (
          <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
            {/* Left column skeleton */}
            <div className="space-y-6">
              <div className="relative mx-auto w-full max-w-xs">
                <div className="relative rounded-xl border-4 border-black bg-white p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <Skeleton className="mb-4 aspect-square w-full rounded-lg border-4 border-black" />
                  <div className="flex flex-col items-center gap-2">
                    <Skeleton className="h-7 w-40" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="mt-2 h-7 w-20 rounded-full" />
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative rounded-xl border-4 border-black bg-white p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <Skeleton className="mb-3 h-5 w-52" />
                  <div className="space-y-2">
                    <div>
                      <Skeleton className="mb-1 h-3 w-24" />
                      <Skeleton className="h-5 w-48" />
                    </div>
                    <div>
                      <Skeleton className="mb-1 h-3 w-36" />
                      <Skeleton className="h-5 w-48" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column skeleton */}
            <div className="relative">
              <div className="relative rounded-xl border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <Skeleton className="mb-6 h-9 w-36" />

                <div className="grid gap-6">
                  <div>
                    <Skeleton className="mb-4 h-7 w-48" />
                    <div className="grid gap-4 md:grid-cols-2">
                      {Array.from({ length: 3 }).map((_, i) => (
                        // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
                        <div key={i}>
                          <Skeleton className="mb-1 h-5 w-32" />
                          <Skeleton className="h-10 w-full rounded-lg" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Skeleton className="mb-4 h-7 w-52" />
                    <div className="grid gap-4 md:grid-cols-2">
                      {Array.from({ length: 3 }).map((_, i) => (
                        // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
                        <div key={i}>
                          <Skeleton className="mb-1 h-5 w-32" />
                          <Skeleton className="h-10 w-full rounded-lg" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Skeleton className="mb-4 h-7 w-28" />
                    <div className="flex flex-wrap gap-2">
                      {Array.from({ length: 4 }).map((_, i) => (
                        // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
                        <Skeleton key={i} className="h-8 w-20 rounded-full" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
            {/* Left column - Profile picture */}
            <div className="space-y-6">
              <div className="relative mx-auto w-full max-w-xs">
                <div className="relative rounded-xl border-4 border-black bg-white p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-lg border-4 border-black">
                    <img
                      src={
                        imagePreview
                          ? imagePreview
                          : userData?.profilePicture || ""
                      }
                      alt={userData?.fullName}
                      className="object-cover size-full"
                    />

                    {isEditing && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        {isUploadingImage ? (
                          <PageLoader />
                        ) : (
                          <>
                            <label
                              htmlFor="profile-upload"
                              className="flex cursor-pointer flex-col items-center justify-center gap-2 text-white"
                            >
                              <Camera className="h-8 w-8" />
                              <span className="text-sm font-bold">
                                Update Photo
                              </span>
                            </label>
                            <input
                              id="profile-upload"
                              type="file"
                              className="hidden"
                              ref={imageUploadRef}
                              accept="image/jpeg,image/png,image/gif,image/webp"
                              onChange={handleImageChange}
                            />
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="text-center">
                    <h2 className="text-2xl font-black">
                      {userData?.fullName}
                    </h2>
                    <p className="text-sm font-bold text-gray-600">
                      @{userData?.userName}
                    </p>

                    <div className="mt-2 inline-flex items-center gap-2 rounded-full border-2 border-black bg-[#54CA95] px-3 py-1">
                      <span className="h-2 w-2 rounded-full bg-black" />
                      <span className="text-sm font-bold">
                        {userData?.isActive ? "Activo" : "Inactivo"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Registration info */}
              <div className="relative">
                <div className="relative rounded-xl border-4 border-black bg-white p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="mb-3 font-black">INFORMACION DE LA CUENTA</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs font-bold text-gray-500">
                        REGISTRADO EL
                      </p>
                      <p className="font-bold">
                        {new Intl.DateTimeFormat("es-MX", {
                          dateStyle: "full",
                          timeStyle: "short",
                          timeZone: "America/Mexico_City",
                        }).format(new Date(userData?.createdAt ?? ""))}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500">
                        ULTIMA ACTUALIZACION
                      </p>
                      <p className="font-bold">
                        {userData?.updatedAt
                          ? new Intl.DateTimeFormat("es-MX", {
                              dateStyle: "full",
                              timeStyle: "short",
                              timeZone: "America/Mexico_City",
                            }).format(new Date(userData?.updatedAt))
                          : "Sin actualizar"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - Profile details */}
            <div className="relative">
              <div className="relative rounded-xl border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h1 className="mb-6 text-3xl font-black">Mi Perfil</h1>

                <div className="grid gap-6">
                  {/* Personal Information */}
                  <div>
                    <h2 className="mb-4 inline-block border-b-4 border-[#FF3D5A] text-xl font-black">
                      Informacion Personal
                    </h2>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label htmlFor="fullName" className="block font-bold">
                          Nombre Completo
                        </label>
                        <Input
                          type="text"
                          {...register("fullName")}
                          disabled={!isEditing}
                          className={cn(
                            "rounded-lg border-4 border-black p-2 font-bold",
                            {
                              "disabled:bg-[#FDFAEE] disabled:opacity-100":
                                !isEditing,
                            }
                          )}
                        />
                      </div>

                      <div>
                        <label htmlFor="userName" className="block font-bold">
                          Usuario
                        </label>
                        <Input
                          type="text"
                          {...register("userName")}
                          disabled={!isEditing}
                          className={cn(
                            "rounded-lg border-4 border-black p-2 font-bold",
                            {
                              "disabled:bg-[#FDFAEE] disabled:opacity-100":
                                !isEditing,
                            }
                          )}
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block font-bold">
                          Correo electronico
                        </label>
                        <Input
                          type="email"
                          {...register("email")}
                          disabled={!isEditing}
                          className={cn(
                            "rounded-lg border-4 border-black p-2 font-bold",
                            {
                              "disabled:bg-[#FDFAEE] disabled:opacity-100":
                                !isEditing,
                            }
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Professional Information */}
                  <div>
                    <h2 className="mb-4 inline-block border-b-4 border-[#FFD53D] text-xl font-black">
                      Informacion Profesional
                    </h2>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label htmlFor="occupation" className="block font-bold">
                          Occupation
                        </label>
                        <Input
                          type="text"
                          {...register("occupation")}
                          disabled={!isEditing}
                          className={cn(
                            "rounded-lg border-4 border-black p-2 font-bold",
                            {
                              "disabled:bg-[#FDFAEE] disabled:opacity-100":
                                !isEditing,
                            }
                          )}
                        />
                      </div>

                      <div>
                        <label htmlFor="major" className="block font-bold">
                          Major
                        </label>

                        <Input
                          type="text"
                          {...register("major")}
                          disabled={!isEditing}
                          className={cn(
                            "rounded-lg border-4 border-black p-2 font-bold",
                            {
                              "disabled:bg-[#FDFAEE] disabled:opacity-100":
                                !isEditing,
                            }
                          )}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="phoneNumber"
                          className="block font-bold"
                        >
                          Phone Number
                        </label>

                        <Input
                          type="tel"
                          {...register("phoneNumber")}
                          disabled={!isEditing}
                          className={cn(
                            "rounded-lg border-4 border-black p-2 font-bold",
                            {
                              "disabled:bg-[#FDFAEE] disabled:opacity-100":
                                !isEditing,
                            }
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Interests */}
                  <div>
                    <h2 className="mb-4 inline-block border-b-4 border-[#54CA95] text-xl font-black">
                      Intereses
                    </h2>

                    <div className="mb-4 flex flex-wrap gap-2">
                      {interests && interests?.length > 0 ? (
                        interests.map((interest, index) => (
                          <div
                            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                            key={index}
                            className="flex items-center gap-2 rounded-full border-2 border-black bg-[#FFD53D] px-3 py-1"
                          >
                            <span className="font-bold">{interest}</span>
                            {isEditing && (
                              <button
                                type="button"
                                onClick={() => handleRemoveInterest(index)}
                                className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            )}
                          </div>
                        ))
                      ) : (
                        <p>Sin intereses agregados</p>
                      )}
                    </div>

                    {isEditing && (
                      <div className="flex gap-2">
                        <Input
                          type="text"
                          value={newInterest}
                          onChange={(e) => setNewInterest(e.target.value)}
                          placeholder="Agrega un nuevo interes"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddInterest();
                            }
                          }}
                        />
                        <Button type="button" onClick={handleAddInterest}>
                          Agregar
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action buttons for edit mode */}
                {isEditing && (
                  <div className="mt-6 flex justify-end gap-4">
                    <Button
                      type="button"
                      onClick={handleCancel}
                      variant="neutral"
                    >
                      Cancelar
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
