import express from 'express';
import authRouter from './modules/auth/auth.routes';
import studentRouter from './modules/students/students.routes';

const app = express();

app.use(express.json());
app.use('/api', authRouter);
app.use('/api/me', studentRouter);

export default app;