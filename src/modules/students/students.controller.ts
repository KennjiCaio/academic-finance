import { Request, Response } from "express";
import { ApiResponse } from "../../utils/api-response";
import { getStudentById, updateStudent } from "./students.service"

export const getStudentHandler = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;
  const student = await getStudentById(parseInt(id));
  new ApiResponse(res, 200, student);
}

export const updateStudentHandler = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;
  const student = await updateStudent(
    parseInt(id),
    req.body,
    req.student!.id
  );

  new ApiResponse(res, 200, student);
}