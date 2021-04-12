import { TUser } from "../../models/User";
import { USERS_DB } from "../../store";

const getUsersMatchedByQuery = (query: string) => USERS_DB.filter(({ login, isDeleted }: TUser) => login.includes(query) && !isDeleted);

const getAutoSuggestUsers = (substring: string, limit: number = 10) => {
  const possibleUsers = getUsersMatchedByQuery(substring);
  
  return possibleUsers.slice(0, limit).sort((prev: TUser, next: TUser) => prev.login.indexOf(substring) - next.login.indexOf(substring));
};

export default getAutoSuggestUsers;
