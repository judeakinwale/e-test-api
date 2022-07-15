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
const {checkInstance} = require("../Utils/queryUtils")


exports.populateSectionDetails = {path: "test questions", select: "-correct_answers"}


// @desc    Get all sections
// @route   GET    /api/v1/section
// @route   GET    /api/v1/test/:testId/section
// @access  Private
exports.getAllSections = asyncHandler(async (req, res, next) => {
  if (!req.params.testId) return res.status(200).json(res.advancedResults);

  const sections = await Section.find({test: testId}).populate(this.populateSectionDetails);
  return new SuccessResponseJSON(res, sections);
});


// @desc    Create section
// @route   POST    /api/v1/section
// @access  Private
exports.createSection = asyncHandler(async (req, res, next) => {
  await this.checkSectionInstance(req, res, {title: req.body.title, test: req.body.test})

  if ("videoUrl" in req.body) req.body.videoUrl = youtube_parser(videoUrl);

  const section = await Section.create(req.body);
  await getTestTimer(section); // Calculate the test timer from section timers

  return new SuccessResponseJSON(res, section, 201);
});


// @desc    Get section
// @route   GET    /api/v1/section/:id
// @access  Private
exports.getSection = asyncHandler(async (req, res, next) => {
  // const section = await Section.findById(req.params.id).populate(this.populateSectionDetails);  
  const section = await this.checkSectionInstance(req, res)
  return new SuccessResponseJSON(res, section);
});


// @desc    Update section
// @route   PUT    /api/v1/section/:id
// @access  Private
exports.updateSection = asyncHandler(async (req, res, next) => {
  if ("videoUrl" in req.body) req.body.videoUrl = youtube_parser(videoUrl);
  
  const section = await Section.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
  await getTestTimer(section); // Calculate the test timer from section timers
  return new SuccessResponseJSON(res, section);
});


// @desc    Delete section
// @route   DELETE    /api/v1/section/:id
// @access  Private
exports.deleteSection = asyncHandler(async (req, res, next) => {
  await Section.findByIdAndDelete(req.params.id);
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
  if (!req.candidate.examType) return new ErrorResponseJSON(res, "Assigned Test not Configured!", 404);
  
  const sections = await Section.find({test: examType});
  return new SuccessResponseJSON(res, sections);
});


exports.checkSectionInstance = async (req, res, query = {}) => {
  return await checkInstance(req, res, Section, populateSection, query, "Section")
}
