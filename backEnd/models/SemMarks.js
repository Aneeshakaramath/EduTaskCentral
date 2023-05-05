const mongoose = require("mongoose");

const semMarksSchema = new mongoose.Schema({
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
  examType: {
    type: String,
    enum: ["SEM"],
  },
  marks: [
    {
      name: {
        type: String,
        required: true,
      },
      semMarks: {
        type: Number,
        required: true,
        min: 0,
        max: 100
      },
      cat1Marks: {
        type: Number,
        required: true,
        min: 0,
        max: 100
      },
      cat2Marks: {
        type: Number,
        required: true,
        min: 0,
        max: 100
      },
      Total: {
        type: Number,
        required: true,
        min: 0,
      },
      Grade: {
        type: String,
        enum: ["S","A","B","C","D","E","U"],
      }
    },
  ],
});

module.exports = mongoose.model("SemMarks", semMarksSchema);
