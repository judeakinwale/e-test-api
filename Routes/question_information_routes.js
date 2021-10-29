const express = require('express')
const {
    getAllQuestions,
    createQuestion,
    getQuizQuestions,
    getQuestion,
    updateQuestions
} = require('../Controllers/question_information_controller')

const router = express.Router()

router.route('/').get(getAllQuestions)
router.route('/').post(createQuestion)
router.route('/:id').get(getQuestion)
router.route('/:id').put(updateQuestions)
router.route('/:quiz_id').get(getQuizQuestions)

module.exports = router