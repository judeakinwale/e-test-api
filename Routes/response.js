const express = require("express");
const advancedResults = require("../Middleware/advancedResults");
const Response = require("../Models/response");
const {protect, authorize, authorizeAdmin} = require("../Middleware/auth");
const {
  getAllResponses,
  createResponse,
  getResponse,
  updateResponse,
  deleteResponse,
  getResponseByQuestion,
  getResponseByCandidateTestAndQuestion,
} = require("../Controllers/response");

const router = express.Router();

let baseRoute = "/api/v1/candidate-response"; 

router.route("").get(advancedResults(Response), getAllResponses);
router.route("").post(protect, createResponse);
router.route("/:id").get(protect, authorize, getResponse);
router.route("/:id").put(protect, authorize, updateResponse);
router.route("/:id").delete(protect, authorize, deleteResponse);
router.route("/question/:question_id").get(protect, authorize, getResponseByQuestion);
router
  .route("/candidate/:candidate_id/test/:test_id/question/:question_id")
  .get(protect, authorize, getResponseByCandidateTestAndQuestion);
// router.route('/self').put(protect, authorizeAdmin, updateSelf)

module.exports = router;
