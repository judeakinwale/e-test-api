const express = require('express')
const advancedResults = require('../Middleware/advancedResults')
const Test = require('../Models/test')
const {
    protect,
    authorize,
    authorizeAdmin
} = require("../Middleware/auth");
const {
    getAllTests,
    createTest,
    getTest,
    updateTest,
    getTestSections,
    getAllTestQuestions
} = require('../Controllers/test')

const router = express.Router()

router.route('/api/v1/test').get(protect, authorize, advancedResults(Test), getAllTests)
router.route('/api/v1/test').post(protect, authorizeAdmin, createTest)
router.route('/api/v1/test/:id').get(protect, authorize, getTest)
router.route('/api/v1/test/:id').put(protect, authorizeAdmin, updateTest)
router.route('/api/v1/test/:id/sections').get(protect, authorize, getTestSections)
router.route('/api/v1/test/:id/questions').get(protect, authorize, getAllTestQuestions)

module.exports = router