const UserType = require('../models/UserType');
const HttpError = require('../models/HttpError');

const isUserTypeValid = async function (userTypeCode) {
    try {
        console.log(userTypeCode);
        const user = await UserType.find({ code: userTypeCode });
        return user.length > 0;
    } catch(err) {
        return false;
    }
}

exports.isUserTypeValid = isUserTypeValid;