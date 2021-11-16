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
    updateAdmin,
    getSelf,
    updateSelf
} = require('../Controllers/admin_information_controller')

const router = express.Router()

router.route('/api/v1/admin/').get(advancedResults(Admin), getAllAdmins)
router.route('/api/v1/admin/').post(createAdmin)
router.route('/api/v1/admin/:id').get(protect, authorizeAdmin, getAdmin)
router.route('/api/v1/admin/:id').put(protect, authorizeAdmin, updateAdmin)
router.route('/api/v1/admin/self').get(protect, authorizeAdmin, getSelf)
router.route('/api/v1/admin/self').put(protect, authorizeAdmin, updateSelf)

module.exports = router