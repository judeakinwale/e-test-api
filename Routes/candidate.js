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
    deleteCandidate,
    getSelf,
    updateSelf
} = require('../Controllers/candidate')

const router = express.Router()

router.route('/api/v1/candidate').get(advancedResults(Candidate), getAllCandidates)
router.route('/api/v1/candidate').post(createCandidate)
router.route('/api/v1/candidate/self').get(protect, authorize, getSelf)
router.route('/api/v1/candidate/self').put(protect, authorize, updateSelf)
router.route('/api/v1/candidate/:id').get(getCandidate)
router.route('/api/v1/candidate/:id').put(protect, authorize, updateCandidate)
router.route('/api/v1/candidate/:id').delete(protect, authorize, deleteCandidate)

module.exports = router