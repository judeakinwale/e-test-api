const express = require("express");
const advancedResults = require("../Middleware/advancedResults");
const Score = require("../Models/sectionScore");
const {protect, authorize, authorizeAdmin} = require("../Middleware/auth");
const {
  populateSectionScore,
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

router.route("/").get(advancedResults(Score, populateSectionScore), getAllScores);
router.route("/").post(createScore);
router.route("/self").get(protect, getAllSelfScores);
router.route("/:id").get(getScore);
router.route("/:id").put(updateScore);
router.route("/:id").delete(deleteScore);
router.route("/candidate/:candidateId").get(getAllCandidateScores);
router.route("/test/:testId").get(getAllTestScores);
router.route("/section/:sectionId").get(getAllSectionScores);
router.route("/section/:sectionId/candidate/:candidateId").get(getCandidateSectionScores);
router.route("/self/section/:sectionId").get(protect, getSelfSectionScores);

module.exports = router;
