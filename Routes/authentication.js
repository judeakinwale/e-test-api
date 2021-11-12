const express = require('express')
const advancedResults = require('../Middleware/advancedResults')
// Admin model and auth controller
const Admin = require('../Models/admin_information')
const {
    adminLogin,
    adminLogout,
    adminAccount,
    adminForgotPassword,
    adminResetPassword,
} = require('../Controllers/admin_authentication')
// Candidate model and auth controller
const Candidate = require('../Models/candidate_information')
const {
    login,
    logout,
    account,
    forgotPassword,
    resetPassword,
} = require('../Controllers/candidate_authentication')

const {
    protect,
    authorize,
    authorizeAdmin
} = require("../Middleware/auth");

const router = express.Router()

router.route("/admin/").post(adminLogin);
// router.route("/addEmail").post(addEmail);
// router.route("/verifyEmail").post(verifyEmail);
router.route("/admin/logout").post(adminLogout);
router.route("/admin/account").get(protect, authorizeAdmin, adminAccount);
router.route("/admin/forgotPassword").post(protect, authorizeAdmin, adminForgotPassword);
router.route("/admin/resetPassword").post(protect, authorizeAdmin, adminResetPassword);

router.route("/").post(login);
// router.route("/addEmail").post(addEmail);
// router.route("/verifyEmail").post(verifyEmail);
router.route("/logout").post(logout);
router.route("/account").get(protect, authorize, account);
router.route("/forgotPassword").post(protect, authorize, forgotPassword);
router.route("/resetPassword").post(protect, authorize, resetPassword);

module.exports = router