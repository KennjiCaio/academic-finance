import { Request, Response } from 'express';
import { login, register } from './auth.service';
import { ApiResponse } from '../../utils/api-response';
import { asyncHandler } from '../../utils/async-handler';

export const registerHandler = asyncHandler(async (req: Request, res: Response) => {
  const result = await register(req.body);
  new ApiResponse(res, 201, result);
});

export const loginHandler = asyncHandler(async (req: Request, res: Response) => {
  const result = await login(req.body);
  new ApiResponse(res, 200, result, 'Login successful');
});