import { Request, Response } from 'express';
import { UserService } from '../../services';

const getUser = async (req: Request, res: Response): Promise<void> => {
  const { id: userId } = req.params;

  try {
    const existingUser = await UserService.getUserById(userId);

    if (existingUser) {
      res.json(existingUser);
    } else {
      res.status(400).json({
        successful: false,
        msg: `${userId} user doesn't exist`
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export default getUser;
