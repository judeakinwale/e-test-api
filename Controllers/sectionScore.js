const SectionScore = require('../Models/sectionScore')
const TestScore = require('../Models/testScore')
const ErrorResponse = require('../Utils/errorResponse')
const getTestScore = require('../Utils/getTestScore')
const asyncHandler = require('../Middleware/async')

exports.getAllScores = asyncHandler(async (req, res, next) => {
    // res.status(200).json(res.advancedResults);

    const scores = await SectionScore.find()

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
    const score = await SectionScore.create(req.body)

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
    const scores = await SectionScore.findById(req.params.id)

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
    const score = await SectionScore.findByIdAndUpdate(
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
    // Calculate the test scores from the section scores
    await getTestScore(score)

    res.status(200).json({
        success: true,
        data: score
    })
})

exports.getAllCandidateScores = asyncHandler(async (req, res, next) => {
    const scores = await SectionScore.find({candidate: req.params.candidate_id})

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
    const scores = await SectionScore.find({test: req.params.test_id})

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

exports.getAllSectionScores = asyncHandler(async (req, res, next) => {
    const scores = await SectionScore.find({section: req.params.section_id})

    if (!scores || scores.length < 1) {
        return res.status(404).json({
            success: false,
            message: "Section scores not found"
        })
    }
    res.status(200).json({
        success: true,
        data: scores
    })
})

exports.getCandidateSectionScores = asyncHandler(async (req, res, next) => {
    const scores = await SectionScore.find({
        candidate: req.params.candidate_id,
        section: req.params.section_id
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
    const scores = await SectionScore.find({candidate: req.candidate._id})

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
exports.getSelfSectionScores = asyncHandler(async (req, res, next) => {
    const scores = await SectionScore.find({
        candidate: req.candidate._id,
        section: req.params.section_id
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