const express = require("express");
const advancedResults = require("../Middleware/advancedResults");
const Admin = require("../Models/admin");
const {protect, authorize, authorizeAdmin} = require("../Middleware/auth");
const {
  getAllAdmins,
  createAdmin,
  getAdmin,
  updateAdmin,
  deleteAdmin,
  getSelf,
  updateSelf,
  uploadProfilePicture,
} = require("../Controllers/admin");

const router = express.Router();

let baseRoute = "/api/v1/admin";

router.route("/").get(advancedResults(Admin), getAllAdmins);
router.route("/").post(createAdmin);
router.route("/self").get(protect, getSelf);
router.route("/self").put(protect, authorizeAdmin, updateSelf);
router.route("/upload-profile").post(protect, authorizeAdmin, uploadProfilePicture);
router.route("/:id").get(protect, authorizeAdmin, getAdmin);
router.route("/:id").put(updateAdmin);
router.route("/:id").delete(protect, authorizeAdmin, deleteAdmin);

module.exports = router;
