const { validationResult } = require('express-validator');
const HttpError = require('../models/HttpError');
const OverallPlan = require('../models/OverallPlan');
const { isValidUser } = require('../Utils/isValidUser');
const { isValidCourse } = require('../Utils/isValidCourse');

const getAllCourseOverallPlan = async (req, res, next) => {
    try {
        const overallPlan = await OverallPlan.find();
                            
        res.json(overallPlan);
    } catch (err) {
        console.log(err);
        return next(
            new HttpError('Something went wrong, could not find overallPlan',500)
        );
    }
};

const getOverAllPlanByCourseId = async (req, res, next) => {
    try {
        let courseId = req.query.courseId;
        let userId = req.params.userId;

        console.log(courseId);
        console.log(userId);

        const overallPlan = await OverallPlan.find({ courseId: courseId, createdBy: userId  });
        
        console.log(overallPlan);

        res.json(overallPlan);
    } catch (err) {
        console.log(err);
        return next(
            new HttpError('Something went wrong, could not find overall Plan for given details',500)
        );
    }
}

const addNewOverallPlan = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }

    const overallPlan = new OverallPlan({
        courseId: req.body.courseId,
        createdBy: req.body.createdBy,
        moduleDetails: req.body.moduleDetails,
        driveLinkForMaterials: req.body.driveLinkForMaterials,
    });

    if(await isValidOverAllPlan(overallPlan)) {
        try {
            const newOverallPlan = await overallPlan.save();
            res.status(201).json(newOverallPlan);
        } catch (err) {
            console.log(err.message)
            return next(
                new HttpError('overallPlan couldnt be added', 400)
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

exports.getAllCourseOverallPlan = getAllCourseOverallPlan;
exports.getOverAllPlanByCourseId = getOverAllPlanByCourseId;
exports.addNewOverallPlan = addNewOverallPlan;