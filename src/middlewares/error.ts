import { ErrorRequestHandler } from 'express';
import { ApiError } from '../utils/api-response';

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      data: err.data || null,
    });
    return;
  }

  console.error('Erro não tratado:', err);
  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor',
    data: null,
  });
};