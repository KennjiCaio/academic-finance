import { PrismaClient } from '@prisma/client';
import { CreateSimulationInput, SimulationOutput, simulationOutputSchema, SimulationsListOutput, simulationsListOutputSchema } from './simulations.schema';

const prisma = new PrismaClient();

const calculateMonthlyPayment = (
  totalAmount: number, 
  interestPerMonth: number, 
  totalInstallments: number
): number => {
  const numerator = totalAmount * interestPerMonth;
  const denominator = 1 - Math.pow(1 + interestPerMonth, -totalInstallments);
  return parseFloat((numerator / denominator).toFixed(2));
};

export const createSimulation = async (
  studentId: number, 
  input: CreateSimulationInput
):Promise<SimulationOutput> => {
  const monthlyPayment = calculateMonthlyPayment(
    input.total_amount,
    input.interest_per_month,
    input.total_installments
  );

  const result = await prisma.simulation.create({
    data: {
      studentId,
      totalAmount: input.total_amount,
      totalInstallments: input.total_installments,
      interestPerMonth: input.interest_per_month,
      monthlyPayment
    },
    select: {
      id: true,
      totalAmount: true,
      totalInstallments: true,
      interestPerMonth: true,
      monthlyPayment: true,
      createdAt: true
    }
  });

  return simulationOutputSchema.parse(result);
};

export const getStudentSimulations = async (
  studentId: number
): Promise<SimulationsListOutput> => {  
  const simulations = await prisma.simulation.findMany({
    where: { studentId },
    select: {
      id: true,
      totalAmount: true,
      totalInstallments: true,
      interestPerMonth: true,
      monthlyPayment: true,
      createdAt: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return simulationsListOutputSchema.parse(simulations);
};