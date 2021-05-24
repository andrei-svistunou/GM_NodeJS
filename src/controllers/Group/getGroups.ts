import { Request, Response } from 'express';
import { GroupService } from '../../services';

const getGroups = async (_req: Request, res: Response): Promise<void> => {
  try {
    const groups = await GroupService.getAllGroups();

    res.json({
      successful: true,
      groups
    });
  } catch (e) {
    res.status(400).json({
      successful: false,
      msg: 'Groups aren\'t found'
    });
  }
};

export default getGroups;
