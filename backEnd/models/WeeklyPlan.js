const mongoose = require("mongoose");

const courseWeeklyPlan = new mongoose.Schema({
  courseId: {
    type: mongoose.Types.ObjectId,
    ref: "CourseSchema",
    required: true,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
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
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  isFirstWarningSent: {
    type: Boolean,
    default: false,
  },
  isSecondWarningSent: {
    type: Boolean,
    default: false,
  },
  isThirdWarningSent: {
    type: Boolean,
    default: false,
  },
  classDays: [
    {
      type: String,
      enum : ['MON','TUE', 'WED', 'THUR', 'FRI'],
      required: true,
    }
  ]
});

module.exports = mongoose.model("WeeklyPlan", courseWeeklyPlan);
