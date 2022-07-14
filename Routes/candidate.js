const express = require("express");
const advancedResults = require("../Middleware/advancedResults");
const Candidate = require("../Models/candidate");
const {protect, authorize, authorizeAdmin} = require("../Middleware/auth");
const {
  getAllCandidates,
  createCandidate,
  getCandidate,
  updateCandidate,
  deleteCandidate,
  getSelf,
  updateSelf,
  getPassedCandidates,
  getFailedCandidates,
} = require("../Controllers/candidate");

const router = express.Router();

let baseRoute = "/api/v1/candidate";

router.route("").get(advancedResults(Candidate), getAllCandidates);
router.route("").post(createCandidate);
router.route("/self").get(protect, authorize, getSelf);
router.route("/self").put(protect, authorize, updateSelf);
router.route("/passed").get(getPassedCandidates);
router.route("/failed").get(getFailedCandidates);
router.route("/:id").get(getCandidate);
router.route("/:id").put(protect, authorize, updateCandidate);
router.route("/:id").delete(protect, authorize, deleteCandidate);

module.exports = router;
