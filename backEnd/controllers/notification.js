const { validationResult } = require('express-validator');
const HttpError = require('../models/HttpError');
const Notification = require('../models/Notification');
const { isValidUser } = require('../Utils/isValidUser');

const getAllNotification = async (req, res, next) => {
    try {
        const notification = await Notification.find();
        res.json(notification);
    } catch (err) {
        console.log(err);
        return next(
            new HttpError('Something went wrong, could not find all comments',500)
        );
    }
}

const getNotificationByUserId = async (req, res, next) => {
    try {
        let userId = req.params.userId;
        const notifications = await Notification.find({ user: userId })
                                .sort('-createdTime');
        res.json(notifications);
    } catch (err) {
        console.log(err);
        return next(
            new HttpError('Something went wrong, could not find notifications',500)
        );
    }
}

const addNotification = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }

    const notification = new Notification({
        user: req.body.userId,
        description: req.body.description
    });

    if(await isValidUser(notification.user)) {
        try {
            const newNotification = await notification.save();
            res.status(201).json(newNotification);
        } catch (err) {
            console.log(err.message)
            return next(
                new HttpError('notification couldnt be added', 400)
            );
        }
    } else {
        return next(
            new HttpError('Invalid inputs passed', 422)
        );
    }
};

const updateNotification = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }
    try {
        const notificationById = await Notification.findById(req.body.notificationId);
        if(notificationById == null) {
            return next(
                new HttpError('notification id is invalid', 400)
            );
        }

        if (req.body.isRead != null && req.body.isRead != undefined) {
            notificationById.isRead = req.body.isRead;
        }
        const updatedNotification = await notificationById.save();
        res.json(updatedNotification);
    } catch (err) {
        console.log(err.message);
        return next(
            new HttpError('notification couldnt be updated', 400)
        );
    }
};

exports.getNotificationByUserId = getNotificationByUserId;
exports.addNotification = addNotification;
exports.getAllNotification = getAllNotification;
exports.updateNotification = updateNotification;