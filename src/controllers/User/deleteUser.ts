import { Request, Response } from 'express';
import { UserService } from '../../services';

const deleteUser = (req: Request, res: Response) => {
  const { id: userId } = req.params;
  const existedUser = UserService.getUserById(userId);

  if (existedUser) {
    UserService.deleteUser(existedUser);
    res.json({ successful: true, msg: 'User was deleted'});
  } else {
    res.json({ successfull: false, msg: 'User wasn\'t found'});
  }
};

export default deleteUser;
