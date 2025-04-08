import { Response } from 'express';

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public data?: any
  ) {
    super(message);
  }
}

export class ApiResponse {
  constructor(
    res: Response,
    statusCode: number,
    data: any,
    message: string = 'Success'
  ) {
    res.status(statusCode).json({
      success: statusCode < 400,
      message,
      data,
    });
  }
}