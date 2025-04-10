import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { RegisterInput, LoginInput } from './auth.schema';
import { ApiError } from '../../utils/api-response';

if (!process.env.JWT_SECRET) {
  throw new Error("FATAL: JWT_SECRET not defined in envs");
}
const JWT_SECRET = process.env.JWT_SECRET;
const prisma = new PrismaClient();

const generateToken = (payload: { id: number; email: string }) => {
  return jwt.sign(
    payload,
    JWT_SECRET,
    { 
      expiresIn: '5m',
    }
  );
};

export const register = async (input: RegisterInput) => {
  const { email, password, name, lastname } = input;

  const existingStudent = await prisma.student.findUnique({
    where: { email },
  });

  if (existingStudent) {
    throw new ApiError(409, 'Email already in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const student = await prisma.student.create({
    data: {
      name,
      lastname,
      email,
      password: hashedPassword,
    },
  });

  const token = generateToken({
    id: student.id,
    email: student.email
  });

  return {
    student: {
      id: student.id,
      name: student.name,
      lastname: student.lastname,
      email: student.email,
    },
    token
  };
};

export const login = async (input: LoginInput) => {
  const { email, password } = input;

  const student = await prisma.student.findUnique({
    where: { email },
  });

  if (!student) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const passwordMatch = await bcrypt.compare(password, student.password);

  if (!passwordMatch) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const token = generateToken({
    id: student.id,
    email: student.email
  });

  return {
    student: {
      id: student.id,
      name: student.name,
      lastname: student.lastname,
      email: student.email,
    },
    token
  };
};