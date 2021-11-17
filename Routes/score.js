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
    getAllCandidateScores,
    getAllTestScores,
    getCandidateTestScores,
    getAllSelfScores,
    getSelfTestScores
} = require('../Controllers/score')

const router = express.Router()

router.route('/api/v1/score/').get(protect, authorizeAdmin, advancedResults(Score), getAllScores)
router.route('/api/v1/score/').post(protect, authorize, createScore)
router.route('/api/v1/score/:id').get(protect, authorize, getScore)
router.route('/api/v1/score/:id').put(protect, authorize, updateScore)
router.route('/api/v1/score/:candidate_id').get(protect, authorizeAdmin, getAllCandidateScores)
router.route('/api/v1/score/:test_id').get(protect, authorizeAdmin, getAllTestScores)
router.route('/api/v1/score/:test_id/:candidate_id').get(protect, authorizeAdmin, getCandidateTestScores)
router.route('/api/v1/score/self').get(protect, authorize, getAllSelfScores)
router.route('/api/v1/score/self/:test_id').get(protect, authorize, getSelfTestScores)

module.exports = router