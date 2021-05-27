import Group from '../../models/Group';

const getGroupById = (id: Group['id']): Promise<Group> => Group.findOne({
  attributes: ['name', 'permissions'],
  where: {
    id
  }
});

export default getGroupById;
