import { TUser } from "../../models/User";
import { USERS_DB } from "../../store";

const getAllUsers = (): Array<TUser> => USERS_DB.filter(({ isDeleted }: TUser) => !isDeleted);

export default getAllUsers;

