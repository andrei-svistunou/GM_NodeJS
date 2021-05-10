import { Response } from 'express';
import { TValidatedRequest } from '../../middlewares/User';
import { v4 as uuidv4 } from 'uuid';
import { TUser } from '../../models/User';
import { UserService } from '../../services';

type TUserRequestData = Pick<TUser, 'login' | 'password' | 'age'>;

const createUser = (req: TValidatedRequest, res: Response): void => {
    const {
        login,
        password,
        age
    }: TUserRequestData = req.body;

    const existedUser = UserService.getUserByLogin(login);

    if (existedUser) {
        res.json({ successful: false, msg: `${login} user exists` });
    } else {
        const id = uuidv4();

        const newUser = {
            login,
            password,
            age: Number(age),
            isDeleted: false,
            id
        };

        UserService.saveUser(newUser);
        res.json({ successful: true, id });
    }
};

export default createUser;
