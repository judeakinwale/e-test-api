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
    updateTest
} = require('../Controllers/test')

const router = express.Router()

router.route('/api/v1/test/').get(protect, authorize, advancedResults(Test), getAllTests)
router.route('/api/v1/test/').post(protect, authorizeAdmin, createTest)
router.route('/api/v1/test/:id').get(protect, authorize, getTest)
router.route('/api/v1/test/:id').put(protect, authorizeAdmin, updateTest)

module.exports = router