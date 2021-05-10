import User from '../../models/User';

const updateUser = ({ user_id, ...updates }: User): Promise<[number, User[]]> => User.update(
  { ...updates },
  { where: { user_id } }
);

export default updateUser;
