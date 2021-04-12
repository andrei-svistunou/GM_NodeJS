import { TUser } from "../../models/User";
import { USERS_DB } from "../../store";
import getUserIndex from "./getUserIndex";

const saveUser = (user: TUser) => {
  const userIndex = getUserIndex('login', user.login);
  if (userIndex >= 0) {
    USERS_DB[userIndex] = user;
  } else {
    USERS_DB.push(user);
  }
  console.log(USERS_DB);
};

export default saveUser;
