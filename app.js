require('dotenv').config({path: './.env'});
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require("cors");
const fileupload = require("express-fileupload");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const errorHandler = require('./Middleware/error')
// For swagger
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')

// Routes
const companyProfileRoutes = require('./Routes/companyProfile');
const testDetailRoutes = require('./Routes/test');
const questionInformationRoutes = require('./Routes/question');
const sectionInformationRoutes = require('./Routes/section');
const scoreDetailRoutes = require('./Routes/score');
const adminInformationRoutes = require('./Routes/admin');
const candidateInformationRoutes = require('./Routes/candidate');
const authentication = require('./Routes/authentication')

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_CLOUD_URI = process.env.MONGO_CLOUD_URI;


// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'));
app.use(cors()); //enable CORS
app.use(errorHandler)
// app.use(express.static(path.join(__dirname, "/public"))); //Set static folder


// Routes
app.use(
    // '/api/v1/company', 
    companyProfileRoutes);
app.use(
    // '/api/v1/test', 
    testDetailRoutes);
app.use(
    // '/api/v1/question', 
    questionInformationRoutes);
app.use(
    // '/api/v1/section', 
    sectionInformationRoutes);
app.use(
    // '/api/v1/score', 
    scoreDetailRoutes);
app.use(
    // '/api/v1/admin', 
    adminInformationRoutes);
app.use(
    // '/api/v1/candidate', 
    candidateInformationRoutes);
app.use(
    // '/api/v1/auth', 
    authentication)
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))


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