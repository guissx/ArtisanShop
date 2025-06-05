import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  password: z
    .string()
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .regex(/[A-Z]/, "Senha deve conter uma letra maiúscula")
    .regex(/[a-z]/, "Senha deve conter uma letra minúscula"),
});

export const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Email inválido").optional(),
  password: z
    .string()
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .regex(/[A-Z]/, "Senha deve conter uma letra maiúscula")
    .regex(/[a-z]/, "Senha deve conter uma letra minúscula")
    .optional(),
});
