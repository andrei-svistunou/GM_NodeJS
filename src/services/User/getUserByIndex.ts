import { TUser } from '../../models/User';
import { USERS_DB } from '../../store';

const getUserByIndex = (userIndex: number): TUser => USERS_DB[userIndex];

export default getUserByIndex;
