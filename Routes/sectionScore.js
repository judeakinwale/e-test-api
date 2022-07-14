const express = require("express");
const advancedResults = require("../Middleware/advancedResults");
const Score = require("../Models/sectionScore");
const {protect, authorize, authorizeAdmin} = require("../Middleware/auth");
const {
  getAllScores,
  createScore,
  getScore,
  updateScore,
  deleteScore,
  getAllCandidateScores,
  getAllTestScores,
  getAllSectionScores,
  getCandidateSectionScores,
  getAllSelfScores,
  getSelfSectionScores,
} = require("../Controllers/sectionScore");

const router = express.Router();

let baseRoute = "/api/v1/section-score";

router.route("/").get(advancedResults(Score), getAllScores);
router.route("/").post(createScore);
router.route("/self").get(protect, getAllSelfScores);
router.route("/:id").get(getScore);
router.route("/:id").put(updateScore);
router.route("/:id").delete(deleteScore);
router.route("/candidate/:candidate_id").get(getAllCandidateScores);
router.route("/test/:test_id").get(getAllTestScores);
router.route("/section/:section_id").get(getAllSectionScores);
router.route("/section/:section_id/candidate/:candidate_id").get(getCandidateSectionScores);
router.route("/self/section/:section_id").get(protect, getSelfSectionScores);

module.exports = router;
