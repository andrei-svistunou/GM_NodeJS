import { TUser } from '../../models/User';
import { USERS_DB } from '../../store';
import getUserIndex from './getUserIndex';

const deleteUser = (user: TUser): void => {
    const userIndex = getUserIndex('id', user.id);

    if (userIndex >= 0) {
        USERS_DB[userIndex].isDeleted = true;
    }
};

export default deleteUser;
