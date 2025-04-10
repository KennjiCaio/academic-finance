import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { ApiError } from '../../utils/api-response';

if (!process.env.JWT_SECRET) {
  throw new Error("FATAL: JWT_SECRET not defined in envs");
}
const JWT_SECRET = process.env.JWT_SECRET;
const prisma = new PrismaClient();

const handleJwtError = (error: unknown) => {
  if (error instanceof jwt.TokenExpiredError) {
    throw new ApiError(401, 'Token expired');
  }
  if (error instanceof jwt.JsonWebTokenError) {
    throw new ApiError(401, 'Invalid token');
  }
  throw new ApiError(401, 'Authentication failed');
};

const verifyToken = (token: string): { id: number } => {
  try {
    return jwt.verify(token, JWT_SECRET) as { id: number };
  } catch (error) {
    handleJwtError(error);
    throw error;
  }
};

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new ApiError(401, 'Authentication required');
    }

    const decoded = verifyToken(token);

    const student = await prisma.student.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        lastname: true
      },
    });

    if (!student) {
      throw new ApiError(401, 'Invalid token');
    }

    req.student = student;
    next();
  } catch (error) {
    next(error);
  }
};