const express = require("express");
const {protect, authorize, authorizeAdmin} = require("../Middleware/auth");
const {
  getCompanyProfile,
  createCompanyProfile,
  getCompanyProfileById,
  updateCompanyProfile,
  deleteCompanyProfile,
  getAllCompanyProfile,
  uploadLogo,
} = require("../Controllers/company");

const router = express.Router();

let baseRoute = "/api/v1/company";

router.route("/").get(getCompanyProfile);
router.route("/").post(protect, authorizeAdmin, createCompanyProfile);
router.route("/all").get(getAllCompanyProfile);
router.route("/upload-logo").post(protect, uploadLogo);
router.route("/:id").get(getCompanyProfileById);
router.route("/:id").put(protect, authorizeAdmin, updateCompanyProfile);
router.route("/:id").delete(protect, authorizeAdmin, deleteCompanyProfile);

module.exports = router;
