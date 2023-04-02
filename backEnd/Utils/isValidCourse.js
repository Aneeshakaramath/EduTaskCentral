const Course = require('../models/Course');

const isValidCourse = async function (courseId) {
    try {
        const course = await Course.find({ _id: courseId });
        return course.length > 0;
    } catch(err) {
        return false;
    }
};

exports.isValidCourse = isValidCourse;