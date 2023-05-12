const { validationResult } = require('express-validator');
const HttpError = require('../models/HttpError');
const QuestionPaperComment = require('../models/QuestionPaperComment');
const { isValidUser } = require('../Utils/isValidUser');
const { isValidQuestionPaperId } = require('../Utils/isValidQuestionPaper');

const getAllQuestionPaperComment = async (req, res, next) => {
    try {
        const groupComments = await QuestionPaperComment.find();
        res.json(groupComments);
    } catch (err) {
        console.log(err);
        return next(
            new HttpError('Something went wrong, could not find all group Comments',500)
        );
    }
}

const getCommentsByQuestionPaperId = async (req, res, next) => {
    try {
        let questionPaperId = req.params.questionPaperId;
        let examType = req.query.examType;
        const questionPaperComments = await QuestionPaperComment.find({ questionPaperId: questionPaperId, examType: examType })
                                .populate('commentedBy');
        res.json(questionPaperComments);
    } catch (err) {
        console.log(err);
        return next(
            new HttpError('Something went wrong, could not find questionPaperComments',500)
        );
    }
}

const addCommentsForQuestionPaper = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }

    const questionPaperComment = new QuestionPaperComment({
        commentedBy: req.body.commentedBy,
        description: req.body.description,
        questionPaperId: req.body.questionPaperId,
        examType: req.body.examType
    });

    if(await isValidUser(questionPaperComment.commentedBy)
        && await isValidQuestionPaperId(questionPaperComment.questionPaperId)) {
        try {
            const newQuestionPaperComment = await questionPaperComment.save();
            res.status(201).json(newQuestionPaperComment);
        } catch (err) {
            console.log(err.message)
            return next(
                new HttpError('QuestionPaperComment couldnt be added', 400)
            );
        }
    } else {
        return next(
            new HttpError('Invalid inputs passed', 422)
        );
    }
};

exports.getAllQuestionPaperComment = getAllQuestionPaperComment;
exports.getCommentsByQuestionPaperId = getCommentsByQuestionPaperId;
exports.addCommentsForQuestionPaper = addCommentsForQuestionPaper;
