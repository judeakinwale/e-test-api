const express = require('express')
const advancedResults = require('../Middleware/advancedResults')
const Admin = require('../Models/admin_information')
const {
    protect,
    authorize,
    authorizeAdmin
} = require("../Middleware/auth");
const {
    getAllAdmins,
    createAdmin,
    getAdmin,
    updateAdmin
} = require('../Controllers/admin_information_controller')

const router = express.Router()

router.route('/').get(advancedResults(Admin), getAllAdmins)
router.route('/').post(createAdmin)
router.route('/:id').get(protect, authorizeAdmin, getAdmin)
router.route('/:id').put(protect, authorizeAdmin, updateAdmin)

module.exports = router