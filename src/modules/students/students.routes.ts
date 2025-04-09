import { Router } from "express";
import { validate } from "../../middlewares/validate";
import { authenticate } from "../auth/auth.middleware";
import { getStudentHandler, updateStudentHandler } from "./students.controller";
import { getStudentSchema, updateStudentSchema } from "./students.schema";

const studentRouter = Router();

studentRouter
  .get(
    '/:id',
    authenticate,
    validate(getStudentSchema, 'params'),
    getStudentHandler,
  )
  .put(
    '/:id',
    authenticate,
    validate(getStudentSchema, 'params'),
    validate(updateStudentSchema),
    updateStudentHandler
  );

export default studentRouter;