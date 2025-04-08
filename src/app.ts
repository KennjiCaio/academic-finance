import express from 'express';
import router from './modules/auth/auth.routes';

const app = express();

app.use(express.json());
app.use('/api/auth', router);

export default app;