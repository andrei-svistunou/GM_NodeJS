import { Request, Response } from 'express';
import { GroupService } from '../../services';

const deleteGroup = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await GroupService.deleteGroup(id);

    res.json({ successful: true, msg: 'Group was deleted' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ successfull: false, msg: 'Group wasn\'t found' });
  }
};

export default deleteGroup;
