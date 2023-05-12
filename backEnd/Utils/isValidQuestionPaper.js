const QuestionPaper = require('../models/QuestionPaper');

const isValidQuestionPaperId = async function (questionPaperId) {
    try {
        const question = await QuestionPaper.find({ _id: questionPaperId });
        return question.length > 0;
    } catch(err) {
        return false;
    }
};

exports.isValidQuestionPaperId = isValidQuestionPaperId;