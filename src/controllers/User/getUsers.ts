import { Request, Response } from 'express';
import User from 'src/models/User';
import { UserService } from '../../services';

const getUsers = async (req: Request, res: Response): Promise<void> => {
  const { limit, login } = req.query;

  const normalizedLimit = limit ? Number(limit) : undefined;

  let userList: User[];
  try {
    if (login) {
      userList = await UserService.getAutoSuggestUsers(login.toString(), normalizedLimit);
    } else {
      userList = await UserService.getAllUsers();
    }

    res.json({
      successful: true,
      users: userList
    });
  } catch (e) {
    res.status(400).json({
      successful: false,
      msg: 'Users aren\'t found'
    });
  }
};

export default getUsers;
