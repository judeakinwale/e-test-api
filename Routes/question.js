const express = require("express");
const advancedResults = require("../Middleware/advancedResults");
const Question = require("../Models/question");
const {protect, authorize, authorizeAdmin} = require("../Middleware/auth");
const {
  getAllQuestions,
  createQuestion,
  getSectionQuestions,
  getQuestion,
  // getAssignedTestQuestions,
  updateQuestions,
  deleteQuestion,
} = require("../Controllers/question");

const router = express.Router();

let baseRoute = "/api/v1/question";

router.route("/").get(advancedResults(Question), getAllQuestions);
router.route("/").post(protect, authorizeAdmin, createQuestion);
// router.route("/assigned").get(protect, getAssignedTestQuestions);
router.route("/:id").get(getQuestion);
router.route("/:id").put(protect, authorizeAdmin, updateQuestions);
router.route("/:id").delete(protect, authorizeAdmin, deleteQuestion);
router.route("/section/:section_id").get(getSectionQuestions);

module.exports = router;
