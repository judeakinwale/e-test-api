const express = require('express')
const advancedResults = require('../Middleware/advancedResults')
const Candidate = require('../Models/candidate')
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
} = require('../Controllers/candidate')

const router = express.Router()

router.route('/api/v1/candidate').get(advancedResults(Candidate), getAllCandidates)
router.route('/api/v1/candidate').post(createCandidate)
router.route('/api/v1/candidate/self').get(protect, authorize, getSelf)
router.route('/api/v1/candidate/self').put(protect, authorizeAdmin, updateSelf)
router.route('/api/v1/candidate/:id').get(protect, authorize, getCandidate)
router.route('/api/v1/candidate/:id').put(protect, authorizeAdmin, updateCandidate)

module.exports = router