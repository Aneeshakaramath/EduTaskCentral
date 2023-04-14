const { validationResult } = require('express-validator');
const HttpError = require('../models/HttpError');
const WeeklyPlan = require('../models/WeeklyPlan');
const { isValidUser } = require('../Utils/isValidUser');
const { isValidCourse } = require('../Utils/isValidCourse');

const getAllWeeklyPlan = async (req, res, next) => {
    try {
        const weeklyPlan = await WeeklyPlan.find();
                            
        res.json(weeklyPlan);
    } catch (err) {
        console.log(err);
        return next(
            new HttpError('Something went wrong, could not find weeklyPlan',500)
        );
    }
};

const getWeeklyPlanById = async (req, res, next) => {
    try {
        let courseId = req.query.courseId;
        let userId = req.params.userId;
        let moduleNumber = req.query.moduleNumber;
        let moduleName = req.query.moduleName;

        console.log(courseId);
        console.log(userId);
        console.log(moduleNumber);
        console.log(moduleName);

        const weeklyPlan = await WeeklyPlan.find({
          courseId: courseId,
          createdBy: userId,
          moduleNumber: moduleNumber,
          moduleName: moduleName,
        });
        
        console.log(weeklyPlan);

        res.json(weeklyPlan);
    } catch (err) {
        console.log(err);
        return next(
            new HttpError('Something went wrong, could not find weekly Plan for given details',500)
        );
    }
}

const addNewWeeklyPlan = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }

    const weeklyPlan = new WeeklyPlan({
        courseId: req.body.courseId,
        createdBy: req.body.createdBy,
        moduleNumber: req.body.moduleNumber,
        moduleName: req.body.moduleName,
        NoOfHours: req.body.NoOfHours,
        NoOfClassesRequired: req.body.NoOfClassesRequired,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
    });

    if(await isValidOverAllPlan(weeklyPlan)) {
        try {
            const newWeeklyPlan = await weeklyPlan.save();
            res.status(201).json(newWeeklyPlan);
        } catch (err) {
            console.log(err.message)
            return next(
                new HttpError('weekly Plan couldnt be added', 400)
            );
        }
    } else {
        return next(
            new HttpError('Invalid inputs passed', 422)
        );
    }
}

async function isValidOverAllPlan(overallPlan) {
    const isCreatedByValidUser = await isValidUser(overallPlan.createdBy);
    const isCourseIdValid = await isValidCourse(overallPlan.courseId);
    console.log([isCreatedByValidUser, isCourseIdValid]);
    return isCreatedByValidUser && isCourseIdValid;
}

exports.getAllWeeklyPlan = getAllWeeklyPlan;
exports.getWeeklyPlanById = getWeeklyPlanById;
exports.addNewWeeklyPlan = addNewWeeklyPlan;