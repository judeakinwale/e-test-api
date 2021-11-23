const express = require('express')
const advancedResults = require('../Middleware/advancedResults')
const Score = require('../Models/sectionScore')
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
    getAllSectionScores,
    getCandidateSectionScores,
    getAllSelfScores,
    getSelfSectionScores
} = require('../Controllers/sectionScore')

const router = express.Router()

router.route('/api/v1/section-score/').get(protect, authorizeAdmin, advancedResults(Score), getAllScores)
router.route('/api/v1/section-score/').post(protect, authorize, createScore)
router.route('/api/v1/section-score/:id').get(protect, authorize, getScore)
router.route('/api/v1/section-score/:id').put(protect, authorize, updateScore)
router.route('/api/v1/section-score/:id').delete(protect, authorize, deleteScore)
router.route('/api/v1/section-score/candidate/:candidate_id').get(protect, authorizeAdmin, getAllCandidateScores)
router.route('/api/v1/section-score/test/:test_id').get(protect, authorizeAdmin, getAllTestScores)
router.route('/api/v1/section-score/section/:section_id').get(protect, authorizeAdmin, getAllSectionScores)
router.route('/api/v1/section-score/section/:section_id/candidate/:candidate_id').get(protect, authorizeAdmin, getCandidateSectionScores)
router.route('/api/v1/section-score/self').get(protect, authorize, getAllSelfScores)
router.route('/api/v1/section-score/self/section/:section_id').get(protect, authorize, getSelfSectionScores)

module.exports = router