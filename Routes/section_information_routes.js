const express = require('express')
const advancedResults = require('../Middleware/advancedResults')
const Section = require('../Models/section_information')
const {
    protect,
    authorize,
    authorizeAdmin
} = require("../Middleware/auth");
const {
    getAllSections,
    createSection,
    getTestSections,
    getSection,
    updateSections
} = require('../Controllers/section_information_controller')

const router = express.Router()

router.route('/').get(protect, authorize, advancedResults(Section), getAllSections)
router.route('/').post(protect, authorizeAdmin, createSection)
router.route('/:id').get(protect, authorize, getSection)
router.route('/:id').put(protect, authorizeAdmin, updateSections)
router.route('/:test_id').get(protect, authorize, getTestSections)

module.exports = router