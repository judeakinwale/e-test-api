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

router.route('/').get(getCompanyProfile)
router.route('/').post(protect, authorizeAdmin, createCompanyProfile)
router.route('/:id').put(protect, authorizeAdmin, updateCompanyProfile)

module.exports = router