const mongoose  = require("mongoose");
const Schema = mongoose.Schema;

const QuestionInformation = new Schema({
    question: {
        type: String,
        required: [true, "Please enter question"],
    },  
    answers: [{ type: String }],
    correct_answers: [{
        type: String,
        required: true
    }],
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