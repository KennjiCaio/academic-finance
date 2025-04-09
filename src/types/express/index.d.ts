import { Student } from '@prisma/client';

declare module 'express-serve-static-core' {
  interface Request {
    student?: Pick<Student, 'id' | 'name' | 'email' | 'lastname'>;
    validatedData?: any;
  }
}