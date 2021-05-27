import express, { Router } from 'express';
import UserRouter from './userRoutes';
import GroupRouter from './groupRoutes';

const AppRouter = (): Router => {
  const router = express.Router();

  router.use('/user', UserRouter());
  router.use('/group', GroupRouter());

  return router;
};

export default AppRouter;
