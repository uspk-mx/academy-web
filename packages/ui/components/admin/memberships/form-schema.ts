import { z } from "zod";

export const memberShipFormSchema = z.object({
  planName: z
    .string()
    .min(1, { message: "El nombre de la membresia es requerido." }),
  planDescription: z.string().optional(),
  price: z.coerce
    .number({
      error: "El precio campo es un campo requerido.",
      // message: "Se esperaba un numero se recibio un campo vacio.",
    })
    .positive({ message: "El precio debe de ser un numero positivo" }),
  duration: z.coerce
    .number({
      error: "La duracion campo es un campo requerido.",
      // message: "Se esperaba un numero se recibio un campo vacio.",
    })
    .int()
    .positive({ message: "La duracion debe de ser un numero positivo" }),
  categoryId: z.string().optional(),
});

export type MembershipFormSchemaType = z.infer<typeof memberShipFormSchema>;
