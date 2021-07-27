import express, { Router } from 'express';
import { UserValidator } from '../middlewares';
import { UserController } from '../controllers';

const UserRouter = (): Router => {
  const userRouter = express.Router();

  userRouter.get('/all', UserValidator.validateAccess, UserController.getUsers);
  userRouter.get('/:id', UserValidator.validateAccess, UserController.getUser);
  userRouter.post('/add', UserValidator.validateAccess, UserValidator.validateUser, UserController.createUser);
  userRouter.post('/:id/update', UserValidator.validateAccess, UserValidator.validateUser, UserController.updateUser);
  userRouter.delete('/:id', UserValidator.validateAccess, UserController.deleteUser);
  userRouter.post('/login', UserController.loginUser);

  return userRouter;
};

export default UserRouter;
