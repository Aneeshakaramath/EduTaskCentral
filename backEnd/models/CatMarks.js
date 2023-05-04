const mongoose = require("mongoose");

const catMarksSchema = new mongoose.Schema({
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
    enum: ["CAT_1", "CAT_2", "SEM"],
  },
  catWeightage: {
    type: Number,
    required: true,
    min: 0,
  },
  marks: [
    {
      name: {
        type: String,
        required: true,
      },
      catMarks: {
        type: Number,
        required: true,
        min: 0,
      },
      catMarksCoverted: {
        type: Number,
        required: true,
        min: 0,
      },
      assignmentMarks: {
        type: Number,
        required: true,
        min: 0,
      },
      Total: {
        type: Number,
        required: true,
        min: 0,
      },
    },
  ],
});

module.exports = mongoose.model("CatMarks", catMarksSchema);
