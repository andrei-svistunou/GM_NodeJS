import { Request, Response } from 'express';
import Group from 'src/models/Group';
import { GroupService } from '../../services';

const updateGroup = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const name: string = req.body.name;
  const permissions: string[] = [req.body.permissions];

  try {
    await GroupService.updateGroup({ id, name, permissions } as unknown as Group);
    res.json({ successful: true, msg: `${id} Group was changed` });
  } catch (e) {
    console.error(e);
    res.json({ successful: false, msg: e });
  }
};

export default updateGroup;
