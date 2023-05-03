const { validationResult } = require('express-validator');
const HttpError = require('../models/HttpError');
const QuestionPaper = require('../models/QuestionPaper');
const { isValidCourse } = require('../Utils/isValidCourse');

const getAllQuestionPaper = async (req, res, next) => {
    try {
        const questionPaper = await QuestionPaper.find();
                            
        res.json(questionPaper);
    } catch (err) {
        console.log(err);
        return next(
            new HttpError('Something went wrong, could not find questionPaper',500)
        );
    }
};

const addQuestionPaper = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }

    const questionPaper = new QuestionPaper({
        courseId: req.body.courseId,
        examType: req.body.examType,
        session: req.body.session,
        semester: req.body.semester,
        examDate: req.body.examDate,
        duration: req.body.duration,
        totalMarks: req.body.totalMarks,
        partA: req.body.partA,
        partB: req.body.partB,
        partC: req.body.partC
    });
    
    if(await isValidCourse(questionPaper.courseId)) {
        try {
            const newQuestionPaper = await questionPaper.save();
            res.status(201).json(newQuestionPaper);
        } catch (err) {
            console.log(err.message)
            return next(
                new HttpError('questionPaper couldnt be created', 400)
            );
        }
    } else {
        return next(
            new HttpError('Invalid inputs passed', 422)
        );
    }
};

const getByCourseId = async (req, res, next) => {
    try {
        let courseid = req.params.courseid;
        const questionPaperById = await QuestionPaper.find({ courseId: courseid });
        res.json(questionPaperById);
    } catch (err) {
        console.log(err);
        return next(
            new HttpError('Something went wrong, could not find questionPaperById',500)
        );
    }
};

exports.getAllQuestionPaper = getAllQuestionPaper;
exports.addQuestionPaper = addQuestionPaper;
exports.getByCourseId = getByCourseId;