const express = require("express");
const advancedResults = require("../Middleware/advancedResults");
// Admin model and auth controller
const Admin = require("../Models/admin");
const {
  adminLogin,
  adminLogout,
  adminAccount,
  adminForgotPassword,
  adminResetPassword,
} = require("../Controllers/adminAuthentication");
// Candidate model and auth controller
const Candidate = require("../Models/candidate");
const {login, logout, account, forgotPassword, resetPassword} = require("../Controllers/candidateAuthentication");
const {protect, authorize, authorizeAdmin} = require("../Middleware/auth");

const router = express.Router();

let baseRoute = "/api/v1/auth";

router.route("/admin/").post(adminLogin);
// router.route("/addEmail").post(addEmail);
// router.route("/verifyEmail").post(verifyEmail);
router.route("/admin/logout").post(adminLogout);
router.route("/admin/account").get(protect, authorizeAdmin, adminAccount);
router.route("/admin/forgotPassword").post(adminForgotPassword);
router.route("/admin/resetPassword/:resettoken").post(adminResetPassword);

router.route("/").post(login);
// router.route("/addEmail").post(addEmail);
// router.route("/verifyEmail").post(verifyEmail);
router.route("/logout").post(logout);
router.route("/account").get(protect, authorize, account);
router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword/:resettoken").post(resetPassword);

module.exports = router;
