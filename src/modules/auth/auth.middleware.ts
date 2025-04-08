import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { ApiError } from '../../utils/api-response';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const prisma = new PrismaClient();

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

    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };

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