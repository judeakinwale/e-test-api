const express = require('express')
const advancedResults = require('../Middleware/advancedResults')
const Question = require('../Models/question')
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

router.route('/api/v1/question/').get(protect, authorize, advancedResults(Question), getAllQuestions)
router.route('/api/v1/question/').post(protect, authorizeAdmin, createQuestion)
router.route('/api/v1/question/:id').get(protect, authorize, getQuestion)
router.route('/api/v1/question/:id').put(protect, authorizeAdmin, updateQuestions)
router.route('/api/v1/question/:section_id').get(protect, authorize, getSectionQuestions)

module.exports = router