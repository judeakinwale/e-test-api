const express = require('express')
const advancedResults = require('../Middleware/advancedResults')
const Question = require('../Models/question_information')
const {
    protect,
    authorize,
    authorizeAdmin
} = require("../Middleware/auth");
const {
    getAllQuestions,
    createQuestion,
    getSectionQuestions,
    getQuestion,
    updateQuestions
} = require('../Controllers/question_information_controller')

const router = express.Router()

router.route('/').get(protect, authorize, advancedResults(Question), getAllQuestions)
router.route('/').post(protect, authorizeAdmin, createQuestion)
router.route('/:id').get(protect, authorize, getQuestion)
router.route('/:id').put(protect, authorizeAdmin, updateQuestions)
router.route('/:section_id').get(protect, authorize, getSectionQuestions)

module.exports = router