import User from '../../models/User';

const deleteUser = (userId: User['user_id']): Promise<[number, User[]]> => { console.log('11111111111111111111');
return  User.update(
  { 'is_deleted': true },
  { where: { user_id: userId } }
)};

export default deleteUser;
