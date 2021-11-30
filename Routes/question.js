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
    updateQuestions,
    deleteQuestion
} = require('../Controllers/question')

const router = express.Router()

router.route('/api/v1/question/').get(advancedResults(Question), getAllQuestions)
router.route('/api/v1/question/').post(protect, authorizeAdmin, createQuestion)
router.route('/api/v1/question/:id').get(getQuestion)
router.route('/api/v1/question/:id').put(protect, authorizeAdmin, updateQuestions)
router.route('/api/v1/question/:id').delete(protect, authorizeAdmin, deleteQuestion)
router.route('/api/v1/question/section/:section_id').get(getSectionQuestions)

module.exports = router