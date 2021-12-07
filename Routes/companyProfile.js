const express = require('express')
const {
    protect,
    authorize,
    authorizeAdmin
} = require("../Middleware/auth");
const {
    getCompanyProfile,
    createCompanyProfile,
    getCompanyProfileById,
    updateCompanyProfile,
    deleteCompanyProfile,
    getAllCompanyProfile,
    uploadLogo,
} = require('../Controllers/companyProfile')

const router = express.Router()

router.route('/api/v1/company/').get(getCompanyProfile)
router.route('/api/v1/company/').post(protect, authorizeAdmin, createCompanyProfile)
router.route('/api/v1/company/all').get(getAllCompanyProfile)
router.route('/api/v1/company/upload-logo').post(protect, uploadLogo)
router.route('/api/v1/company/:id').get(getCompanyProfileById)
router.route('/api/v1/company/:id').put(protect, authorizeAdmin, updateCompanyProfile)
router.route('/api/v1/company/:id').delete(protect, authorizeAdmin, deleteCompanyProfile)

module.exports = router