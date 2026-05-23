import { CheckIcon, ImagePlusIcon, LoaderCircleIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useMutation, useQuery } from "urql";
import { MeDocument, UpdateCompanyDocument } from "gql-generated/generated/bff.sdk";
import type {
  MeQuery,
  MeQueryVariables,
  UpdateCompanyMutation,
  UpdateCompanyMutationVariables,
} from "gql-generated/generated/types";
import { PageBreadCrumbs } from "ui/components/admin/page-breadcrumbs";
import { Button } from "ui/components/button";
import { Input } from "ui/components/input";
import { Label } from "ui/components/label";
import { Textarea } from "ui/components/textarea";
import { useImageUpload } from "ui/hooks/use-image-upload";
import { uploadFileToCloudinary } from "ui/lib/cloudinary";

function ImageUploadField({
  label,
  description,
  currentImage,
  aspectClass,
  onRemove,
  onClickUpload,
  fileInputRef,
  onFileChange,
}: {
  label: string;
  description: string;
  currentImage: string | null;
  aspectClass: string;
  onRemove: () => void;
  onClickUpload: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="space-y-2">
      <Label className="block text-sm font-medium">{label}</Label>
      <p className="text-xs text-muted-foreground">{description}</p>
      {currentImage ? (
        <div className={`relative rounded-lg border-2 overflow-hidden ${aspectClass}`}>
          <img
            src={currentImage}
            alt={label}
            className="w-full h-full object-contain bg-muted/30"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8"
            onClick={onRemove}
          >
            <XIcon className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <button
          type="button"
          onClick={onClickUpload}
          className={`flex flex-col items-center justify-center gap-2 w-full ${aspectClass} rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors bg-muted/50`}
        >
          <ImagePlusIcon className="w-8 h-8 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Subir imagen</span>
        </button>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileChange}
        className="hidden"
        accept="image/*"
      />
    </div>
  );
}

export function CompanyProfile() {
  const [{ data, fetching }] = useQuery<MeQuery, MeQueryVariables>({
    query: MeDocument,
    requestPolicy: "cache-and-network",
  });

  const [, updateCompany] = useMutation<
    UpdateCompanyMutation,
    UpdateCompanyMutationVariables
  >(UpdateCompanyDocument);

  const company = data?.me?.company;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [taxId, setTaxId] = useState("");
  const [taxName, setTaxName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Logo upload
  const [logoRemoved, setLogoRemoved] = useState(false);
  const {
    file: logoFile,
    previewUrl: logoPreview,
    fileInputRef: logoInputRef,
    handleThumbnailClick: handleLogoClick,
    handleFileChange: handleLogoChange,
    handleRemove: originalLogoRemove,
  } = useImageUpload();

  const handleLogoRemove = () => {
    originalLogoRemove();
    setLogoRemoved(true);
  };

  // Icon upload
  const [iconRemoved, setIconRemoved] = useState(false);
  const {
    file: iconFile,
    previewUrl: iconPreview,
    fileInputRef: iconInputRef,
    handleThumbnailClick: handleIconClick,
    handleFileChange: handleIconChange,
    handleRemove: originalIconRemove,
  } = useImageUpload();

  const handleIconRemove = () => {
    originalIconRemove();
    setIconRemoved(true);
  };

  useEffect(() => {
    if (company) {
      setName(company.name ?? "");
      setEmail(company.email ?? "");
      setAddress(company.address ?? "");
      setTaxId(company.taxId ?? "");
      setTaxName(company.taxName ?? "");
      setLogoRemoved(false);
      setIconRemoved(false);
    }
  }, [company]);

  const currentLogo = logoPreview || (!logoRemoved ? company?.logo : null) || null;
  const currentIcon = iconPreview || (!iconRemoved ? company?.icon : null) || null;

  const handleSave = async () => {
    if (!company?.id) return;

    if (!name.trim()) {
      toast.error("El nombre de la empresa es requerido");
      return;
    }
    if (!email.trim()) {
      toast.error("El email de la empresa es requerido");
      return;
    }

    setIsSaving(true);

    try {
      let logoUrl: string | null | undefined;
      if (logoFile) {
        logoUrl = await uploadFileToCloudinary(logoFile, "image");
      } else if (logoRemoved) {
        logoUrl = "";
      }

      let iconUrl: string | null | undefined;
      if (iconFile) {
        iconUrl = await uploadFileToCloudinary(iconFile, "image");
      } else if (iconRemoved) {
        iconUrl = "";
      }

      const result = await updateCompany({
        companyId: company.id,
        input: {
          name: name.trim(),
          email: email.trim(),
          address: address.trim() || null,
          taxId: taxId.trim() || null,
          taxName: taxName.trim() || null,
          ...(logoUrl !== undefined && { logo: logoUrl }),
          ...(iconUrl !== undefined && { icon: iconUrl }),
        },
      });

      if (result.error) {
        toast.error("Error al actualizar la empresa", {
          description: result.error.message,
        });
      } else {
        toast.success("Empresa actualizada correctamente");
      }
    } catch (error) {
      toast.error("Ocurrio un error inesperado");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (company) {
      setName(company.name ?? "");
      setEmail(company.email ?? "");
      setAddress(company.address ?? "");
      setTaxId(company.taxId ?? "");
      setTaxName(company.taxName ?? "");
      originalLogoRemove();
      originalIconRemove();
      setLogoRemoved(false);
      setIconRemoved(false);
    }
  };

  if (fetching && !company) {
    return (
      <div className="p-8">
        <PageBreadCrumbs
          items={[
            { href: "/settings", label: "Ajustes" },
            { label: "Perfil de la Empresa" },
          ]}
        />
        <div className="animate-pulse space-y-6 max-w-3xl mt-8">
          <div className="h-8 bg-muted rounded w-1/3" />
          <div className="h-40 bg-muted rounded" />
          <div className="h-40 bg-muted rounded" />
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="p-8">
        <PageBreadCrumbs
          items={[
            { href: "/settings", label: "Ajustes" },
            { label: "Perfil de la Empresa" },
          ]}
        />
        <div className="text-center py-16">
          <p className="text-muted-foreground">
            No se encontro informacion de la empresa.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <PageBreadCrumbs
        items={[
          { href: "/settings", label: "Ajustes" },
          { label: "Perfil de la Empresa" },
        ]}
      />
      <h1 className="text-3xl font-bold mb-8">Perfil de la Empresa</h1>

      <div className="max-w-3xl">
        <div className="bg-white border-2 border-border rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold mb-6">Informacion General</h2>

          <div className="space-y-4">
            <div>
              <Label className="block text-sm font-medium mb-2">
                Nombre de la Empresa
              </Label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre de la empresa"
              />
            </div>

            <div>
              <Label className="block text-sm font-medium mb-2">
                Email de la Empresa
              </Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contacto@empresa.com"
              />
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-border rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold mb-6">Branding</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImageUploadField
              label="Logo"
              description="Logo principal de la empresa. Se usara en reportes, certificados y facturas."
              currentImage={currentLogo}
              aspectClass="aspect-video"
              onRemove={handleLogoRemove}
              onClickUpload={handleLogoClick}
              fileInputRef={logoInputRef}
              onFileChange={handleLogoChange}
            />

            <ImageUploadField
              label="Icono"
              description="Icono cuadrado para el sidebar y notificaciones."
              currentImage={currentIcon}
              aspectClass="aspect-square max-w-[160px]"
              onRemove={handleIconRemove}
              onClickUpload={handleIconClick}
              fileInputRef={iconInputRef}
              onFileChange={handleIconChange}
            />
          </div>
        </div>

        <div className="bg-white border-2 border-border rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold mb-6">Direccion</h2>

          <div className="space-y-4">
            <div>
              <Label className="block text-sm font-medium mb-2">
                Direccion
              </Label>
              <Textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Calle, numero, colonia, ciudad, estado, CP"
                maxRows={3}
              />
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-border rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold mb-6">Datos Fiscales</h2>

          <div className="space-y-4">
            <div>
              <Label className="block text-sm font-medium mb-2">
                Razon Social
              </Label>
              <Input
                type="text"
                value={taxName}
                onChange={(e) => setTaxName(e.target.value)}
                placeholder="Razon social de la empresa"
              />
            </div>

            <div>
              <Label className="block text-sm font-medium mb-2">RFC</Label>
              <Input
                type="text"
                value={taxId}
                onChange={(e) => setTaxId(e.target.value)}
                placeholder="RFC de la empresa"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="neutral" onClick={handleCancel} disabled={isSaving}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <LoaderCircleIcon
                  className="-ms-1 animate-spin"
                  size={16}
                  aria-hidden="true"
                />
                Guardando...
              </>
            ) : (
              <>
                <CheckIcon size={18} />
                Guardar Cambios
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
