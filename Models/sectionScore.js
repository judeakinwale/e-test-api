const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const SectionScore = new Schema({
    candidate: {
        type: mongoose.Schema.ObjectId,
        ref: 'candidate',
        required: true
    },
    test: {
        type: mongoose.Schema.ObjectId,
        ref: "test",
        required: false
    },
    section: {
        type: mongoose.Schema.ObjectId,
        ref: "section",
        required: true
    },
    score: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('section_score', SectionScore)