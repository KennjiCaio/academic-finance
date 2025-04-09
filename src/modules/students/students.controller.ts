import { Request, Response } from "express";
import { ApiResponse } from "../../utils/api-response";
import { getStudentById, updateStudent } from "./students.service"
import { asyncHandler } from "../../utils/async-handler";
import { verifyOwnership } from "../../utils/auth-utils";

export const getStudentHandler = asyncHandler(async (
  req: Request,
  res: Response
) => {
  const id = parseInt(req.params.id);
  verifyOwnership(id, req.student!.id);

  const student = await getStudentById(id);
  new ApiResponse(res, 200, student);
});

export const updateStudentHandler = asyncHandler(async (
  req: Request,
  res: Response
) => {
  const id = parseInt(req.params.id);
  verifyOwnership(id, req.student!.id);

  const student = await updateStudent(id, req.body);
  new ApiResponse(res, 200, student);
});