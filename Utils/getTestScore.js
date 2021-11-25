const SectionScore = require('../Models/sectionScore')
const TestScore = require('../Models/testScore')


const getTestScore = async (score) => {

    const sectionScores = await SectionScore.find({
        candidate: score.candidate,
        test: score.test
    })
    const testScore = await TestScore.findOne({
        candidate: score.candidate,
        test: score.test
    })
    let tempScore = 0
    for (let i = 0; i < sectionScores.length; i++) {
        tempScore += sectionScores[i].score
    }
    finalScore = tempScore / sectionScores.length
    testScore.score = finalScore
    await testScore.save()
}

module.exports = getTestScore