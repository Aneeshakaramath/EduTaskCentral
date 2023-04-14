const AccountDetails = class {
    constructor(userDetails, accessDetails, taskAssignedToMe, taskAssignedByMe, isNewNotificationAvailable) {
      this.userDetails = userDetails;
      this.accessDetails = accessDetails;
      this.taskAssignedToMe = taskAssignedToMe;
      this.taskAssignedByMe = taskAssignedByMe;
      this.isNewNotificationAvailable = isNewNotificationAvailable;
    }
};

module.exports = AccountDetails;