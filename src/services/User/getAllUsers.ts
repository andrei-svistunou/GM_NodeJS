import User from '../../models/User';

const getAllUsers = (): Promise<Array<User>> => User.findAll({ where: { is_deleted: false } });

export default getAllUsers;

