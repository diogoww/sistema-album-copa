import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .max(128)
    .regex(/[A-Z]/, "Senha precisa de letra maiuscula")
    .regex(/[a-z]/, "Senha precisa de letra minuscula")
    .regex(/[0-9]/, "Senha precisa de numero")
    .regex(/[^A-Za-z0-9]/, "Senha precisa de simbolo")
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128)
});

export const stickerQuerySchema = z.object({
  q: z.string().optional(),
  team: z.string().optional(),
  category: z.string().optional(),
  status: z.enum(["owned", "missing", "duplicate"]).optional(),
  page: z.coerce.number().int().min(1).optional(),
  take: z.coerce.number().int().min(10).max(100).optional(),
  skip: z.coerce.number().int().min(0).optional()
});

export const collectionUpdateSchema = z.object({
  stickerId: z.string().min(1),
  owned: z.boolean(),
  duplicates: z.number().int().min(0).max(99)
});
