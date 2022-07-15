const Section = require("../Models/section");
const Test = require("../Models/test");
const Question = require("../Models/question");
const {ErrorResponseJSON, SuccessResponseJSON} = require("../Utils/errorResponse");
const getTestTimer = require("../Utils/getTestTimer");
const asyncHandler = require("../Middleware/async");
const {youtube_parser} = require("../Utils/videoUtils");
const { populateTestDetails } = require("./test");
const advancedResults = require("../Middleware/advancedResults");
const { getPassedCandidates } = require("./candidate");

exports.populateSectionDetails = {path: "test questions", select: "-correct_answers"}
// exports.populateSectionDetails = undefined

// @desc    Get all sections
// @route   GET    /api/v1/section
// @route   GET    /api/v1/test/:testId/section
// @access  Private
exports.getAllSections = asyncHandler(async (req, res, next) => {
  const {testId} = req.params
  if (testId) {
    const sections = await Section.find({test: testId}).populate(this.populateSectionDetails);
    return new SuccessResponseJSON(res, sections);
  }
  res.status(200).json(res.advancedResults);
});

// @desc    Create section
// @route   POST    /api/v1/section
// @access  Private
exports.createSection = asyncHandler(async (req, res, next) => {
  const existingSection = await Section.findOne({
    title: req.body.title,
    test: req.body.test,
  });
  if (existingSection) 
    return new ErrorResponseJSON(res, "This section already exists. Update it instead!", 400);

  const {videoUrl} = req.body;
  if (videoUrl) req.body.videoUrl = youtube_parser(videoUrl);

  const section = await Section.create(req.body);
  if (!section) return new ErrorResponseJSON(res, "Invalid Section Details!", 400);

  await getTestTimer(section); // Calculate the test timer from section timers

  return new SuccessResponseJSON(res, section, 201);
});

// @desc    Get section
// @route   GET    /api/v1/section/:id
// @access  Private
exports.getSection = asyncHandler(async (req, res, next) => {
  const section = await Section.findById(req.params.id).populate({path: "test", select: "title timer"});

  if (!section) return new ErrorResponseJSON(res, "Section not Found!", 400);
  
  return new SuccessResponseJSON(res, section);
});

// @desc    Update section
// @route   PUT    /api/v1/section/:id
// @access  Private
exports.updateSection = asyncHandler(async (req, res, next) => {
  const {videoUrl} = req.body;

  if (videoUrl) req.body.videoUrl = youtube_parser(videoUrl);

  const section = await Section.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!section) return new ErrorResponseJSON(res, "Invalid Section Details!", 400);
  
  await getTestTimer(section); // Calculate the test timer from section timers

  return new SuccessResponseJSON(res, section);
});

// @desc    Delete section
// @route   DELETE    /api/v1/section/:id
// @access  Private
exports.deleteSection = asyncHandler(async (req, res, next) => {
  const section = await Section.findByIdAndDelete(req.params.id);
  if (!section) return new ErrorResponseJSON(res, "Section not found!", 404);
  
  return new SuccessResponseJSON(res);
});

// @desc    Get all sections in a test
// @route   GET    /api/v1/section/test/:testId
// @access  Private
exports.getTestSections = asyncHandler(async (req, res, next) => {
  const sections = await Section.find({test: req.params.testId}).populate(this.populateSectionDetails);

  return new SuccessResponseJSON(res, sections);
});

// @desc    Get sections assigned to the authenticated candidate
// @route   GET    /api/v1/section/assigned
// @access  Private
exports.getAssignedTestSections = asyncHandler(async (req, res, next) => {
  // const {examType} = req.candidate;
  if (!req.candidate.examType) return new ErrorResponseJSON(res, "Assigned Test not Configured!", 404);
  
  const sections = await Section.find({test: examType});

  return new SuccessResponseJSON(res, sections);
});
