const express = require('express')
const advancedResults = require('../Middleware/advancedResults')
const Candidate = require('../Models/candidate_information')
const {
    getAllCandidates,
    createCandidate,
    getCandidate,
    updateCandidate
} = require('../Controllers/candidate_information_controller')

const router = express.Router()

router.route('/').get(advancedResults(Candidate), getAllCandidates)
router.route('/').post(createCandidate)
router.route('/:id').get(getCandidate)
router.route('/:id').put(updateCandidate)

module.exports = router