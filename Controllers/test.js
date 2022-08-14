const Test = require("../Models/test");
const Section = require("../Models/section");
const Question = require("../Models/question");
const TestScore = require("../Models/testScore");
const {ErrorResponseJSON, SuccessResponseJSON} = require("../Utils/errorResponse");
const asyncHandler = require("../Middleware/async");
const {youtube_parser} = require("../Utils/videoUtils");
const {checkInstance} = require("../Utils/queryUtils")


exports.populateTest = {path: "sections", populate: { path: "questions", model: "question", select: "-correct_answers"}}


// @desc    Get all tests
// @route   GET    /api/v1/test
// @access  Private
exports.getAllTests = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});


// @desc    Create test
// @route   POST    /api/v1/test
// @access  Private
exports.createTest = asyncHandler(async (req, res, next) => {
  if ("videoUrl" in req.body) req.body.videoUrl = youtube_parser(req.body.videoUrl);
  // req.body.videoUrl = youtube_parser(req.body.videoUrl) || undefined  //alternative

  const test = await Test.create(req.body);
  return new SuccessResponseJSON(res, test, 201);
});


// @desc    Get test
// @route   GET    /api/v1/test/:id
// @access  Private
exports.getTest = asyncHandler(async (req, res, next) => {
  const test = await this.checkTestInstance(req, res)
  return new SuccessResponseJSON(res, test);
});


// @desc    Update test
// @route   PUT    /api/v1/test/:id
// @access  Private
exports.updateTest = asyncHandler(async (req, res, next) => {
  if ("videoUrl" in req.body) req.body.videoUrl = youtube_parser(req.body.videoUrl);

  const test = await Test.findByIdAndUpdate(req.params.id, req.body, {new: true,runValidators: true});
  return new SuccessResponseJSON(res, test);
});


// @desc    Delete test
// @route   DELETE    /api/v1/test/:id
// @access  Private
exports.deleteTest = asyncHandler(async (req, res, next) => {
  const test = await Test.findByIdAndDelete(req.params.id);
  return new SuccessResponseJSON(res, test);
});


// @desc    Get test assigned to the authenticated candidate
// @route   GET    /api/v1/test/assigned
// @access  Private
exports.getAssignedTest = asyncHandler(async (req, res, next) => {
  const {id, examType} = req.candidate;
  if (!examType) return new ErrorResponseJSON(res, "Assigned Test not Configured!", 400);

  const assignedTest = await Test.findById(examType);
  if (!assignedTest) return new ErrorResponseJSON(res, "Assigned Test not found!", 404);

  const existingTestScore = await TestScore.findOne({candidate: id, test: examType});
  if (process.env.NODE_DEV == "development") await delete(existingTestScore)  // Not sure this works  // TODO: Change this logic
  if (existingTestScore) return new ErrorResponseJSON(res, "You Have Taken This Test!", 400);

  return new SuccessResponseJSON(res, assignedTest);
});


// To Be Depreciated
// @desc    Get all questions and sections in a test
// @route   GET    /api/v1/test/:testId/questions
// @access  Private
exports.getAllTestQuestions = asyncHandler(async (req, res, next) => {
  const sections = await Section.find({test: req.params.testId});
  if (sections.length < 1) return new ErrorResponseJSON(res, "Sections not found!", 404);

  let allQuestions = [];
  for (const [key, section] of Object.entries(sections)) {
    const questions = await Question.find({section: section.id}).populate("section");
    allQuestions.push({section, questions});
  }
  if (allQuestions.length < 1) return new ErrorResponseJSON(res, "Questions not found!", 404);

  return new SuccessResponseJSON(res, allQuestions);
});


exports.checkTestInstance = async (req, res, query = {}) => {
  return await checkInstance(req, res, Test, this.populateTest, query, "Test")
}
