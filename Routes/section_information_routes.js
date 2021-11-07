const express = require('express')
const advancedResults = require('../Middleware/advancedResults')
const Section = require('../Models/section_information')
const {
    getAllSections,
    createSection,
    getTestSections,
    getSection,
    updateSections
} = require('../Controllers/section_information_controller')

const router = express.Router()

router.route('/').get(advancedResults(Section), getAllSections)
router.route('/').post(createSection)
router.route('/:id').get(getSection)
router.route('/:id').put(updateSections)
router.route('/:section_id').get(getTestSections)

module.exports = router