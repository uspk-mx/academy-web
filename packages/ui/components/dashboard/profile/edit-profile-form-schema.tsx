import { z } from "zod";

export const editProfileFormSchema = z.object({
  fullName: z
    .string()
    .min(1, { message: "Tu nombre completo es un campo requerido." }),
  userName: z.string().min(1, { message: "Tu usuario es un campo requerido." }),
  email: z
    .email({ error: "Al parecer ingresaste un correo electronico invalido." })
    .min(1, { message: "Tu correo electronico es un campo requerido." }),
  occupation: z.string().optional(),
  major: z.string().optional(),
  phoneNumber: z.string().optional(),
  interests: z.array(z.string()).nullable().optional(),
  profilePicture: z.string().optional()
});

export type EditProfileFormSchema = z.infer<typeof editProfileFormSchema>;
