const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User' ,
        required: true,
    },
    createdTime: {
        type: Date,
        default: Date.now,
    },
    description: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Notification', notificationSchema)