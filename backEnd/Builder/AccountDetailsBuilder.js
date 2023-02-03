const UserDetails = require('../models/AccountDetails/UserDetails');
const AccountDetails = require('../models/AccountDetails/AccountDetails');
const AccessDetails = require('../models/AccountDetails/AccessDetails');


const build = function (currentUser,assignedByUser, assignedToUser, commentsForAllTask, taskType) {
    let userDetail = new UserDetails(currentUser.name, currentUser.rollNumber, currentUser.username, currentUser.usertype);
    let accessDetail = new AccessDetails(true);
    let taskAssignedToMe = getTaskDetails(assignedToUser, commentsForAllTask, taskType);
    let taskAssignedByMe = getTaskDetails(assignedByUser, commentsForAllTask, taskType);
    let accountDetail = new AccountDetails(userDetail, accessDetail, taskAssignedToMe, taskAssignedByMe);
    return accountDetail;
}

function getTaskDetails(taskList, commentsList, taskTypeList) {
    let taskDetails = [];

    return taskDetails;
}
exports.build = build;