const Response = require("../Models/response");
const Question = require("../Models/question");
const {ErrorResponseJSON, SuccessResponseJSON} = require("../Utils/errorResponse");
const getSectionScore = require("../Utils/getSectionScore");
const asyncHandler = require("../Middleware/async");
const {checkInstance} = require("../Utils/queryUtils")


exports.populateResponse = {path: "candidate test section question"}


// @desc    Get all candidate response
// @route   GET     /api/v1/candidate-response
// @access  Public
exports.getAllResponses = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});


// @desc    Create candidate response
// @route   POST    /api/v1/candidate-response
// @access  Private
exports.createResponse = asyncHandler(async (req, res, next) => {
  const existingResponse = await Response.findOne({
    candidate: req.candidate.id,
    question: req.body.question,
  }); //checks if candidate response exists

  // const response = await Response.create(req.body)

  let response;

  if (existingResponse) {
    existingResponse.selected_answers = req.body.selected_answers;
    await existingResponse.save();

    response = await existingResponse;
  } else {
    response = await Response.create(req.body); //create candidate response
  }

  if (!response) {
    return res.status(400).json({
      success: false,
      message: "Invalid candidate response details",
    });
    // return next(new ErrorResponseJSON(res, "An Error Occured, Please Tray Again", 400));
  }

  if (!req.candidate) {
    return res.status(400).json({
      success: false,
      message: "Candidate not found for candidate response details",
    });
  }

  question = await Question.findById(response.question);
  console.log(question);

  response.candidate = req.candidate.id;
  response.test = req.candidate.examType;
  response.section = response.question.section;

  await response.save();

  console.log(response);

  await getSectionScore(req, response);

  return new SuccessResponseJSON(res, response, 201)
});


// @desc    Create candidate response Depreciated
// @route   POST    /api/v1/candidate-response
// @access  Private
exports.createResponseDepreciated = asyncHandler(async (req, res, next) => {
  const existingResponse = await Response.findOne({
    candidate: req.candidate.id,
    question: req.body.question,
  }); //checks if candidate response exists

  // const response = await Response.create(req.body)

  let response;

  if (existingResponse) {
    existingResponse.selected_answers = req.body.selected_answers;
    await existingResponse.save();

    response = await existingResponse;
  } else {
    response = await Response.create(req.body); //create candidate response
  }

  if (!response) {
    return res.status(400).json({
      success: false,
      message: "Invalid candidate response details",
    });
    // return next(new ErrorResponseJSON(res, "An Error Occured, Please Tray Again", 400));
  }

  if (!req.candidate) {
    return res.status(400).json({
      success: false,
      message: "Candidate not found for candidate response details",
    });
  }

  question = await Question.findById(response.question);
  console.log(question);

  response.candidate = req.candidate.id;
  response.test = req.candidate.examType;
  response.section = question.section;

  await response.save();

  console.log(response);

  await getSectionScore(req, response);

  return new SuccessResponseJSON(res, response, 201)
});


// @desc    Get candidate response
// @route   GET     /api/v1/candidate-response/:id
// @access  Private
exports.getResponse = asyncHandler(async (req, res, next) => {
  const response = await Response.findById(req.params.id).populate([
    {path: "candidate", select: "firstName lastName email"},
    {path: "test", select: "title timer"},
    {path: "section", select: "title timer instruction test"},
    {path: "question", select: "question correct_answers section"},
  ]);

  if (!response) {
    return res.status(404).json({
      success: false,
      message: "Candidate response not found",
    });
  }
  res.status(200).json({
    success: true,
    data: response,
  });
});


// @desc    Update candidate response
// @route   PUT    /api/v1/candidate-response/:id
// @access  Private
exports.updateResponse = asyncHandler(async (req, res, next) => {
  const response = await Response.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!response) {
    return res.status(400).json({
      success: false,
      message: "Invalid candidate response details",
    });
  }

  question = await Question.findById(response.question);
  console.log(question);

  response.candidate = req.candidate.id;
  response.test = req.candidate.examType;
  response.section = question.section;

  await response.save();

  console.log(response);

  await getSectionScore(req, response);
  // await getSectionScore(response)

  res.status(200).json({
    success: true,
    data: response,
  });
});


// @desc    Delete candidate response
// @route   DELETE    /api/v1/candidate-response/:id
// @access  Private
exports.deleteResponse = asyncHandler(async (req, res, next) => {
  const response = await Response.findByIdAndDelete(req.params.id);

  if (!response) {
    return res.status(404).json({
      success: false,
      message: "Candidate response not found",
    });
  }
  res.status(200).json({
    success: true,
    data: {},
  });
});


// @desc    Get candidate response for a candidate using candidate id, test id and question id
// @route   GET    /api/v1/candidate-response/candidate/:candidate_id/test/:test_id/question/:question_id
// @access  Private
exports.getResponseByCandidateTestAndQuestion = asyncHandler(async (req, res, next) => {
  const response = await Response.findOne({
    candidate: req.params.candidate_id,
    test: req.params.test_id,
    question: req.params.question_id,
  }).populate(this.populateResponse);

  if (!response) {
    return res.status(404).json({
      success: false,
      message: "Candidate response not found",
    });
  }
  res.status(200).json({
    success: true,
    data: response,
  });
});


// @desc    Get currently authenticated candidate response
// @route   GET    /api/v1/candidate-response/question/:question_id
// @access  Private
exports.getResponseByQuestion = asyncHandler(async (req, res, next) => {
  const response = await Response.findOne({
    candidate: req.candidate._id,
    test: req.candidate.examType,
    question: req.params.question_id,
  }).populate(this.populateResponse);

  if (!response) {
    return res.status(404).json({
      success: false,
      message: "Candidate response not found",
    });
  }
  res.status(200).json({
    success: true,
    data: response,
  });
});

// 
// @desc    Get currently authenticated candidate response
// // @route   PUT    /api/v1/candidate-response/self
// // @access  Private
// exports.updateSelf = asyncHandler(async (req, res, next) => {
//     const response = await Response.findByIdAndUpdate(
//         req.candidate._id,
//         req.body,
//         {
//             new: true,
//             runValidators: true,
//         }
//     )

//     if (!response) {
//         return res.status(400).json({
//             success: false,
//             message: "Invalid candidate response details"
//         })
//     }
//     res.status(200).json({
//         success: true,
//         data: response
//     })
// })


exports.checkSectionInstance = async (req, res, query = {}) => {
  return await checkInstance(req, res, Section, this.populateSection, query, "Section")
}
