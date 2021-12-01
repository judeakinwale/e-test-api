const express = require('express')
const advancedResults = require('../Middleware/advancedResults')
const CandidateResponse = require('../Models/candidateResponse')
const {
    protect,
    authorize,
    authorizeAdmin
} = require("../Middleware/auth");
const {
    getAllCandidateResponses,
    createCandidateResponse,
    getCandidateResponse,
    updateCandidateResponse,
    deleteCandidateResponse,
    getCandidateResponseByTestAndQuestion,
} = require('../Controllers/candidateResponse')

const router = express.Router()

router.route('/api/v1/candidate-response').get(advancedResults(CandidateResponse), getAllCandidateResponses)
router.route('/api/v1/candidate-response').post(createCandidateResponse)
router.route('/api/v1/candidate-response/:id').get(protect, authorize, getCandidateResponse)
router.route('/api/v1/candidate-response/:id').put(protect, authorize, updateCandidateResponse)
router.route('/api/v1/candidate-response/:id').delete(protect, authorize, deleteCandidateResponse)
router.route('/api/v1/candidate-response/test/:test_id/question/:question_id').get(protect, authorize, getCandidateResponseByTestAndQuestion)
// router.route('/api/v1/candidate-response/self').put(protect, authorizeAdmin, updateSelf)

module.exports = router