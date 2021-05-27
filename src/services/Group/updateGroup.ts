import Group from '../../models/Group';

const updateGroup = ({ id, ...updates }: Group): Promise<[number, Group[]]> => Group.update(
  { ...updates },
  { where: { id } }
);

export default updateGroup;
