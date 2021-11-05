const Candidate = require('../Models/candidate_information')

exports.getAllCandidates = async (req, res, next) => {
    const candidates = await Candidate.find()

    if (!candidates || candidates.length < 1) {
        return res.status(404).json({
            success: false,
            message: "There are no candidates"
        })
    }
    res.status(200).json({
        success: true,
        data: candidates
    })
}

exports.createCandidate = async (req, res, next) => {
    const candidate = await Candidate.create(req.body)

    if (!candidate) {
        return res.status(400).json({
            success: false,
            message: "Invalid candidate details"
        })
    }
    res.status(201).json({
        success: true,
        data: candidate
    })
}

exports.getCandidate = async (req, res, next) => {
    const candidate = await Candidate.findById(req.params.id)

    if (!candidate) {
        return res.status(404).json({
            success: false,
            message: "Candidate not found"
        })
    }
    res.status(200).json({
        success: true,
        data: candidate
    })
}

exports.updateCandidate = async (req, res, next) => {
    const candidate = await Candidate.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    )

    if (!candidate) {
        return res.status(400).json({
            success: false,
            message: "Invalid candidate details"
        })
    }
    res.status(200).json({
        success: true,
        data: candidate
    })
}