const mongoose  = require("mongoose");
const Section = require("./section")
const Schema = mongoose.Schema;

const TestDetails = new Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: [true, "Please enter test title"],
    },
    timer: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

TestDetails.post("save", async function (next) {
    sections = Section.find({test: this});

    timer = 0;
    for (const section in sections) {
        timer += section.timer
    };
    this.timer = timer;
});

module.exports = mongoose.model('test', TestDetails);