const mongoose = require('mongoose');

const questionPaperCommentsSchema = new mongoose.Schema({
    questionPaperId: {
        type: mongoose.Types.ObjectId,
        ref: 'QuestionPaper' ,
        required: true,
    },
    examType : {
        type: String,
        enum : ['CAT_1','CAT_2', 'SEM'],
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

module.exports = mongoose.model('QuestionPaperComment', questionPaperCommentsSchema)