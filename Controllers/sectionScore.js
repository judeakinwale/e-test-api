const SectionScore = require("../Models/sectionScore");
const TestScore = require("../Models/testScore");
const {ErrorResponseJSON, SuccessResponseJSON} = require("../Utils/errorResponse");
const {getTestScore} = require("../Utils/getTestScore");
const asyncHandler = require("../Middleware/async");
const {checkInstance} = require("../Utils/queryUtils")


exports.populateSectionScore = "candidate test section"


// @desc    Get all section scores
// @route   GET    /api/v1/section-score
// @access  Private
exports.getAllScores = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});


// @desc    Create section score
// @route   POST    /api/v1/section-score
// @access  Private
exports.createScore = asyncHandler(async (req, res, next) => {
  const score = await SectionScore.create(req.body);
  await getTestScore(score);  // Calculate the test scores from the section scores

  return new SuccessResponseJSON(res, score, 201)
});


// @desc    Get section score
// @route   GET    /api/v1/section-score/:id
// @access  Private
exports.getScore = asyncHandler(async (req, res, next) => {
  const scores = await this.checkSectionScoreInstance(req, res)
  return new SuccessResponseJSON(res, scores)
});


// @desc    Update section score
// @route   PUT    /api/v1/section-score/:id
// @access  Private
exports.updateScore = asyncHandler(async (req, res, next) => {
  const score = await SectionScore.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
  await getTestScore(score);  // Calculate the test scores from the section scores

  return new SuccessResponseJSON(res, score)
});


// @desc    Delete section score
// @route   DELETE    /api/v1/section-score/:id
// @access  Private
exports.deleteScore = asyncHandler(async (req, res, next) => {
  await SectionScore.findByIdAndDelete(req.params.id);
  return new SuccessResponseJSON(res)
});


// @desc    Get all section scores for a candidate
// @route   GET    /api/v1/section-score/candidate/:candidateId
// @access  Private
exports.getAllCandidateScores = asyncHandler(async (req, res, next) => {
  const scores = await SectionScore.find({candidate: req.params.candidateId}).populate(populateSectionScore);
  return new SuccessResponseJSON(res, scores)
});


// @desc    Get all section scores for a test
// @route   GET    /api/v1/section-score/test/:testId
// @access  Private
exports.getAllTestScores = asyncHandler(async (req, res, next) => {
  const scores = await SectionScore.find({test: req.params.testId}).populate(populateSectionScore);
  return new SuccessResponseJSON(res, scores)
});


// @desc    Get all section scores for a specific section
// @route   GET    /api/v1/section-score/section/:sectionId
// @access  Private
exports.getAllSectionScores = asyncHandler(async (req, res, next) => {
  const scores = await SectionScore.find({section: req.params.sectionId}).populate(populateSectionScore);
  return new SuccessResponseJSON(res, scores)
});


// @desc    Get all section scores for a specific section and candidate
// @route   GET    /api/v1/section-score/section/:sectionId/candidate/:candidateId
// @access  Private
exports.getCandidateSectionScores = asyncHandler(async (req, res, next) => {
  const query = {candidate: req.params.candidateId, section: req.params.sectionId}
  const scores = await SectionScore.find(query).populate(populateSectionScore);
  return new SuccessResponseJSON(res, scores)
});


// @desc    Get all section scores for currently authenticated candidate
// @route   GET    /api/v1/section-score/self
// @access  Private
exports.getAllSelfScores = asyncHandler(async (req, res, next) => {
  const scores = await SectionScore.find({candidate: req.candidate.Id}).populate(populateSectionScore);
  return new SuccessResponseJSON(res, scores)
});


// @desc    Get all section scores for a specific section and currently authenticated candidate
// @route   GET    /api/v1/section-score/self/section/:sectionId
// @access  Private
exports.getSelfSectionScores = asyncHandler(async (req, res, next) => {
  const query = {candidate: req.candidate.Id, section: req.params.sectionId}
  const scores = await SectionScore.find(query).populate(populateSectionScore);
  return new SuccessResponseJSON(res, scores)
});


exports.checkSectionScoreInstance = async (req, res, query = {}) => {
  return await checkInstance(req, res, SectionScore, this.populateSectionScore, query, "Section Score")
}
