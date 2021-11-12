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

router.route('/').get(protect, authorizeAdmin, advancedResults(Candidate), getAllCandidates)
router.route('/').post(protect, authorize, createCandidate)
router.route('/:id').get(protect, authorize, getCandidate)
router.route('/:id').put(protect, authorizeAdmin, updateCandidate)
// TODO: Add update self profile route

module.exports = router