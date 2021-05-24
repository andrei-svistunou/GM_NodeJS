import Group from '../../models/Group';

const saveGroup = (group: Group): Promise<Group> => Group.create(group);

export default saveGroup;
