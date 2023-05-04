const express = require("express");
const { check } = require("express-validator");
const catMarksController = require("../controllers/catMarks");

const router = express.Router();

router.get("/", catMarksController.getAllCatMarks);

router.post(
  "/",
  [
    check("courseId").not().isEmpty(),
    check("createdBy").not().isEmpty(),
    check("examType").not().isEmpty(),
    check("catWeightage").not().isEmpty(),
    check("marks").not().isEmpty(),
  ],
  catMarksController.addCatMarks
);

router.get('/course/:courseid', catMarksController.getByCourseId);

module.exports = router;
