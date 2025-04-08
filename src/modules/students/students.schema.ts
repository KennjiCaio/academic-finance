import { z } from "zod";

export const getStudentSchema = z.object({
  id: z.string().regex(/^\d+$/, "ID deve ser um número")
});

export const updateStudentSchema = z.object({
  name: z.string().min(3).optional(),
  lastname: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional()
});

export type UpdateStudentInput = z.infer<typeof updateStudentSchema>;