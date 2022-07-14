const express = require("express");
const advancedResults = require("../Middleware/advancedResults");
const CandidateResponse = require("../Models/candidateResponse");
const {protect, authorize, authorizeAdmin} = require("../Middleware/auth");
const {
  getAllCandidateResponses,
  createCandidateResponse,
  getCandidateResponse,
  updateCandidateResponse,
  deleteCandidateResponse,
  getCandidateResponseByQuestion,
  getCandidateResponseByCandidateTestAndQuestion,
} = require("../Controllers/candidateResponse");

const router = express.Router();

let baseRoute = "/api/v1/candidate-response";

router.route("").get(advancedResults(CandidateResponse), getAllCandidateResponses);
router.route("").post(protect, createCandidateResponse);
router.route("/:id").get(protect, authorize, getCandidateResponse);
router.route("/:id").put(protect, authorize, updateCandidateResponse);
router.route("/:id").delete(protect, authorize, deleteCandidateResponse);
router.route("/question/:question_id").get(protect, authorize, getCandidateResponseByQuestion);
router
  .route("/candidate/:candidate_id/test/:test_id/question/:question_id")
  .get(protect, authorize, getCandidateResponseByCandidateTestAndQuestion);
// router.route('/self').put(protect, authorizeAdmin, updateSelf)

module.exports = router;
