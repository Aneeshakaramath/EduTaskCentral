const express = require("express");
const { check } = require("express-validator");
const weeklyPlanController = require("../controllers/weeklyPlan");

const router = express.Router();

router.get("/", weeklyPlanController.getAllWeeklyPlan);

router.get("/user/:userId", weeklyPlanController.getWeeklyPlanById);

router.post(
  "/",
  [
    check("courseId").not().isEmpty(),
    check("createdBy").not().isEmpty(),
    check("moduleNumber").not().isEmpty(),
    check("moduleName").not().isEmpty(),
    check("NoOfHours").not().isEmpty(),
    check("NoOfClassesRequired").not().isEmpty(),
    check("startDate").not().isEmpty(),
    check("endDate").not().isEmpty(),
  ],
  weeklyPlanController.addNewWeeklyPlan
);

module.exports = router;
