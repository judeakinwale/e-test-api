const mongoose  = require("mongoose");
const Schema = mongoose.Schema;
const Question = require("./question")

const SectionInformation = new Schema({
    title: {
        type: String,
        required: [true, "Please enter section title"],
    },
    timer: {
        type: Number,
        default: 0
    },
    instruction: {
        type: String,
        required: [true, "Please enter section instruction"],
    },
    test: {
        type: mongoose.Schema.ObjectId,
        ref: "test",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

SectionInformation.pre('remove', async function(next) {
    // 'this' is the client being removed. Provide callbacks here if you want
    // to be notified of the calls' result.
    Question.remove({section: this._id}).exec();
    next();
});

module.exports = mongoose.model('section', SectionInformation);