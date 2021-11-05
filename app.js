require('dotenv').config({path: './.env'});
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const morgan = require('morgan')
const companyProfileRoutes = require('./Routes/company_profile_routes')
const testDetailRoutes = require('./Routes/test_details_routes')
const questionInformationRoutes = require('./Routes/question_information_routes')
const sectionInformationRoutes = require('./Routes/section_information_routes')
const scoreDetailRoutes = require('./Routes/score_detail_routes')
const adminInformationRoutes = require('./Routes/admin_information_routes')
const candidateInformationRoutes = require('./Routes/candidate_information_routes')

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_CLOUD_URI = process.env.MONGO_CLOUD_URI;


// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json())
app.use(morgan('dev'))
// routes
app.use('/company', companyProfileRoutes)
app.use('/test', testDetailRoutes)
app.use('/question', questionInformationRoutes)
app.use('/section', sectionInformationRoutes)
app.use('/score', scoreDetailRoutes)
app.use('/admin', adminInformationRoutes)
app.use('/candidate', candidateInformationRoutes)


mongoose.connect(MONGO_CLOUD_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        console.log("Connected to MongoDB!");
        app.listen(PORT);
        console.log(`Listening to port ${PORT}`);
        
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB!");
    });


// Error handling
app.use((req, res) => {
    res.status(400).json({
        success: false,
        message: 'Page not found!'
    });
});