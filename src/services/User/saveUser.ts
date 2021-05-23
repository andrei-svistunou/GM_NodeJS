import User from '../../models/User';

const saveUser = async (user: User): Promise<User> => User.create(user);

export default saveUser;
