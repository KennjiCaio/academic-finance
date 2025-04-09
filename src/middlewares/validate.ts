import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { ApiError } from '../utils/api-response';

export const validate = (schema: AnyZodObject, target: 'body' | 'params' | 'query' = 'body') => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await schema.safeParseAsync(req[target]);
      console.log('@@Resources', result)
      
      if (!result.success) {
        const errors = result.error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message
        }));
        return next(new ApiError(400, 'Dados inválidos', { errors }));
      }

      next();
    } catch (error) {
      next(error);
    }
  };