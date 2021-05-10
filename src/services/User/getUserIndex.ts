import { TUser } from '../../models/User';
import { USERS_DB } from '../../store';

const getUserIndex = (key: keyof TUser, value: string | boolean | number): number  =>
    USERS_DB.findIndex((user: TUser) => user[key] === value && !user.isDeleted);

export default getUserIndex;
