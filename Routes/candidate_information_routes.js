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
    updateCandidate,
    getSelf,
    updateSelf
} = require('../Controllers/candidate_information_controller')

const router = express.Router()

router.route('/api/v1/candidate').get(advancedResults(Candidate), getAllCandidates)
router.route('/api/v1/candidate').post(createCandidate)
router.route('/api/v1/candidate/:id').get(protect, authorize, getCandidate)
router.route('/api/v1/candidate/:id').put(protect, authorizeAdmin, updateCandidate)
router.route('/api/v1/candidate/self').get(protect, authorize, getSelf)
router.route('/api/v1/candidate/self').put(protect, authorizeAdmin, updateSelf)

module.exports = router