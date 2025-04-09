import { z } from 'zod';

export const createSimulationSchema = z.object({
  total_amount: z.number().positive(),
  total_installments: z.number().int().min(1),
  interest_per_month: z.number().positive()
});

const simulationBaseSchema = z.object({
  id: z.number(),
  totalAmount: z.number(),
  totalInstallments: z.number(),
  interestPerMonth: z.number(),
  monthlyPayment: z.number(),
  createdAt: z.date().or(z.string()),
  studentId: z.number().optional()
});

export const simulationOutputSchema = simulationBaseSchema.transform((data) => ({
  id: data.id,
  total_amount: data.totalAmount,
  total_installments: data.totalInstallments,
  interest_per_month: data.interestPerMonth,
  monthly_payment: data.monthlyPayment,
  created_at: data.createdAt,
  student_id: data.studentId
}));

export type CreateSimulationInput = z.infer<typeof createSimulationSchema>;
export type SimulationOutput = z.infer<typeof simulationOutputSchema>;

export const simulationsListOutputSchema = z.array(simulationOutputSchema);
export type SimulationsListOutput = z.infer<typeof simulationsListOutputSchema>;