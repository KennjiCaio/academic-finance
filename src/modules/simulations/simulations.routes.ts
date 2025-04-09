import { Router } from 'express';
import { 
  createSimulationHandler, 
  getSimulationsHandler 
} from './simulations.controller';
import { createSimulationSchema } from './simulations.schema';
import { validate } from '../../middlewares/validate';
import { authenticate } from '../auth/auth.middleware';

const simulationsRouter = Router();

simulationsRouter.use(authenticate);

simulationsRouter.post('/', validate(createSimulationSchema), createSimulationHandler);
simulationsRouter.get('/', getSimulationsHandler);

export default simulationsRouter;