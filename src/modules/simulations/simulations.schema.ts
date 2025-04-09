import { z } from 'zod';

export const createSimulationSchema = z.object({
  total_amount: z.number().positive(),
  total_installments: z.number().int().min(1),
  interest_per_month: z.number().positive()
});

export type CreateSimulationInput = z.infer<typeof createSimulationSchema>;