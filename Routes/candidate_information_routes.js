const express = require('express')
const advancedResults = require('../Middleware/advancedResults')
const Candidate = require('../Models/candidate_information')
const {
    protect,
    authorize,
    authorizeAdmin
} = require("../Middleware/auth");
const {
    getAllCandidates,
    createCandidate,
    getCandidate,
    updateCandidate
} = require('../Controllers/candidate_information_controller')

const router = express.Router()

router.route('/api/v1/candidate/').get(protect, authorizeAdmin, advancedResults(Candidate), getAllCandidates)
router.route('/api/v1/candidate/').post(protect, authorize, createCandidate)
router.route('/api/v1/candidate/:id').get(protect, authorize, getCandidate)
router.route('/api/v1/candidate/:id').put(protect, authorizeAdmin, updateCandidate)
// TODO: Add update self profile route

module.exports = router