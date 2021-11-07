const Test = require('../Models/test_details')

exports.getAllTests = async (req, res, next) => {
    // res.status(200).json(res.advancedResults);

    const tests = await Test.find()

    if (!tests || tests.length < 1) {
        return res.status(404).json({
            success: false,
            message: "There are no tests"
        })
    }
    res.status(200).json({
        success: true,
        data: tests
    })
}

exports.getCandidateTests = async (req, res, next) => {
    const tests = await Test.find({candidate: req.params.candidate_id})

    if (!tests || tests.length < 1) {
        return res.status(404).json({
            success: false,
            message: "There are no tests"
        })
    }
    res.status(200).json({
        success: true,
        data: tests
    })
}

exports.createTest = async (req, res, next) => {
    const test = await Test.create(req.body)

    if (!test) {
        res.status(400).json({
            success: false,
            message: "Invalid test details"
        })
    }
    res.status(201).json({
        success: true,
        data: test
    })
}

exports.getTest = async (req, res, next) => {
    const test = await Test.findById(req.params.id)

    if (!test) {
        return res.status(404).json({
            success: false,
            message: "Test not found"
        })
    }
    res.status(200).json({
        success: true,
        data: test
    })
}

exports.updateTest = async (req, res, next) => {
    const test = await Test.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    )

    if (!test) {
        res.status(400).json({
            success: false,
            message: "Invalid test details"
        })
    }
    res.status(200).json({
        success: true,
        data: test
    })
}