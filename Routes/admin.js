const express = require('express')
const advancedResults = require('../Middleware/advancedResults')
const Admin = require('../Models/admin')
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
    deleteAdmin,
    getSelf,
    updateSelf
} = require('../Controllers/admin')

const router = express.Router()

router.route('/api/v1/admin/').get(advancedResults(Admin), getAllAdmins)
router.route('/api/v1/admin/').post(createAdmin)
router.route('/api/v1/admin/self').get(protect, authorizeAdmin, getSelf)
router.route('/api/v1/admin/self').put(protect, authorizeAdmin, updateSelf)
router.route('/api/v1/admin/:id').get(protect, authorizeAdmin, getAdmin)
router.route('/api/v1/admin/:id').put(protect, authorizeAdmin, updateAdmin)
router.route('/api/v1/admin/:id').delete(protect, authorizeAdmin, deleteAdmin)

module.exports = router