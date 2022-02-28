const mongoose  = require("mongoose");
const Schema = mongoose.Schema;
const Section = require("./section")

const TestDetails = new Schema({
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

TestDetails.pre('remove', async (next) => {
    // 'this' is the client being removed. Provide callbacks here if you want
    // to be notified of the calls' result.
    Section.remove({test: this._id}).exec();

    const sections  = await Section.findById(this._id)


    // Submission.remove({client_id: this._id}).exec();
    next();
});

module.exports = mongoose.model('test', TestDetails);