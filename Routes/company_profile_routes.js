const Express = require('express')
const {getCompanyProfile} = require('../Controllers/company_profilie_controller')

const router = Express.Router()

router.route('/').get(getCompanyProfile)

module.exports = router