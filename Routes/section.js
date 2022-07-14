const express = require("express");
const advancedResults = require("../Middleware/advancedResults");
const paramsHandler = require("../Middleware/params");
const Section = require("../Models/section");
const {protect, authorize, authorizeAdmin} = require("../Middleware/auth");
const {
  populateSectionDetails,
  getAllSections,
  createSection,
  getTestSections,
  getAssignedTestSections,
  getSection,
  updateSection,
  deleteSection,
} = require("../Controllers/section");

const questionRouter = require("./question");

const router = express.Router({mergeParams: true});

let baseRoute = "/api/v1/section";

router.use("/:sectionId/questions", questionRouter);

router.route("/").get(paramsHandler("test"), advancedResults(Section, populateSectionDetails), getAllSections);
router.route("/").post(protect, authorizeAdmin, createSection);
router.route("/assigned").get(protect, getAssignedTestSections);
router.route("/:id").get(getSection);
router.route("/:id").put(updateSection);
router.route("/:id").delete(protect, authorizeAdmin, deleteSection);
router.route("/test/:testId").get(getTestSections);

module.exports = router;
