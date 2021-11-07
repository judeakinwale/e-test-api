const express = require('express')
const advancedResults = require('../Middleware/advancedResults')
const Admin = require('../Models/admin_information')
const {
    getAllAdmins,
    createAdmin,
    getAdmin,
    updateAdmin
} = require('../Controllers/admin_information_controller')

const router = express.Router()

router.route('/').get(advancedResults(Admin), getAllAdmins)
router.route('/').post(createAdmin)
router.route('/:id').get(getAdmin)
router.route('/:id').put(updateAdmin)

module.exports = router