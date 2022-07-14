const Test = require("../Models/test");
const Section = require("../Models/section");
const Question = require("../Models/question");
const TestScore = require("../Models/testScore");
const {ErrorResponseJSON, SuccessResponseJSON} = require("../Utils/errorResponse");
const asyncHandler = require("../Middleware/async");
const {youtube_parser} = require("../Utils/videoUtils");


exports.populateTestDetails = {path: "sections", populate: { path: "questions", model: "question",}}
// exports.populateTestDetails = undefined


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
  const {videoUrl} = req.body;
  if (videoUrl) req.body.videoUrl = youtube_parser(videoUrl);

  const test = await Test.create(req.body);
  if (!test) return new ErrorResponseJSON(res, "Invalid Test Details!", 400);

  return new SuccessResponseJSON(res, test, 201);
});


// @desc    Get test
// @route   GET    /api/v1/test/:id
// @access  Private
exports.getTest = asyncHandler(async (req, res, next) => {
  const test = await Test.findById(req.params.id);
  if (!test) return new ErrorResponseJSON(res, "Test not found!", 404);

  return new SuccessResponseJSON(res, test);
});


// @desc    Update test
// @route   PUT    /api/v1/test/:id
// @access  Private
exports.updateTest = asyncHandler(async (req, res, next) => {
  const {videoUrl} = req.body;
  if (videoUrl) req.body.videoUrl = youtube_parser(videoUrl);

  const test = await Test.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!test) return new ErrorResponseJSON(res, "Invalid Test Details!", 400);

  return new SuccessResponseJSON(res, test);
});


// @desc    Delete test
// @route   DELETE    /api/v1/test/:id
// @access  Private
exports.deleteTest = asyncHandler(async (req, res, next) => {
  const test = await Test.findByIdAndDelete(req.params.id);
  if (!test) return new ErrorResponseJSON(res, "Test not found!", 404);

  return new SuccessResponseJSON(res, test);
});


// To Be Moved to Section Controller
// @desc    Get all sections in a test
// @route   GET    /api/v1/test/:test_id/sections
// @access  Private
exports.getTestSections = asyncHandler(async (req, res, next) => {
  const sections = await Section.find({test: req.params.test_id});

  return new SuccessResponseJSON(res, sections);
});


// @desc    Get test assigned to the authenticated candidate
// @route   GET    /api/v1/test/assigned
// @access  Private
exports.getAssignedTest = asyncHandler(async (req, res, next) => {
  const {id, examType} = req.candidate;
  if (!examType) return new ErrorResponseJSON(res, "Assigned Test not Configured!", 400);

  const assignedTest = await Test.findById(examType);
  if (!assignedTest) return new ErrorResponseJSON(res, "Assigned Test not found!", 404);

  const existingTestScore = await TestScore.findOne({
    candidate: id,
    test: examType,
  });
  if (process.env.NODE_ENV === "production")
    if (existingTestScore) return new ErrorResponseJSON(res, "You Have Taken This Test!", 400);

  return new SuccessResponseJSON(res, assignedTest);
});


// To Be Depreciated
// @desc    Get all questions and sections in a test
// @route   GET    /api/v1/test/:test_id/questions
// @access  Private
exports.getAllTestQuestions = asyncHandler(async (req, res, next) => {
  const sections = await Section.find({test: req.params.test_id});
  if (sections.length < 1) return new ErrorResponseJSON(res, "Sections not found!", 404);

  let allQuestions = [];
  for (const [key, section] of Object.entries(sections)) {
    const questions = await Question.find({section: section._id}).populate("section");
    allQuestions.push({section, questions});
  }
  // for (let i = 0; i < sections.length; i++) {
  //   let section = sections[i];
  //   let question = await Question.find({section: section._id}).populate({
  //     path: "section",
  //     select: "title timer instruction",
  //   });
  //   questionSet = {
  //     section: section,
  //     allQuestions: question,
  //   };
  //   allQuestions.push(questionSet);
  // }

  if (allQuestions.length < 1) return new ErrorResponseJSON(res, "Questions not found!", 404);

  return new SuccessResponseJSON(res, allQuestions);
});
