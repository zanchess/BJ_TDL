import { StatusCodes } from 'http-status-codes';

const errorHandler = (err, req, res, next) => {
    console.error('Unhandled Error caught', {
        errorMessage: err.message,
        customErrorMessage: err.customErrorMessage,
        url: req.url,
        params: req.params
    });

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.customErrorMessage });
    next();
};

export default errorHandler;
