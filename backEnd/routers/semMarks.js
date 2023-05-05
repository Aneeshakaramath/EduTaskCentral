const express = require("express");
const { check } = require("express-validator");
const semMarksController = require("../controllers/semMarks");

const router = express.Router();

router.get("/", semMarksController.getAllSemMarks);

router.post(
  "/",
  [
    check("courseId").not().isEmpty(),
    check("createdBy").not().isEmpty(),
    check("examType").not().isEmpty(),
    check("marks").not().isEmpty(),
  ],
  semMarksController.addSemMarks
);

router.post(
  "/update",
  [
    check("semMarksById").not().isEmpty(),
    check("marks").not().isEmpty(),
  ],
  semMarksController.updateSemMarks
)

router.get('/course/:courseid', semMarksController.getByCourseId);

module.exports = router;
