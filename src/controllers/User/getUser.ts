import { Request, Response } from 'express';
import { UserService } from '../../services';

const getUser = (req: Request, res: Response): void => {
  const { id: userId } = req.params;
  const existingUser = UserService.getUserById(userId);

  if (existingUser) {
    res.json(existingUser);
  } else {
    res.json({
      successful: false,
      msg: `${userId} user doesn't exist`,
    })
  }
};

export default getUser;
