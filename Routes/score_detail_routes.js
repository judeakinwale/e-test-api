const express = require('express')
const advancedResults = require('../Middleware/advancedResults')
const Score = require('../Models/score_details')
const {
    getAllScores,
    createScore,
    getScore,
    updateScore,
    getAllCandidateScores,
    getAllTestScores,
    getCandidateTestScores
} = require('../Controllers/score_details_controller')

const router = express.Router()

router.route('/').get(advancedResults(Score), getAllScores)
router.route('/').post(createScore)
router.route('/:id').get(getScore)
router.route('/:id').put(updateScore)
router.route('/:candidate_id').get(getAllCandidateScores)
router.route('/:test_id').get(getAllTestScores)
router.route('/:test_id/:candidate_id').get(getCandidateTestScores)

module.exports = router