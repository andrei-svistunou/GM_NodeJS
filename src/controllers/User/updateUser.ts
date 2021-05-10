import { Request, Response } from 'express';
import User from 'src/models/User';
import { UserService } from '../../services';

type TUserRequestData = Pick<User, 'login' | 'password' | 'age'>;

const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { id: user_id } = req.params;
  const updates: TUserRequestData = req.body;

  try {
    await UserService.updateUser({ user_id, ...updates } as User);
    res.json({ successful: true, msg: `${user_id} user was changed` });
  } catch (e) {
    console.error(e);
    res.json({ successful: false, msg: e.errors[0].message });
  }
};

export default updateUser;
