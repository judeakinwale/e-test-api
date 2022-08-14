const TestScore = require("../Models/testScore");
const {ErrorResponseJSON, SuccessResponseJSON} = require("../Utils/errorResponse");
const asyncHandler = require("../Middleware/async");
const {checkInstance} = require("../Utils/queryUtils");
const { response } = require("express");


exports.populateTestScore = {path: "candidate test"}


// @desc    Get all test scores
// @route   GET    /api/v1/test-score
// @access  Private
exports.getAllScores = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});


// @desc    Create test score
// @route   POST    /api/v1/test-score
// @access  Private
exports.createScore = asyncHandler(async (req, res, next) => {
  const query = {candidate: req.candidate.id, test: req.candidate.examType}
  await this.checkTestScoreInstance(req, res, query)

  const score = await TestScore.create(req.body);
  return new SuccessResponseJSON(res, score, 201)
});


// @desc    Get test score
// @route   GET    /api/v1/test-score/:id
// @access  Private
exports.getScore = asyncHandler(async (req, res, next) => {
  const score = await this.checkTestScoreInstance(req, response)
  return new SuccessResponseJSON(res, score)
});


// @desc    Update test score
// @route   PUT    /api/v1/test-score/:id
// @access  Private
exports.updateScore = asyncHandler(async (req, res, next) => {
  const score = await TestScore.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
  return new SuccessResponseJSON(res, score)
});


// @desc    Delete test score
// @route   DELETE    /api/v1/test-score/:id
// @access  Private
exports.deleteScore = asyncHandler(async (req, res, next) => {
  await TestScore.findByIdAndDelete(req.params.id);
  return new SuccessResponseJSON(res)
});


// @desc    Get all test scores for a candidate
// @route   GET    /api/v1/test-score/candidate/:candidateId
// @access  Private
exports.getAllCandidateScores = asyncHandler(async (req, res, next) => {
  const scores = await TestScore.find({candidate: req.params.candidateId}).populate(this.populateTestScore);
  return new SuccessResponseJSON(res, scores)
});


// @desc    Get all test scores for a test
// @route   GET    /api/v1/test-score/test/:testId
// @access  Private
exports.getAllTestScores = asyncHandler(async (req, res, next) => {
  const scores = await TestScore.find({test: req.params.testId}).populate(this.populateTestScore);
  return new SuccessResponseJSON(res, scores)
});


// @desc    Get all test scores for a specific test and candidate
// @route   GET    /api/v1/test-score/test/:testId/candidate/:candidateId
// @access  Private
exports.getCandidateTestScores = asyncHandler(async (req, res, next) => {
  const query = {candidate: req.params.candidateId, test: req.params.testId}
  const scores = await TestScore.find(query).populate(this.populateTestScore);
  return new SuccessResponseJSON(res, scores)
});


// @desc    Get all test scores for currently authenticated candidate
// @route   GET    /api/v1/test-score/self
// @access  Private
exports.getAllSelfScores = asyncHandler(async (req, res, next) => {
  const scores = await TestScore.find({candidate: req.candidate.id}).populate(this.populateTestScore);
  return new SuccessResponseJSON(res, scores)
});


// @desc    Get all test scores for a specific test and currently authenticated candidate
// @route   GET    /api/v1/test-score/self/test/:testId
// @access  Private
exports.getSelfTestScores = asyncHandler(async (req, res, next) => {
  const query = {candidate: req.candidate.id, test: req.params.testId}
  const scores = await TestScore.find(query).populate(this.populateTestScore);
  return new SuccessResponseJSON(res, scores)
});


exports.checkTestScoreInstance = async (req, res, query = {}) => {
  return await checkInstance(req, res, TestScore, this.populateTestScore, query, "Test Score")
}