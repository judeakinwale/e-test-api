const TestScore = require('../Models/testScore')
const ErrorResponse = require('../Utils/errorResponse')
const asyncHandler = require('../Middleware/async')
// @desc    Get all test scores
// @route   GET    /api/v1/test-score
// @access  Private
exports.getAllScores = asyncHandler(async (req, res, next) => {
    // res.status(200).json(res.advancedResults);

    const scores = await TestScore.find()

    if (!scores || scores.length < 1) {
        return res.status(404).json({
            success: false,
            message: "No scores found"
        })
    }
    res.status(200).json({
        success: true,
        data: scores
    })
})
// @desc    Create test score
// @route   POST    /api/v1/test-score
// @access  Private
exports.createScore = asyncHandler(async (req, res, next) => {
    const score = await TestScore.create(req.body)

    if (!score) {
        return res.status(400).json({
            success: false,
            message: "Invalid score details"
        })
    }
    res.status(201).json({
        success: true,
        data: score
    })
})
// @desc    Get test score
// @route   GET    /api/v1/test-score/:id
// @access  Private
exports.getScore = asyncHandler(async (req, res, next) => {
    const scores = await TestScore.findById(req.params.id)

    if (!scores || scores.length < 1) {
        return res.status(404).json({
            success: false,
            message: "Score not found"
        })
    }
    res.status(200).json({
        success: true,
        data: scores
    })
})
// @desc    Update test score
// @route   PUT    /api/v1/test-score/:id
// @access  Private
exports.updateScore = asyncHandler(async (req, res, next) => {
    const score = await TestScore.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    )

    if (!score) {
        return res.status(400).json({
            success: false,
            message: "Invalid score details"
        })
    }
    res.status(200).json({
        success: true,
        data: score
    })
})
// @desc    Delete test score
// @route   DELETE    /api/v1/test-score/:id
// @access  Private
exports.deleteScore = asyncHandler(async (req, res, next) => {
    const scores = await TestScore.findByIdAndDelete(req.params.id)

    if (!scores || scores.length < 1) {
        return res.status(404).json({
            success: false,
            message: "Score not found"
        })
    }
    res.status(200).json({
        success: true,
        data: {}
    })
})
// @desc    Get all test scores for a candidate
// @route   GET    /api/v1/test-score/candidate/:candidate_id
// @access  Private
exports.getAllCandidateScores = asyncHandler(async (req, res, next) => {
    const scores = await TestScore.find({candidate: req.params.candidate_id})

    if (!scores || scores.length < 1) {
        return res.status(404).json({
            success: false,
            message: "Candidates scores not found"
        })
    }
    res.status(200).json({
        success: true,
        data: scores
    })
})

// @desc    Get all test scores for a test
// @route   GET    /api/v1/test-score/test/:test_id
// @access  Private
exports.getAllTestScores = asyncHandler(async (req, res, next) => {
    const scores = await TestScore.find({test: req.params.test_id})

    if (!scores || scores.length < 1) {
        return res.status(404).json({
            success: false,
            message: "Test scores not found"
        })
    }
    res.status(200).json({
        success: true,
        data: scores
    })
})

// @desc    Get all test scores for a specific test and candidate
// @route   GET    /api/v1/test-score/test/:test_id/candidate/:candidate_id
// @access  Private
exports.getCandidateTestScores = asyncHandler(async (req, res, next) => {
    const scores = await TestScore.find({
        candidate: req.params.candidate_id,
        test: req.params.test_id
    })

    if (!scores || scores.length < 1) {
        return res.status(404).json({
            success: false,
            message: "Candidates scores not found"
        })
    }
    res.status(200).json({
        success: true,
        data: scores
    })
})

// @desc    Get all test scores for currently authenticated candidate
// @route   GET    /api/v1/test-score/self
// @access  Private
exports.getAllSelfScores = asyncHandler(async (req, res, next) => {
    const scores = await TestScore.find({candidate: req.candidate._id})

    if (!scores || scores.length < 1) {
        return res.status(404).json({
            success: false,
            message: "Candidates scores not found"
        })
    }
    res.status(200).json({
        success: true,
        data: scores
    })
})

// @desc    Get all test scores for a specific test and currently authenticated candidate
// @route   GET    /api/v1/test-score/self/test/:test_id
// @access  Private
exports.getSelfTestScores = asyncHandler(async (req, res, next) => {
    const scores = await TestScore.find({
        candidate: req.candidate._id,
        test: req.params.test_id
    })

    if (!scores || scores.length < 1) {
        return res.status(404).json({
            success: false,
            message: "Candidates scores not found"
        })
    }
    res.status(200).json({
        success: true,
        data: scores
    })
})