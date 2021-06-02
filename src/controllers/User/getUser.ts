import { Request, Response } from 'express';
import { UserService, LoggerService } from '../../services';

const getUser = async (req: Request, res: Response): Promise<void> => {
  const { id: userId } = req.params;

  try {
    const existingUser = await UserService.getUserById(userId);
    LoggerService.debug(`UserService.getUserById was invoked for ${userId} user`);
  
    if (existingUser) {
      LoggerService.debug('User exists');      
      res.json(existingUser);
    } else {
      LoggerService.debug('User doesn\'t exist');
      res.status(400).json({
        successful: false,
        msg: `${userId} user doesn't exist`
      });
    }
  } catch (error) {
    LoggerService.error(error.message);
  }
};

export default getUser;
