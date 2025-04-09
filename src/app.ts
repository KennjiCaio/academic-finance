import express from 'express';
import authRouter from './modules/auth/auth.routes';
import studentRouter from './modules/students/students.routes';
import simulationsRouter from './modules/simulations/simulations.routes';
import { errorMiddleware } from './middlewares/error';

const app = express();

app.use(express.json());
app.use('/api', authRouter);
app.use('/api/me', studentRouter);
app.use('/api/simulations', simulationsRouter);
app.use(errorMiddleware);

export default app;