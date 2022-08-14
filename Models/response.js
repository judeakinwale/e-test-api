const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ErrorResponse = require("../Utils/errorResponse");


// Candidate Response
const Response = new Schema({
  candidate: {
    type: mongoose.Schema.ObjectId,
    ref: "candidate",
    // required: true
  },
  test: {
    type: mongoose.Schema.ObjectId,
    ref: "test",
    // required: true
  },
  section: {
    type: mongoose.Schema.ObjectId,
    ref: "section",
    // required: true
  },
  question: {
    type: mongoose.Schema.ObjectId,
    ref: "question",
    required: true,
  },
  selected_answers: [
    {
      type: String,
      required: true,
    },
  ],
});

// Response.pre("save", async (next) => [
//     if (!req.candidate) {
//         ErrorResponse
//     }
// ])

module.exports = mongoose.model("candidate_response", Response);
