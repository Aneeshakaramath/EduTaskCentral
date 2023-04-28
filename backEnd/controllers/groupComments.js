const { validationResult } = require('express-validator');
const HttpError = require('../models/HttpError');
const GroupComments = require('../models/GroupComments');
const { isValidUser } = require('../Utils/isValidUser');
const { isValidGroupId } = require('../Utils/isValidGroupId');

const getAllGroupComments = async (req, res, next) => {
    try {
        const groupComments = await GroupComments.find();
        res.json(groupComments);
    } catch (err) {
        console.log(err);
        return next(
            new HttpError('Something went wrong, could not find all group Comments',500)
        );
    }
}

const getCommentsByGroupId = async (req, res, next) => {
    try {
        let groupId = req.params.groupId;
        const groupComments = await GroupComments.find({ groupId: groupId })
                                .populate('commentedBy');
        res.json(groupComments);
    } catch (err) {
        console.log(err);
        return next(
            new HttpError('Something went wrong, could not find groupComments',500)
        );
    }
}

const addCommentsForGroup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }

    const groupComment = new GroupComments({
        commentedBy: req.body.commentedBy,
        description: req.body.description,
        groupId: req.body.groupId
    });

    if(await isValidUser(groupComment.commentedBy) && await isValidGroupId(groupComment.groupId)) {
        try {
            const newGroupComment = await groupComment.save();
            res.status(201).json(newGroupComment);
        } catch (err) {
            console.log(err.message)
            return next(
                new HttpError('groupComment couldnt be added', 400)
            );
        }
    } else {
        return next(
            new HttpError('Invalid inputs passed', 422)
        );
    }
};

exports.getAllGroupComments = getAllGroupComments;
exports.getCommentsByGroupId = getCommentsByGroupId;
exports.addCommentsForGroup = addCommentsForGroup;
