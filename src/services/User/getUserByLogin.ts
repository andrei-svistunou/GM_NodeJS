import User from '../../models/User';

const getUserByLogin = (login: User['login'], password: User['password']): Promise<User> => User.findOne({
  attributes: ['login', 'age', 'user_id'],
  where: {
    login,
    password,
    is_deleted: false
  }
});

export default getUserByLogin;
