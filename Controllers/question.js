const Question = require("../Models/question");
const Section = require("../Models/section");
const Test = require("../Models/test");
const TestScore = require("../Models/testScore");
const {ErrorResponseJSON, SuccessResponseJSON} = require("../Utils/errorResponse");
const asyncHandler = require("../Middleware/async");
const {populateSectionDetails} = require("./section")
const {checkInstance} = require("../Utils/queryUtils")


exports.populateQuestion = {path: "section"}


// @desc    Get all questions
// @route   GET    /api/v1/question
// @access  Private
exports.getAllQuestions = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});


// @desc    Create question
// @route   POST    /api/v1/question
// @access  Private
exports.createQuestion = asyncHandler(async (req, res, next) => {
  await this.checkQuestionInstance(req, res, {question: req.body.question, section: req.body.section})

  const question = await Question.create(req.body);
  return new SuccessResponseJSON(res, question, 201)
});


// @desc    Get all questions in a section
// @route   GET    /api/v1/question/section/:section_id
// @access  Private
exports.getSectionQuestions = asyncHandler(async (req, res, next) => {
  const questions = await Question.find({section: req.params.section_id}).populate(this.populateQuestion);
  return new SuccessResponseJSON(res, questions)
});


// @desc    Get question
// @route   GET    /api/v1/question/:id
// @access  Private
exports.getQuestion = asyncHandler(async (req, res, next) => {
  const question = await this.checkQuestionInstance(req, res)
  return new SuccessResponseJSON(res, question)
});


// @desc    Update question
// @route   PUT    /api/v1/question/:id
// @access  Private
exports.updateQuestions = asyncHandler(async (req, res, next) => {
  const question = await Question.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
  return new SuccessResponseJSON(res, question)
});


// @desc    Delete question
// @route   DELETE    /api/v1/question/:id
// @access  Private
exports.deleteQuestion = asyncHandler(async (req, res, next) => {
  await Question.findByIdAndDelete(req.params.id);
  return new SuccessResponseJSON(res)
});


// // To Be Depreciated
// // @desc    Get questions assigned to the authenticated candidate
// // @route   GET    /api/v1/questions/assigned
// // @access  Private
// exports.getAssignedTestQuestions = asyncHandler(async (req, res, next) => {
//   const examType = await req.candidate.examType;
//   const assignedTest = await Test.findById(examType);
//   const sections = await Section.find({test: examType});
//   let questionSet = [];

//   const existingTestScore = await TestScore.findOne({
//     candidate: req.candidate.id,
//     test: req.candidate.examType,
//   });

//   if (existingTestScore && process.env.NODE_ENV === "production") {
//     return res.status(400).json({
//       success: false,
//       message: "You have taken this test",
//     });
//   }

//   for (let x = 0; x < sections.length; x++) {
//     section = sections[x];
//     questions = await Question.find({section: section})
//       .select("-correct_answers")
//       .populate({path: "section", select: "title timer instruction test"});
//     for (let i = 0; i < questions.length; i++) {
//       question = questions[i];
//       questionSet.push(question);
//     }
//   }
//   // console.log(questionSet)

//   if (!questionSet || questionSet.length < 1) {
//     return res.status(404).json({
//       success: false,
//       message: "Assigned Questions not found",
//     });
//   }
//   res.status(200).json({
//     success: true,
//     data: questionSet,
//   });
// });


exports.checkQuestionInstance = async (req, res, query = {}) => {
  return await checkInstance(req, res, Question, this.populateQuestion, query, "Question")
}
