const mongoose = require('mongoose');

const groupCommentsSchema = new mongoose.Schema({
    groupId: {
        type: mongoose.Types.ObjectId,
        ref: 'Group' ,
        required: true,
    },
    commentedBy: {
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
    }
});

module.exports = mongoose.model('groupComments', groupCommentsSchema)