import { Response } from 'express';
import { TValidatedRequest } from '../../middlewares/User';
import User from '../../models/User';
import { UserService } from '../../services';

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
    await UserService.saveUser(newUser);
    res.json({ successful: true });
  } catch (e) {
    res.status(400).json({
      successful: false,
      msg: e.errors[0].message
    });
  }
};

export default createUser;
