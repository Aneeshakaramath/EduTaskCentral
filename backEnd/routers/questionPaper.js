const express = require("express");
const { check } = require("express-validator");
const questionPaperController = require("../controllers/questionPaper");

const router = express.Router();

router.get("/", questionPaperController.getAllQuestionPaper);

router.post(
  "/",
  [
    check("courseId").not().isEmpty(),
    check("examType").not().isEmpty(),
    check("session").not().isEmpty(),
    check("semester").not().isEmpty(),
    check("examDate").not().isEmpty(),
    check("duration").not().isEmpty(),
    check("totalMarks").not().isEmpty(),
  ],
  questionPaperController.addQuestionPaper
);

router.get('/course/:courseid', questionPaperController.getByCourseId);

module.exports = router;
