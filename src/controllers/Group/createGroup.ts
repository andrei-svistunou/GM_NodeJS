import { Response } from 'express';
import { TValidatedRequest } from '../../middlewares/Group';
import Group from '../../models/Group';
import { GroupService } from '../../services';

interface IGroupRequestData extends Pick<Group, 'name'> {
  permissions: string;
}

const createGroup = async (req: TValidatedRequest, res: Response): Promise<void> => {
  const {
    name,
    permissions
  }: IGroupRequestData = req.body;

  const newGroup = {
    name,
    permissions: [permissions]
  } as unknown as Group;

  try {
    await GroupService.saveGroup(newGroup);
    res.json({ successful: true });
  } catch (e) {
    res.status(400).json({
      successful: false,
      msg: e
    });
  }
};

export default createGroup;
