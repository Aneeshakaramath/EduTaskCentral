const express = require('express');
const questionPaperCommentsController = require('../controllers/questionPaperComments');
const { check } = require('express-validator');

const router = express.Router();

router.get('/', questionPaperCommentsController.getAllQuestionPaperComment);

router.post('/', 
    [
        check("commentedBy").not().isEmpty(),
        check("description").not().isEmpty(),
        check("questionPaperId").not().isEmpty(),
        check("examType").not().isEmpty(),
    ],
    questionPaperCommentsController.addCommentsForQuestionPaper);

router.get('/question/:questionPaperId', questionPaperCommentsController.getCommentsByQuestionPaperId);

module.exports = router;