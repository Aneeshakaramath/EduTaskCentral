const express = require('express');
const { check } = require('express-validator');
const overallPlanController = require('../controllers/OverallPlan');

const router = express.Router();

router.get('/', overallPlanController.getAllCourseOverallPlan);

router.get('/user/:userId', overallPlanController.getOverAllPlanByCourseId);

router.post('/', [
    check('courseId')
        .not()
        .isEmpty(),
    check('createdBy')
        .not()
        .isEmpty(),
    check('driveLinkForMaterials')
        .not()
        .isEmpty(),],
        overallPlanController.addNewOverallPlan);

module.exports = router;