const Express = require('express')
const {
    getCompanyProfile,
    createCompanyProfile,
    updateCompanyProfile
} = require('../Controllers/company_profilie_controller')

const router = Express.Router()

router.route('/').get(getCompanyProfile)
router.route('/').post(createCompanyProfile)
router.route('/:id').put(updateCompanyProfile)

module.exports = router