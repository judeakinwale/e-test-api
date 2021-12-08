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
    
    if (!testScore) {
        const createTestScore = await TestScore.create({
            candidate: score.candidate,
            test: score.test,
            score: finalScore
        })
        console.log("\n Test Score: " + createTestScore)    
    } else {
        testScore.score = finalScore
        await testScore.save()
        console.log("\n Test Score: " + testScore)    
    }

    console.log(`Score: ${tempScore} of ${sectionScores.length}`)    
    // testScore.score = finalScore
    // await testScore.save()
    // console.log("\n Test Score: " + testScore)
}

const getTestScoreUsingTest = async (test) => {

    const sectionScores = await SectionScore.find({
        candidate: req.candidate.id,
        test: test.id
    })
    const testScore = await TestScore.findOne({
        candidate: req.candidate.id,
        test: test.id
    })
    let tempScore = 0
    for (let i = 0; i < sectionScores.length; i++) {
        tempScore += sectionScores[i].score
    }
    finalScore = tempScore / sectionScores.length
    testScore.score = finalScore * 10
    await testScore.save()
}


module.exports = {getTestScore, getTestScoreUsingTest}