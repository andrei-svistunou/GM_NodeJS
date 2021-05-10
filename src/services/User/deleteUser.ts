import User from '../../models/User';

const deleteUser = (userId: User['user_id']): Promise<[number, User[]]> => User.update(
  { 'is_deleted': true },
  { where: { user_id: userId } }
);

export default deleteUser;
