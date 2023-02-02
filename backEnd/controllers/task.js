const { validationResult } = require('express-validator');
const HttpError = require('../models/HttpError');
const Task = require('../models/Task');
const { isValidTaskType } = require('../Utils/isValidTaskType');
const { isValidUser } = require('../Utils/isValidUser');
const { isValidTaskList } = require('../Utils/isValidTask');

const getAllTask = async (req, res, next) => {
    try {
        const task = await Task.find().populate('assignedBy').populate('assignedTo');
        res.json(task);
    } catch (err) {
        console.log(err);
        return next(
            new HttpError('Something went wrong, could not find task',500)
        );
    }
};

const getTaskAssignedByMe = async (req, res, next) => {
    try {
        let assignedByCode = req.session._id;
        const task = await Task.find({ assignedBy: assignedByCode }).populate('assignedBy').populate('assignedTo');
        res.json(task);
    } catch (err) {
        console.log(err);
        return next(
            new HttpError('Something went wrong, could not find task',500)
        );
    }
};

const getTaskAssignedToMe = async (req, res, next) => {
    try {
        let assignedToCode = req.session._id;
        const task = await Task.find({ assignedTo: assignedToCode }).populate('assignedBy').populate('assignedTo');
        res.json(task);
    } catch (err) {
        console.log(err);
        return next(
            new HttpError('Something went wrong, could not find task',500)
        );
    }
};

const addTask = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }

    const task = new Task({
        taskType: req.body.taskType,
        numberOfEvents: req.body.numberOfEvents,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        childTaskList: req.body.childTaskList,
        assignedBy: req.body.assignedBy,
        assignedTo: req.body.assignedTo,
        taskStatus: req.body.taskStatus
    });
    
    if(await isTaskValid(task)) {
        try {
            const newTask = await task.save();
            res.status(201).json(newTask);
        } catch (err) {
            console.log(err.message)
            return next(
                new HttpError('task couldnt be created', 400)
            );
        }
    } else {
        return next(
            new HttpError('Invalid inputs passed', 422)
        );
    }
};

const updateTask = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }
    try {
        const taskById = await Task.findById(req.body.taskId);
        if(taskById == null) {
            return next(
                new HttpError('task id is invalid', 400)
            );
        }
        if (req.body.childTaskList != null && await isValidTaskList(req.body.childTaskList)) {
            taskById.childTaskList = req.body.childTaskList;
        } 
        else {
            console.log("Child task list is invalid");
        }
        if (req.body.taskStatus != null) {
            taskById.taskStatus = req.body.taskStatus
        }
        const updatedTask = await taskById.save();
        res.json(updatedTask);
    } catch (err) {
        console.log(err.message);
        return next(
            new HttpError('task couldnt be updated', 400)
        );
    }
};

async function isTaskValid(task) {
    const isTaskTypeValid = await isValidTaskType(task.taskType);
    const isAssignedByUserValid = await isValidUser(task.assignedBy);
    const isAssignedToUserValid = await isValidUser(task.assignedTo);
    const isChildTaskValid = await isValidTaskList(task.childTaskList);
    console.log([isTaskTypeValid, isAssignedByUserValid, isAssignedToUserValid, isChildTaskValid]);
    return isTaskTypeValid && isAssignedByUserValid && isAssignedToUserValid && isChildTaskValid;
}

exports.getAllTask = getAllTask;
exports.addTask = addTask;
exports.getTaskAssignedByMe = getTaskAssignedByMe;
exports.getTaskAssignedToMe = getTaskAssignedToMe;
exports.updateTask = updateTask;