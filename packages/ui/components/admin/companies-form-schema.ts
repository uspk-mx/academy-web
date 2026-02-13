import { z } from "zod";

export const companyFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El nombre de la compañia es requerido." }),
  email: z.string().email({ message: "El correo no es valido." }),
  address: z.string().optional(),
  taxId: z.string().optional(),
  taxName: z.string().optional(),
  isActive: z.boolean().optional(),
});

export type CompanyFormSchemaType = z.infer<typeof companyFormSchema>;
