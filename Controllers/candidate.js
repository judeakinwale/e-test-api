const Candidate = require("../Models/candidate");
const TestScore = require("../Models/testScore");
const {ErrorResponseJSON} = require("../Utils/errorResponse");
const asyncHandler = require("../Middleware/async");

// @desc    Get all candidate
// @route   GET     /api/v1/candidate
// @access  Public
exports.getAllCandidates = asyncHandler(async (req, res, next) => {
  // res.status(200).json(res.advancedResults);

  const candidates = await Candidate.find().populate({path: "examType", select: "title timer"});

  if (!candidates || candidates.length < 1) {
    return res.status(404).json({
      success: false,
      message: "There are no candidates",
    });
  }
  res.status(200).json({
    success: true,
    data: candidates,
  });
});

// @desc    Create candidate
// @route   POST    /api/v1/candidate
// @access  Private
exports.createCandidate = asyncHandler(async (req, res, next) => {
  const existingCandidate = await Candidate.findOne({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  });

  if (existingCandidate) {
    return res.status(400).json({
      success: false,
      message: "This account already exists, log in instead",
    });
  }

  const candidate = await Candidate.create(req.body);

  if (!candidate) {
    return res.status(400).json({
      success: false,
      message: "Invalid candidate details",
    });
    // return next(new ErrorResponseJSON(res, "An Error Occured, Please Tray Again", 400));
  }
  res.status(201).json({
    success: true,
    data: candidate,
  });
});

// @desc    Get candidate
// @route   GET     /api/v1/candidate/:id
// @access  Private
exports.getCandidate = asyncHandler(async (req, res, next) => {
  const candidate = await Candidate.findById(req.params.id).populate({path: "examType", select: "title timer"});

  if (!candidate) {
    return res.status(404).json({
      success: false,
      message: "Candidate not found",
    });
  }
  res.status(200).json({
    success: true,
    data: candidate,
  });
});

// @desc    Update candidate
// @route   PUT    /api/v1/candidate/:id
// @access  Private
exports.updateCandidate = asyncHandler(async (req, res, next) => {
  const candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!candidate) {
    return res.status(400).json({
      success: false,
      message: "Invalid candidate details",
    });
  }
  res.status(200).json({
    success: true,
    data: candidate,
  });
});

// @desc    Delete candidate
// @route   DELETE    /api/v1/candidate/:id
// @access  Private
exports.deleteCandidate = asyncHandler(async (req, res, next) => {
  const candidate = await Candidate.findByIdAndDelete(req.params.id);

  if (!candidate) {
    return res.status(404).json({
      success: false,
      message: "Candidate not found",
    });
  }
  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc    Get currently authenticated candidate
// @route   GET    /api/v1/candidate/self
// @access  Private
exports.getSelf = asyncHandler(async (req, res, next) => {
  const candidate = await Candidate.findById(req.candidate._id).populate({path: "examType", select: "title timer"});

  if (!candidate) {
    return res.status(404).json({
      success: false,
      message: "Candidate not found",
    });
  }
  res.status(200).json({
    success: true,
    data: candidate,
  });
});

// @desc    Get currently authenticated candidate
// @route   PUT    /api/v1/candidate/self
// @access  Private
exports.updateSelf = asyncHandler(async (req, res, next) => {
  const candidate = await Candidate.findByIdAndUpdate(req.candidate._id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!candidate) {
    return res.status(400).json({
      success: false,
      message: "Invalid candidate details",
    });
  }
  res.status(200).json({
    success: true,
    data: candidate,
  });
});

// @desc    Get candidates that passed their test
// @route   GET    /api/v1/candidate/passed
// @access  Private
exports.getPassedCandidates = asyncHandler(async (req, res, next) => {
  // const candidate = await Candidate.findById(req.candidate._id)
  const testScores = await TestScore.find().populate([
    {path: "candidate", select: "firstName lastName email"},
    {path: "test", select: "title timer"},
  ]);
  let candidates = [];

  for (let x = 0; x < testScores.length; x++) {
    let test = testScores[x];
    if (test.score >= 50) {
      candidates.push(test.candidate);
    }
  }

  if (!candidates || candidates.length < 1) {
    return res.status(404).json({
      success: false,
      message: "Candidate not found",
    });
  }
  res.status(200).json({
    success: true,
    data: candidates,
  });
});

// @desc    Get candidates that failed their test
// @route   GET    /api/v1/candidate/failed
// @access  Private
exports.getFailedCandidates = asyncHandler(async (req, res, next) => {
  // const candidate = await Candidate.findById(req.candidate._id)
  const testScores = await TestScore.find().populate([
    {path: "candidate", select: "firstName lastName email"},
    {path: "test", select: "title timer"},
  ]);
  let candidates = [];

  for (let x = 0; x < testScores.length; x++) {
    let test = testScores[x];
    if (test.score < 50) {
      candidates.push(test.candidate);
    }
  }

  if (!candidates || candidates.length < 1) {
    return res.status(404).json({
      success: false,
      message: "Candidate not found",
    });
  }
  res.status(200).json({
    success: true,
    data: candidates,
  });
});
