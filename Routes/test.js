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
    deleteTest,
    getTestSections,
    getAssignedTest,
    getAllTestQuestions
} = require('../Controllers/test')

const router = express.Router()

router.route('/api/v1/test').get(advancedResults(Test), getAllTests)
router.route('/api/v1/test').post(protect, authorizeAdmin, createTest)
router.route('/api/v1/test/assigned').get(protect, getAssignedTest)
router.route('/api/v1/test/:id').get(getTest)
router.route('/api/v1/test/:id').put(protect, authorizeAdmin, updateTest)
router.route('/api/v1/test/:id').delete(protect, authorizeAdmin, deleteTest)
router.route('/api/v1/test/:id/sections').get(getTestSections)
router.route('/api/v1/test/:id/questions').get(getAllTestQuestions)

module.exports = router
