const Express = require('express')
const {
    protect,
    authorize,
    authorizeAdmin
} = require("../Middleware/auth");
const {
    getCompanyProfile,
    createCompanyProfile,
    updateCompanyProfile
} = require('../Controllers/company_profilie_controller')

const router = Express.Router()

router.route('/api/v1/company/').get(getCompanyProfile)
router.route('/api/v1/company/').post(protect, authorizeAdmin, createCompanyProfile)
router.route('/api/v1/company/:id').put(protect, authorizeAdmin, updateCompanyProfile)

module.exports = router