import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/usersService.js';
import UsersModel from '../model/usersModel.js';

const userService = new UserService(UsersModel);

const loginHandler = async (req, res) => {
    const { login, password } = req.body;
    try {
        const user = await userService.authUser(login, password);
        const secretKey = process.env.SECRET_KEY;
        const jwtPayload = { name: user.u_name };
        const jwtExpiration = { expiresIn: 60 * 60 };

        if (user) {
            const accessToken = await jwt.sign(jwtPayload, secretKey, jwtExpiration);
            await res.json({ accessToken: `Bearer ${accessToken}` });
        } else {
            res.status(StatusCodes.UNAUTHORIZED).send({ message: 'Unauthorized error: user is not found' });
        }
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).send({ message: 'Unauthorized error: user is not found' });
    }
};

export { loginHandler, userService };
