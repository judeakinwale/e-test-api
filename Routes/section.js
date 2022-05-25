const express = require("express");
const advancedResults = require("../Middleware/advancedResults");
const Section = require("../Models/section");
const {protect, authorize, authorizeAdmin} = require("../Middleware/auth");
const {
  getAllSections,
  createSection,
  getTestSections,
  getAssignedTestSections,
  getSection,
  updateSection,
  deleteSection,
} = require("../Controllers/section");

const router = express.Router();

router.route("/api/v1/section/").get(advancedResults(Section), getAllSections);
router.route("/api/v1/section/").post(protect, authorizeAdmin, createSection);
router.route("/api/v1/section/assigned").get(protect, getAssignedTestSections);
router.route("/api/v1/section/:id").get(getSection);
router.route("/api/v1/section/:id").put(updateSection);
router.route("/api/v1/section/:id").delete(protect, authorizeAdmin, deleteSection);
router.route("/api/v1/section/test/:test_id").get(getTestSections);

module.exports = router;
