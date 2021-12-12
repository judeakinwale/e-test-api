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

router.route('/api/v1/section-score/').get(advancedResults(Score), getAllScores)
router.route('/api/v1/section-score/').post(createScore)
router.route('/api/v1/section-score/self').get(protect, getAllSelfScores)
router.route('/api/v1/section-score/:id').get(getScore)
router.route('/api/v1/section-score/:id').put(updateScore)
router.route('/api/v1/section-score/:id').delete(deleteScore)
router.route('/api/v1/section-score/candidate/:candidate_id').get(getAllCandidateScores)
router.route('/api/v1/section-score/test/:test_id').get(getAllTestScores)
router.route('/api/v1/section-score/section/:section_id').get(getAllSectionScores)
router.route('/api/v1/section-score/section/:section_id/candidate/:candidate_id').get(getCandidateSectionScores)
router.route('/api/v1/section-score/self/section/:section_id').get(protect, getSelfSectionScores)

module.exports = router