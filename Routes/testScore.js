const express = require('express')
const advancedResults = require('../Middleware/advancedResults')
const Score = require('../Models/testScore')
const {
    protect,
    authorize,
    authorizeAdmin
} = require("../Middleware/auth");
const {
    getAllScores,
    createScore,
    getScore,
    updateScore,
    deleteScore,
    getAllCandidateScores,
    getAllTestScores,
    getCandidateTestScores,
    getAllSelfScores,
    getSelfTestScores
} = require('../Controllers/testScore')

const router = express.Router()

router.route('/api/v1/test-score/').get(advancedResults(Score), getAllScores)
router.route('/api/v1/test-score/').post(createScore)
router.route('/api/v1/test-score/:id').get(getScore)
router.route('/api/v1/test-score/:id').put(updateScore)
router.route('/api/v1/test-score/:id').delete(deleteScore)
router.route('/api/v1/test-score/candidate/:candidate_id').get(getAllCandidateScores)
router.route('/api/v1/test-score/test/:test_id').get(getAllTestScores)
router.route('/api/v1/test-score/test/:test_id/candidate/:candidate_id').get(getCandidateTestScores)
router.route('/api/v1/test-score/self').get(getAllSelfScores)
router.route('/api/v1/test-score/self/test/:test_id').get(getSelfTestScores)

module.exports = router