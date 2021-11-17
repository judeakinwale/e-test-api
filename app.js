require('dotenv').config({path: './.env'});
const path = require("path");
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
const companyProfile = require('./Routes/companyProfile');
const test = require('./Routes/test');
const question = require('./Routes/question');
const section = require('./Routes/section');
const testScore = require('./Routes/testScore');
const sectionScore = require('./Routes/sectionScore');
const admin = require('./Routes/admin');
const candidate = require('./Routes/candidate');
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
app.use(express.static(path.join(__dirname, "/public"))); //Set static folder
app.use(fileupload()); //file uploads

// // Dev middleware
// if (process.env.NODE_ENV === "development") {
//     app.use(morgan("dev"));
// }

// //Rate limiting
// const limiter = rateLimit({
//     windowMs: 10 * 60 * 1000, // 10 mins
//     max: 100,
//   });
//   app.use(limiter);


// Routes
app.use(
    // '/api/v1/company', 
    companyProfile);
app.use(
    // '/api/v1/test', 
    test);
app.use(
    // '/api/v1/question', 
    question);
app.use(
    // '/api/v1/section', 
    section);
app.use(
    // '/api/v1/test-score', 
    testScore);
app.use(
    // '/api/v1/section-score', 
    sectionScore);
app.use(
    // '/api/v1/admin', 
    admin);
app.use(
    // '/api/v1/candidate', 
    candidate);
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