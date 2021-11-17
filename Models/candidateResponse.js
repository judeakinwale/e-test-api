const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CandidateResponse = new Schema({
    candidate: {
        type: mongoose.Schema.ObjectId,
        ref: "candidate",
        required: true
    },
    test: {
        type: mongoose.Schema.ObjectId,
        ref: "test",
        required: true
    },
    question: {
        type: mongoose.Schema.ObjectId,
        ref: "question",
        required: true
    },
    selected_answer: {
        type: String,
        required: true
    },
});