const mongoose  = require("mongoose");
const Schema = mongoose.Schema;

const SectionInformation = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
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

module.exports = mongoose.model('section', SectionInformation);