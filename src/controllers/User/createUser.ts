import { Response } from 'express';
import { TValidatedRequest } from '../../middlewares/User';
import User from '../../models/User';
import { UserService, LoggerService } from '../../services';

type TUserRequestData = Pick<User, 'login' | 'password' | 'age'>;

const createUser = async (req: TValidatedRequest, res: Response): Promise<void> => {
  const {
    login,
    password,
    age
  }: TUserRequestData = req.body;

  const newUser = {
    login,
    password,
    age: Number(age)
  } as User;

  try {
    await UserService.createUser(newUser);
    LoggerService.debug(`UserService.createUser was invoked with ${Object.entries(newUser)} data`);
    res.json({ successful: true });
  } catch (e) {
    LoggerService.error(e.message);
    res.status(400).json({
      successful: false,
      msg: e.message
    });
  }
};

export default createUser;
