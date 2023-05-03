const mongoose = require('mongoose');

let questionSubSchema = {
    question : {
        type: String,
        required: true,
    },
    bt: {
        type: String,
        // remember, understand, apply, analyze, evaluate, and create
        enum : ['remember','understand', 'apply', 'analyze', 'evaluate','create'],
        required: true,
    },
    couseOutcome: {
        type: String,
        enum: ["CO1", "CO2", "CO3", "CO4", "CO5", "CO6"],
        required: true,
    },
    marks: {
        type: Number,
        required: true,
        min: 1,
    }
}

const questionPaperSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Types.ObjectId,
        ref: "CourseSchema",
        required: true,
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User' ,
        required: true,
    },
    examType : {
        type: String,
        enum : ['CAT_1','CAT_2', 'SEM'],
    },
    session : {
        type: String,
        enum : ['FN','AN'],
    },
    semester: {
        type: Number,
        required: true,
        min: 1,
        max: 8
    },
    examDate: {
        type: Date,
    },
    duration: {
        hours: {
            type: Number,
            required: true,
        },
        mins: {
            type: Number,
            required: true,
        }
    },
    totalMarks: {
        type: Number,
        required: true,
        min: 1,
    },
    partA: [
        questionSubSchema
    ],
    partB: [
        { 
            questions: [
                questionSubSchema
            ]
        }
    ],
    partC: [
        { 
            questions: [
                questionSubSchema
            ]
        }
    ]
});

module.exports = mongoose.model('QuestionPaper', questionPaperSchema)