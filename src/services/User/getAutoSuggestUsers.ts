import User from '../../models/User';
import { Op } from 'sequelize';

const getAutoSuggestUsers = async (substring: string, limit = 10): Promise<User[]> => {
  let users: User[] = [];
  try {
    const { rows } = await User.findAndCountAll({ where: { login: {
      [Op.substring]: substring
    } }, limit });
    users = rows;
  } catch (e) {
    console.error(e);
  } finally {
    return users;
  }
};
export default getAutoSuggestUsers;
