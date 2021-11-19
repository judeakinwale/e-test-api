const SectionScore = require('../Models/sectionScore')
const TestScore = require('../Models/testScore')


const getTestScore = async (score) => {

    console.log(`score.id: ${score.id}, score.score: ${score.score}`)
    const sectionScores = await SectionScore.find({
        candidate: score.candidate,
        test: score.test
    })
    console.log(`sectionScores: ${sectionScores}`)
    const testScore = await TestScore.findOne({
        candidate: score.candidate,
        test: score.test
    })
    console.log(`testScore: ${testScore}`)
    let tempScore = 0
    for (let i = 0; i < sectionScores.length; i++) {
        console.log(`Individual score model: ${sectionScores[i]} \n`)
        tempScore += sectionScores[i].score
    }
    console.log(`tempScore: ${tempScore}`)
    finalScore = tempScore / sectionScores.length
    testScore.score = finalScore
    await testScore.save()
    console.log(`testScore: ${testScore.score}`)

}

module.exports = getTestScore