const ErrorResponse = require("../Utils/errorResponse");
const asyncHandler = require("../Middleware/async");
const Candidate = require("../Models/candidate");
// const otpGenerator = require("otp-generator");
const sendEmail = require("../Utils/sendEmail");
const crypto = require("crypto");

// @desc    Login User
// @route   POST/api/v1/auth/Candidate/login
// @access   Public
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
  
    //validate email & password
    if (!email || !password) {
        return next(new ErrorResponse("Please Provide an email and password", 400));
    }
    //check for user
    const candidate = await Candidate.findOne({ email: email }).select("+password");
  
    if (!candidate) {
        return next(new ErrorResponse("Invalid credentials", 401));
    }
  
    //check if password match
    const isMatch = await candidate.matchPassword(password);
  
    if (!isMatch) {
        return next(new ErrorResponse("Invalid credentials", 401));
    }
  
    sendTokenResponse(candidate, 200, res);
});
  
// @desc    Log user out / clear cookie
// @route  GET /api/v1/auth/logout
// @access   Private
exports.logout = asyncHandler(async (req, res, next) => {
    res.cookie("token", "none", {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });
    res.status(200).json({
        success: true,
        data: {},
    });
});

// @desc    Get current logged in user
// @route   POST/api/v1/auth/me
// @access   Private
exports.account = asyncHandler(async (req, res, next) => {
    const candidate = await Candidate.findById(req.candidate.id);
    res.status(200).json({
        success: true,
        data: candidate,
    });
});

// @desc    Reset Password
// @route   PUT/api/v1/auth/resetpassword/:resettoken
// @access   Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
    //get hashed token
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.body.id)
        .digest("hex");
    const user = await Candidate.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
        return next(new ErrorResponse("Invalid Token", 400));
    }
    // set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    await user.save();

    sendTokenResponse(user, 200, res);
});
  
// @desc    Forgot Password
// @route   POST/api/v1/auth/forgotpassword
// @access   Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
    const user = await Candidate.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorResponse("User not found", 404));
    }
    //Get reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    //Create reset url
    const resetUrl = `${req.protocol}://${req.get(
        "host"
    )}/resetPassword/${resetToken}`;

    const html = `<a href="${resetUrl}" style="padding:1rem;color:white;background:green;border-radius:20px;">Click Here</a>`;

    try {
        await sendEmail({
        email: user.email,
        subject: "Password reset token",
        html,
        });
        res.status(200).json({ success: true, data: "Email Sent" });
    } catch (err) {
        console.log(err);
        user.getResetPasswordToken = undefined;
        user.resetPasswordTokenExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorResponse("Email could not be sent", 500));
    }
});

//Get token from model, create cookie and send response
const sendTokenResponse = (candidate, statusCode, res) => {
    //create token
    const token = candidate.getSignedJwtToken();

    const options = {
        expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };
    if (process.env.NODE_ENV === "production") {
        options.secure = true;
    }

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        token,
    });
};