import { Request, Response } from 'express';
import { UserService } from '../../services';

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id: userId } = req.params;

  try {
    await UserService.deleteUser(userId);

    res.json({ successful: true, msg: 'User was deleted' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ successfull: false, msg: 'User wasn\'t found' });
  }
};

export default deleteUser;
