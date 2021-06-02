import User from '../../models/User';

const createUser = async (user: User): Promise<User> => User.create(user);

export default createUser;
