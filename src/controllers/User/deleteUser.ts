import { Request, Response } from 'express';
import * as UserService from '../../services/User';
import { LoggerService } from '../../services/Logger';

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id: userId } = req.params;

  try {
    await UserService.deleteUser(userId);
    LoggerService.debug(`UserService.deleteUser was invoked with userId ${userId}`);
    res.json({ successful: true, msg: 'User was deleted' });
  } catch (e) {
    LoggerService.error(e.message);
    res.status(400).json({ successful: false, msg: 'User wasn\'t found' });
  }
};

export default deleteUser;
