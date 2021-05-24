import { Request, Response } from 'express';
import { GroupService } from '../../services';

const getGroup = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const existingGroup = await GroupService.getGroupById(id);

    if (existingGroup) {
      res.json(existingGroup);
    } else {
      res.status(400).json({
        successful: false,
        msg: `${id} Group doesn't exist`
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export default getGroup;
