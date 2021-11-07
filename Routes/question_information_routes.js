const express = require('express')
const advancedResults = require('../Middleware/advancedResults')
const Question = require('../Models/question_information')
const {
    getAllQuestions,
    createQuestion,
    getSectionQuestions,
    getQuestion,
    updateQuestions
} = require('../Controllers/question_information_controller')

const router = express.Router()

router.route('/').get(advancedResults(Question), getAllQuestions)
router.route('/').post(createQuestion)
router.route('/:id').get(getQuestion)
router.route('/:id').put(updateQuestions)
router.route('/:section_id').get(getSectionQuestions)

module.exports = router