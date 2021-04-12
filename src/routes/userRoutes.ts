import express, { Router } from 'express';
import { UserValidator } from '../middlewares';
import { UserController } from '../controllers';

const UserRouter = (): Router => {
  const userRouter = express.Router();

  userRouter.get('/all', UserController.getUsers);
  userRouter.get('/:id', UserController.getUser);
  userRouter.post('/add', UserValidator.validateUser, UserController.createUser);
  userRouter.post('/update', UserValidator.validateUser, UserController.updateUser);
  userRouter.delete('/:id', UserController.deleteUser);

  return userRouter;
};

export default UserRouter;
