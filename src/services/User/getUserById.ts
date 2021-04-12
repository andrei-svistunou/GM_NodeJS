import { TUser } from '../../models/User';
import { USERS_DB } from '../../store';

const getUserById = (userId: string): TUser => USERS_DB.find(({ id, isDeleted }: TUser): boolean => id === userId && !isDeleted);

export default getUserById;
