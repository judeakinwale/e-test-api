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

router.route('/api/v1/section/').get(protect, authorize, advancedResults(Section), getAllSections)
router.route('/api/v1/section/').post(protect, authorizeAdmin, createSection)
router.route('/api/v1/section/:id').get(protect, authorize, getSection)
router.route('/api/v1/section/:id').put(protect, authorizeAdmin, updateSections)
router.route('/api/v1/section/:test_id').get(protect, authorize, getTestSections)

module.exports = router