const express = require('express')
const advancedResults = require('../Middleware/advancedResults')
// Admin model and auth controller
const Admin = require('../Models/admin')
const {
    adminLogin,
    adminLogout,
    adminAccount,
    adminForgotPassword,
    adminResetPassword,
} = require('../Controllers/admin_authentication')
// Candidate model and auth controller
const Candidate = require('../Models/candidate')
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

router.route("/api/v1/auth/admin/").post(adminLogin);
// router.route("/api/v1/auth/addEmail").post(addEmail);
// router.route("/api/v1/auth/verifyEmail").post(verifyEmail);
router.route("/api/v1/auth/admin/logout").post(adminLogout);
router.route("/api/v1/auth/admin/account").get(protect, authorizeAdmin, adminAccount);
router.route("/api/v1/auth/admin/forgotPassword").post(protect, authorizeAdmin, adminForgotPassword);
router.route("/api/v1/auth/admin/resetPassword").post(protect, authorizeAdmin, adminResetPassword);

router.route("/api/v1/auth/").post(login);
// router.route("/api/v1/auth/addEmail").post(addEmail);
// router.route("/api/v1/auth/verifyEmail").post(verifyEmail);
router.route("/api/v1/auth/logout").post(logout);
router.route("/api/v1/auth/account").get(protect, authorize, account);
router.route("/api/v1/auth/forgotPassword").post(protect, authorize, forgotPassword);
router.route("/api/v1/auth/resetPassword").post(protect, authorize, resetPassword);

module.exports = router