import { Router } from 'express';
import { registerHandler, loginHandler } from './auth.controller';
import { registerSchema, loginSchema } from './auth.schema';
import { validate } from '../../middlewares/validate';

const authRouter = Router();

authRouter.post('/register', validate(registerSchema), registerHandler);
authRouter.post('/login', validate(loginSchema), loginHandler);

export default authRouter;