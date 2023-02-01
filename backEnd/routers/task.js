const express = require('express');
const { check } = require('express-validator');
const taskController = require('../controllers/task');

const router = express.Router();

router.get('/', taskController.getAllTask);

router.post('/', [
    check('taskType')
        .not()
        .isEmpty(),
    check('numberOfEvents')
        .not()
        .isEmpty(),
    check('assignedBy')
        .not()
        .isEmpty(),
    check('assignedTo')
        .not()
        .isEmpty(),],
        taskController.addTask);

module.exports = router;