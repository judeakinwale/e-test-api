const TestScore = require('../Models/testScore')
const ErrorResponse = require('../Utils/errorResponse')
const asyncHandler = require('../Middleware/async')

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