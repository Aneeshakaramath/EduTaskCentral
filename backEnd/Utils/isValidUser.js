const User = require('../models/User');

const isValidUser = async function (userId) {
    try {
        const user = await User.find({ _id: userId });
        return user.length > 0;
    } catch(err) {
        return false;
    }
}

exports.isValidUser = isValidUser;