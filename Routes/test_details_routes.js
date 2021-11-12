const express = require('express')
const advancedResults = require('../Middleware/advancedResults')
const Test = require('../Models/test_details')
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
} = require('../Controllers/test_details_controller')

const router = express.Router()

router.route('/').get(protect, authorize, advancedResults(Test), getAllTests)
router.route('/').post(protect, authorizeAdmin, createTest)
router.route('/:id').get(protect, authorize, getTest)
router.route('/:id').put(protect, authorizeAdmin, updateTest)

module.exports = router