const express = require("express");
const advancedResults = require("../Middleware/advancedResults");
const Score = require("../Models/testScore");
const {protect, authorize, authorizeAdmin} = require("../Middleware/auth");
const {
  getAllScores,
  createScore,
  getScore,
  updateScore,
  deleteScore,
  getAllCandidateScores,
  getAllTestScores,
  getCandidateTestScores,
  getAllSelfScores,
  getSelfTestScores,
} = require("../Controllers/testScore");

const router = express.Router();

let baseRoute = "/api/v1/test-score";

router.route("/").get(advancedResults(Score), getAllScores);
router.route("/").post(createScore);
router.route("/self").get(protect, getAllSelfScores);
router.route("/:id").get(getScore);
router.route("/:id").put(updateScore);
router.route("/:id").delete(deleteScore);
router.route("/candidate/:candidate_id").get(getAllCandidateScores);
router.route("/test/:test_id").get(getAllTestScores);
router.route("/test/:test_id/candidate/:candidate_id").get(getCandidateTestScores);
router.route("/self/test/:test_id").get(protect, getSelfTestScores);

module.exports = router;
