const express = require('express');
const courseController = require('../controllers/course');

const router = express.Router();

router.get('/', courseController.getAllCourse);

router.post('/', courseController.addCourse);

router.get('/user/:userId', courseController.getCourseByUserId);

module.exports = router;