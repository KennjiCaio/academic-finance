import { Student } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      student?: Omit<Student, 'password' | 'createdAt' | 'updatedAt'>;
      validatedData?: any;
    }
  }
}