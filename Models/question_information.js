const mongoose  = require("mongoose");
const Schema = mongoose.Schema;

const QuestionInformation = new Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    question: {
        type: String,
        required: [true, "Please enter question"],
    },  
    correct_answer: {
        type: String,
        required: true
    },
    incorrect_answers: [{ type: String }],
    section: {
        type: mongoose.Schema.ObjectId,
        ref: "section",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('question', QuestionInformation);