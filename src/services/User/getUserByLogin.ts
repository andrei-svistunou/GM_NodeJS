import { TUser } from '../../models/User';
import getUserByIndex from './getUserByIndex';
import getUserIndex from './getUserIndex';

const getUserByLogin = (userLogin: string): TUser => {
    const userIndex = getUserIndex('login', userLogin);
    return getUserByIndex(userIndex);
};

export default getUserByLogin;
