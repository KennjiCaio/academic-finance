import { PrismaClient } from "@prisma/client";
import { ApiError } from "../../utils/api-response";
import { UpdateStudentInput } from "./students.schema";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function getStudentById(studentId: number) {
  const student = await prisma.student.findUnique({
    where: { id: studentId },
    select: {
      id: true,
      name: true,
      lastname: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    }
  });

  if (!student) {
    throw new ApiError(404, 'Student not found');
  }

  return student;
}

export async function updateStudent(
  studentId: number,
  data: UpdateStudentInput,
  currentStudentId: number
) {
  if (studentId !== currentStudentId) {
    throw new ApiError(403, 'Could not update a other person data');
  }

  const updateData: Partial<UpdateStudentInput> = { ...data };

  if (data.password) {
    updateData.password = await bcrypt.hash(data.password, 10);
  }

  return await prisma.student.update({
    where: { id: studentId },
    data: updateData,
    select: {
      id: true,
      name: true,
      lastname: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    }
  });
}