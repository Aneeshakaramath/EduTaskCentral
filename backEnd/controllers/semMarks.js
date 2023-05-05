const { validationResult } = require('express-validator');
const HttpError = require('../models/HttpError');
const SemMarks = require('../models/SemMarks');
const { isValidCourse } = require('../Utils/isValidCourse');
const { isValidUser } = require('../Utils/isValidUser');

const getAllSemMarks = async (req, res, next) => {
    try {
        const semMarks = await SemMarks.find();                   
        res.json(semMarks);
    } catch (err) {
        console.log(err);
        return next(
            new HttpError('Something went wrong, could not find sem Marks',500)
        );
    }
};

const addSemMarks = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }

    const semMarks = new SemMarks({
        courseId: req.body.courseId,
        createdBy: req.body.createdBy,
        examType: req.body.examType,
        marks: req.body.marks
    });
    
    if(await isValidCourse(semMarks.courseId) && await isValidUser(semMarks.createdBy)) {
        try {
            const newSemMarks = await semMarks.save();
            res.status(201).json(newSemMarks);
        } catch (err) {
            console.log(err.message)
            return next(
                new HttpError('Sem Marks couldnt be created', 400)
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
        let courseId = req.params.courseid;
        let examType = req.query.examType;
        const semMarksById = await SemMarks.find({ courseId: courseId, examType: examType });
        res.json(semMarksById);
    } catch (err) {
        console.log(err);
        return next(
            new HttpError('Something went wrong, could not find semMarksById',500)
        );
    }
};


const updateSemMarks = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }
    try {
        const semMarksById = await CatMarks.findById(req.body.semMarksById);
        if(semMarksById == null) {
            return next(
                new HttpError('Could not find', 400)
            );
        }
        semMarksById.marks = req.body.marks;
        const updatedSemMarks = await semMarksById.save();
        res.json(updatedSemMarks);
    } catch (err) {
        console.log(err.message);
        return next(
            new HttpError('SemMarks couldnt be updated', 400)
        );
    }
};

exports.getAllSemMarks = getAllSemMarks;
exports.getByCourseId = getByCourseId;
exports.addSemMarks = addSemMarks;
exports.updateSemMarks = updateSemMarks;