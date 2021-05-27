import Group from '../../models/Group';

const deleteGroup = async (id: Group['id']): Promise<void> => {
  const group = await Group.findOne({
    attributes: ['id'],
    where: { id }
  });

  await group.destroy();
};

export default deleteGroup;
