import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

const authMiddleware = (req, res, next) => {
    if (['/login'].includes(req.path)) {
        return next();
    }
    const authHeader = req.headers.authorization;
    const authToken = authHeader && authHeader.split(' ')[1];
    const authSecretKey = process.env.SECRET_KEY;

    if (!authToken) {
        return res.status(StatusCodes.UNAUTHORIZED).send({ message: 'Unexpected token' });
    }

    jwt.verify(authToken, authSecretKey, (err, user) => {
        if (err) {
            return res.status(StatusCodes.FORBIDDEN).send({ message: 'Incorrect token' });
        }

        req.user = user;
        next();
    });
};

export default authMiddleware;
