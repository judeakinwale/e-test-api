const express = require("express");
const advancedResults = require("../Middleware/advancedResults");
const Test = require("../Models/test");
const {protect, authorize, authorizeAdmin} = require("../Middleware/auth");
const {
  populateTestDetails,
  getAllTests,
  createTest,
  getTest,
  updateTest,
  deleteTest,
  // getTestSections,
  getAssignedTest,
  // getAllTestQuestions,
} = require("../Controllers/test");

// Include other resource routers
const sectionRouter = require("./section");
const questionRouter = require("./question");

const router = express.Router();

let baseRoute = "/api/v1/test";

// Re-route into other resource routers
router.use("/:testId/sections", sectionRouter);
router.use("/:testId/questions", questionRouter);

router.route("/").get(advancedResults(Test, populateTestDetails), getAllTests);
router.route("/").post(protect, authorizeAdmin, createTest);
router.route("/assigned").get(protect, getAssignedTest);
router.route("/:id").get(getTest);
router.route("/:id").put(updateTest);
router.route("/:id").delete(protect, authorizeAdmin, deleteTest);
// router.route("/:testId/sections").get(getTestSections);
// router.route("/:testId/questions").get(getAllTestQuestions);

module.exports = router;
