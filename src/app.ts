import express from 'express';
import authRouter from './modules/auth/auth.routes';
import studentRouter from './modules/students/students.routes';
import simulationsRouter from './modules/simulations/simulations.routes';

const app = express();

app.use(express.json());
app.use('/api', authRouter);
app.use('/api/me', studentRouter);
app.use('/api/simulations', simulationsRouter);

export default app;