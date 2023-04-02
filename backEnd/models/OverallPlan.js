const mongoose = require('mongoose');

const courseOverAllPlan = new mongoose.Schema({
    courseId: {
        type: mongoose.Types.ObjectId,
        ref: 'CourseSchema',
        required: true,
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User' ,
        required: true,
    },
    moduleDetails: [
        { 
            moduleNumber: {
                type: Number,
                required: true,
            },
            moduleName: {
                type: String,
                required: true,
            },
            NoOfHours: {
                type: Number,
                required: true,
            },
            NoOfClassesRequired: {
                type: Number,
                required: true,
            }
        },
    ],
    driveLinkForMaterials: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('OverAllPlan', courseOverAllPlan)