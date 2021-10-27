require('dotenv').config({path: './.env'});
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const companyProfileRoute = require('./Routes/company_profile_routes')


const app = express();


const PORT = process.env.PORT || 5000;
const MONGO_CLOUD_URI = process.env.MONGO_CLOUD_URI;


// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/company', companyProfileRoute)


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
        message: 'Page not found!'
    });
});