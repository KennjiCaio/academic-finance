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

const studentBaseSchema = z.object({
  id: z.number(),
  name: z.string(),
  lastname: z.string(),
  email: z.string().email(),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string())
});

export const studentOutputSchema = studentBaseSchema.transform((data) => ({
  id: data.id,
  name: data.name,
  last_name: data.lastname,
  email: data.email,
  created_at: data.createdAt,
  updated_at: data.updatedAt
}));

export type UpdateStudentInput = z.infer<typeof updateStudentSchema>;
export type StudentOutput = z.infer<typeof studentOutputSchema>;