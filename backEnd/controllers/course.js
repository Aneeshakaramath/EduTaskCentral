const { validationResult } = require('express-validator');
const HttpError = require('../models/HttpError');
const Course = require('../models/Course');
const Group = require('../models/Group');
const { isValidUser } = require('../Utils/isValidUser');

const getAllCourse = async (req, res, next) => {
    try {
        const course = await Course.find()
                            .populate('createdBy', '-password');
                            
        res.json(course);
    } catch (err) {
        console.log(err);
        return next(
            new HttpError('Something went wrong, could not find task',500)
        );
    }
};

const addCourse = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }

    const course = new Course({
        code: req.body.code,
        name: req.body.name,
        semester: req.body.semester,
        yearOfStudy: req.body.yearOfStudy,
        credit: req.body.credit,
        studentCount: req.body.studentCount,
        start_year: req.body.start_year,
        end_year: req.body.end_year,
        typeOfCourse: req.body.typeOfCourse,
        isElective: req.body.isElective,
        createdBy: req.body.createdBy
    });
    
    if(await isValidCourse(course)) {
        try {
            const newCourse = await course.save();
            res.status(201).json(newCourse);
        } catch (err) {
            console.log(err.message)
            return next(
                new HttpError('course couldnt be created', 400)
            );
        }
    } else {
        return next(
            new HttpError('Invalid inputs passed', 422)
        );
    }
};

const getCourseByUserId = async (req, res, next) => {
    try {
        let userId = req.params.userId;
        const courseList = await Course.find({ createdBy: userId })
                                    .populate('createdBy', '-password');
        res.json(courseList);
    } catch (err) {
        console.log(err);
        return next(
            new HttpError('Something went wrong, could not find course List',500)
        );
    }
};

async function isValidCourse(course) {
    const isAssignedByUserValid = await isValidUser(course.createdBy);
    return isAssignedByUserValid;
}

exports.addCourse = addCourse;
exports.getAllCourse = getAllCourse;
exports.getCourseByUserId = getCourseByUserId;