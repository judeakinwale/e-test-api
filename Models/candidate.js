const mongoose  = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Schema = mongoose.Schema;
const CandidateResponse = require("./candidateResponse");
const SectionScore = require("./sectionScore");
const TestScore = require("./testScore");

const CandidateInformation = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        minLength: 6,
        required: true,
        select: false
    },
    examType: {
        type: mongoose.Schema.ObjectId,
        ref: 'test',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

//Encrypt password using bcrypt
CandidateInformation.pre("save", async (next) => {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
  
//Sign JWT and return
CandidateInformation.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};
  
//match user entered password to hashed password in db
CandidateInformation.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// REset Password
CandidateInformation.methods.getResetPasswordToken = function () {
    //Generate token
    const resetToken = crypto.randomBytes(20).toString("hex");
    //Hash token and set to resetPasswordToken field
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
  
    //set expire
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    return resetToken;
};

CandidateInformation.pre('remove', async (next) => {
    // 'this' is the client being removed. Provide callbacks here if you want
    // to be notified of the calls' result.
    CandidateResponse.remove({candidate: this._id}).exec();
    SectionScore.remove({candidate: this._id}).exec();
    TestScore.remove({candidate: this._id}).exec();
    next();
});

module.exports = mongoose.model('candidate', CandidateInformation);