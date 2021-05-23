import User from '../../models/User';

const getUserById = (userId: User['user_id']): Promise<User> => User.findOne({
  attributes: ['login', 'age', 'id'],
  where: {
    user_id: userId,
    is_deleted: false
  }
});

export default getUserById;
