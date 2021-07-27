import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { LoggerService, UserService } from '../../services';
import { SECRET_KEY } from '../../config';

const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const existingUser = await UserService.getUserByLogin(username, password);
    LoggerService.debug(`UserService.getUserByLogin was invoked for ${username} user`);

    if (existingUser) {
      LoggerService.debug('User exists');      
      const payload = {
        id: existingUser.user_id,
        age: existingUser.age
      };
      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '5h'});
      LoggerService.debug('Token was created');
    
      res.json({
        successful: true,
        token,
      })
    } else {
      LoggerService.debug('User does not exist');      
      res.status(403).json({
        successful: false,
        msg: 'Bad credentials',
      })
    }

  } catch(error) {
    LoggerService.error(error.message);
  }

};

export default loginUser;
