const { validationResult } = require('express-validator');
const HttpError = require('../models/HttpError');
const CatMarks = require('../models/CatMarks');
const { isValidCourse } = require('../Utils/isValidCourse');
const { isValidUser } = require('../Utils/isValidUser');

const getAllCatMarks = async (req, res, next) => {
    try {
        const catMarks = await CatMarks.find();
                            
        res.json(catMarks);
    } catch (err) {
        console.log(err);
        return next(
            new HttpError('Something went wrong, could not find cat Marks',500)
        );
    }
};

const addCatMarks = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }

    const catMarks = new CatMarks({
        courseId: req.body.courseId,
        createdBy: req.body.createdBy,
        examType: req.body.examType,
        catWeightage: req.body.catWeightage,
        marks: req.body.marks
    });
    
    if(await isValidCourse(catMarks.courseId) && await isValidUser(catMarks.createdBy)) {
        try {
            const newCatMarks = await catMarks.save();
            res.status(201).json(newCatMarks);
        } catch (err) {
            console.log(err.message)
            return next(
                new HttpError('Cat Marks couldnt be created', 400)
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
        const catMarksById = await CatMarks.find({ courseId: courseId, examType: examType });
        res.json(catMarksById);
    } catch (err) {
        console.log(err);
        return next(
            new HttpError('Something went wrong, could not find catMarksById',500)
        );
    }
};


const updateCatMarks = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }
    try {
        const catMarksById = await CatMarks.findById(req.body.catMarksId);
        if(catMarksById == null || catMarksById.length == 0) {
            return next(
                new HttpError('Could not find', 400)
            );
        }
        catMarksById.catWeightage = req.body.catWeightage
        catMarksById.marks = req.body.marks
        const updatedCatMarks = await catMarksById.save();
        res.json(updatedCatMarks);
    } catch (err) {
        console.log(err.message);
        return next(
            new HttpError('task couldnt be updated', 400)
        );
    }
};

exports.getAllCatMarks = getAllCatMarks;
exports.getByCourseId = getByCourseId;
exports.addCatMarks = addCatMarks;
exports.updateCatMarks = updateCatMarks;