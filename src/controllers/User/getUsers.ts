import { Request, Response } from 'express';
import { TUser } from '../../models/User';
import { UserService } from '../../services';

const getUsers = (req: Request, res: Response): void => {
    const { limit, login } = req.query;

    const normalizedLimit = limit ? Number(limit) : undefined;

    let userList: Array<TUser>;
    if (login) {
        userList = UserService.getAutoSuggestUsers(login.toString(), normalizedLimit);
    } else {
        userList = UserService.getAllUsers();
    }

    res.json({
        successful: true,
        users: userList
    });
};

export default getUsers;
