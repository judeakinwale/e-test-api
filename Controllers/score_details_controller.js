const Score = require('../Models/score_details')

exports.getAllScores = async (req, res, next) => {
    // res.status(200).json(res.advancedResults);

    const scores = await Score.find()

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
}

exports.createScore = async (req, res, next) => {
    const score = await Score.create(req.body)

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
}

exports.getScore = async (req, res, next) => {
    const scores = await Score.findById(req.params.id)

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
}

exports.updateScore = async (req, res, next) => {
    const score = await Score.findByIdAndUpdate(
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
}

exports.getAllCandidateScores = async (req, res, next) => {
    const scores = await Score.find({candidate: req.params.candidate_id})

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
}

exports.getAllTestScores = async (req, res, next) => {
    const scores = await Score.find({test: req.params.test_id})

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
}

exports.getCandidateTestScores = async (req, res, next) => {
    const scores = await Score.find({
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
}