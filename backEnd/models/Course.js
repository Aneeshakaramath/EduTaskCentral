const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        required: true,
        min: 1,
        max: 8
    },
    yearOfStudy: {
        type: Number,
        required: true,
        min: 1,
        max: 4
    },
    credit: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    studentCount: {
        type: Number,
        required: true,
        min: 1
    },
    start_year: {
        type: Number,
        required: true,
    },
    end_year: {
        type: Number,
        required: true,
    },
    typeOfCourse : {
        type: String,
        enum : ['Theory','Lab', 'Lab Integrated Theory'],
        default: 'Theory'
    },
    isElective: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User' ,
        required: true,
    }
});

module.exports = mongoose.model('CourseSchema', courseSchema)