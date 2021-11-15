const express = require('express')
const advancedResults = require('../Middleware/advancedResults')
const Score = require('../Models/score_details')
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
    getAllCandidateScores,
    getAllTestScores,
    getCandidateTestScores
} = require('../Controllers/score_details_controller')

const router = express.Router()

router.route('/api/v1/score/').get(protect, authorizeAdmin, advancedResults(Score), getAllScores)
router.route('/api/v1/score/').post(protect, authorize, createScore)
router.route('/api/v1/score/:id').get(protect, authorize, getScore)
router.route('/api/v1/score/:id').put(protect, authorize, updateScore)
router.route('/api/v1/score/:candidate_id').get(protect, authorizeAdmin, getAllCandidateScores)
router.route('/api/v1/score/:test_id').get(protect, authorizeAdmin, getAllTestScores)
router.route('/api/v1/score/:test_id/:candidate_id').get(protect, authorizeAdmin, getCandidateTestScores)
// TODO: 
// Add get self score for a test
// Add get self.score for all test

module.exports = router