import { Request, Response } from 'express';
import { login, register } from './auth.service';
import { ApiResponse } from '../../utils/api-response';

export const registerHandler = async (req: Request, res: Response) => {
  console.log('@@@tyets', req.body)
  const result = await register(req.body);
  new ApiResponse(res, 201, result, 'Student registered successfully');
};

export const loginHandler = async (req: Request, res: Response) => {
  const result = await login(req.body);
  new ApiResponse(res, 200, result, 'Login successful');
};