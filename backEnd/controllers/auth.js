const { validationResult } = require('express-validator');
const HttpError = require('../models/HttpError');
const User = require('../models/User');

const authorizeUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }
    try {
        const user = await User.find({ username: req.body.username });
        if(user == null) {
            return next(
                new HttpError('Username is invalid or not found', 400)
            );
        }
        if(user[0].password == req.body.password) {
            let session=req.session;
            session._id=user[0]._id;
            console.log(`Authenticated the user ${user[0].username}`);
            const result = {
                isAuthenticated: true,
                message: "Authentication Success"
            };
            res.send(result);
        }
        else {
            return next(
            new HttpError('Invalid Password',401)
            );
        }
    } catch (err) {
        console.log(err)
        return next(
            new HttpError('Something went wrong, could not Authenticate',500)
        );
    }
};

const logoutUser = async (req, res, next) => {
    req.session.destroy();
    const result = {
        isLogoutSuccessful: true,
        messaged: "Logout Sucess"
    };
    res.send(result);
};

exports.authorizeUser = authorizeUser;
exports.logoutUser = logoutUser;