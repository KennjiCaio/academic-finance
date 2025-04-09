import { Request, Response } from 'express';
import { createSimulation, getStudentSimulations } from './simulations.service';
import { ApiResponse } from '../../utils/api-response';

export const createSimulationHandler = async (req: Request, res: Response) => {
  const simulation = await createSimulation(req.student!.id, req.body);
  new ApiResponse(res, 201, simulation);
};

export const getSimulationsHandler = async (req: Request, res: Response) => {
  const simulations = await getStudentSimulations(req.student!.id);
  new ApiResponse(res, 200, simulations);
};