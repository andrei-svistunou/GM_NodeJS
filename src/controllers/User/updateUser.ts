import { Request, Response } from 'express';
import { TUser } from 'src/models/User';
import { UserService } from '../../services';

type TUserRequestData = Pick<TUser, 'login' | 'password' | 'age'>;

const updateUser = (req: Request, res: Response): void => {
    const {
        login,
        password,
        age
    }: TUserRequestData = req.body;
    const existedUser = UserService.getUserByLogin(login);

    if (existedUser) {
        const updatedUser = {
            ...existedUser,
            ...(password && { passwrod: password }),
            ...(age && { age })
        };
        UserService.saveUser(updatedUser);
        res.json({ successful: true, msg: `${login} user was changed` });
    }
};

export default updateUser;
