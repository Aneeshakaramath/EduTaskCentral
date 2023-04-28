const express = require('express');
const groupCommentsController = require('../controllers/groupComments');
const { check } = require('express-validator');

const router = express.Router();

router.get('/', groupCommentsController.getAllGroupComments);

router.post('/', 
    [
    check("commentedBy").not().isEmpty(),
    check("description").not().isEmpty(),
    check("groupId").not().isEmpty(),
    ],
  groupCommentsController.addCommentsForGroup);

router.get('/group/:groupId', groupCommentsController.getCommentsByGroupId);

module.exports = router;