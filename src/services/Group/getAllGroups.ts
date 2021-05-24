import Group from '../../models/Group';

const getAllGroups = (): Promise<Array<Group>> => Group.findAll();

export default getAllGroups;

