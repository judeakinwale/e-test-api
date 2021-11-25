const express = require('express')
const advancedResults = require('../Middleware/advancedResults')
const Section = require('../Models/section')
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
    updateSection,
    deleteSection
} = require('../Controllers/section');

const router = express.Router()

router.route('/api/v1/section/').get(protect, authorize, advancedResults(Section), getAllSections)
router.route('/api/v1/section/').post(protect, authorizeAdmin, createSection)
router.route('/api/v1/section/:id').get(protect, authorize, getSection)
router.route('/api/v1/section/:id').put(protect, authorizeAdmin, updateSection)
router.route('/api/v1/section/:id').delete(protect, authorize, deleteSection)
router.route('/api/v1/section/test/:test_id').get(protect, authorize, getTestSections)

module.exports = router