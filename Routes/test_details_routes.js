const express = require('express')
const {
    getAllTests,
    createTest,
    getTest,
    updateTest
} = require('../Controllers/test_details_controller')

const router = express.Router()

router.route('/').get(getAllTests)
router.route('/').post(createTest)
router.route('/:id').get(getTest)
router.route('/:id').put(updateTest)

module.exports = router