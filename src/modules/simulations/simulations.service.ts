import { PrismaClient } from '@prisma/client';
import { CreateSimulationInput } from './simulations.schema';

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
) => {
  const monthlyPayment = calculateMonthlyPayment(
    input.total_amount,
    input.interest_per_month,
    input.total_installments
  );

  return prisma.simulation.create({
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
};

export const getStudentSimulations = async (studentId: number) => {
  return prisma.simulation.findMany({
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
};