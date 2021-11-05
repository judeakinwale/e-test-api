const express = require('express')
const {
    getAllAdmins,
    createAdmin,
    getAdmin,
    updateAdmin
} = require('../Controllers/admin_information_controller')

const router = express.Router()

router.route('/').get(getAllAdmins)
router.route('/').post(createAdmin)
router.route('/:id').get(getAdmin)
router.route('/:id').put(updateAdmin)

module.exports = router