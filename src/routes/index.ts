import express, { Router } from 'express';
import UserRouter from './userRoutes';

const AppRouter = (): Router => {
  const router = express.Router();

  router.use('/user', UserRouter());

  return router;
};

export default AppRouter;
