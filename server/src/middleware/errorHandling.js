import { StatusCodes } from 'http-status-codes';

const errorHandler = (err, req, res, next) => {
    const errorResponse = {
        errorMessage: err.message,
        customErrorMessage: err.customErrorMessage,
        url: req.url,
        params: req.params
    };
    console.error('Unhandled Error caught', { ...errorResponse });

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ ...errorResponse });
    next();
};

export default errorHandler;
