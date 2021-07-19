import { Request, Response } from 'express';
import User from 'src/models/User';
import { UserService, LoggerService } from '../../services';

const getUsers = async (req: Request, res: Response): Promise<void> => {
  const { limit, login } = req.query;

  const normalizedLimit = limit ? Number(limit) : undefined;

  let userList: User[];
  try {
    if (login) {
      userList = await UserService.getAutoSuggestUsers(login.toString(), normalizedLimit);
      LoggerService.debug(`UserService.getAutoSuggestUsers was invoked with ${login.toString()} data`);
    } else {
      userList = await UserService.getAllUsers();
      LoggerService.debug(`UserService.getAllUsers was invoked`);
    }
    
    res.json({
      successful: true,
      users: userList
    });
  } catch (e) {
    LoggerService.error('Users aren\'t found');
    res.status(400).json({
      successful: false,
      msg: 'Users aren\'t found'
    });
  }
};

export default getUsers;
