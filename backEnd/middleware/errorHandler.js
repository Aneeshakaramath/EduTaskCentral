const HttpError = require('../models/HttpError');

const unknownRouteHandler = (req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
};

const errorHandler = (error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
};

exports.unknownRouteHandler = unknownRouteHandler;
exports.errorHandler = errorHandler;