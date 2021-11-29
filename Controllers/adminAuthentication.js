const ErrorResponse = require("../Utils/errorResponse");
const asyncHandler = require("../Middleware/async");
const Admin = require("../Models/admin");
// const otpGenerator = require("otp-generator");
const sendEmail = require("../Utils/sendEmail");
const crypto = require("crypto");

// @desc    Login admin user
// @route   POST    /api/v1/auth/admin
// @access   Public
exports.adminLogin = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
  
    //validate email & password
    if (!email || !password) {
        return next(new ErrorResponse("Please Provide an email and password", 400));
    }
    //check for user
    const admin = await Admin.findOne({ email: email }).select("+password");
  
    if (!admin) {
        return next(new ErrorResponse("Invalid credentials", 400));
    }
  
    //check if password match
    const isMatch = await admin.matchPassword(password);
  
    if (!isMatch) {
        return next(new ErrorResponse("Invalid credentials", 401));
    }
  
    sendTokenResponse(admin, 200, res);
});
  
// @desc    Log admin user out / clear cookie
// @route   GET  /api/v1/auth/admin/logout
// @access  Private
exports.adminLogout = asyncHandler(async (req, res, next) => {
    res.cookie("token", "none", {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });
    res.status(200).json({
        success: true,
        data: {},
    });
});

// @desc    Get current logged in admin user
// @route   POST    /api/v1/auth/admin/account
// @access  Private
exports.adminAccount = asyncHandler(async (req, res, next) => {
    const admin = await Admin.findById(req.admin.id);
    res.status(200).json({
        success: true,
        data: admin,
    });
});

// @desc    Reset Password
// @route   PUT     /api/v1/auth/admin/resetpassword/:resettoken
// @access  Public
exports.adminResetPassword = asyncHandler(async (req, res, next) => {
    //get hashed token
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.body.id)
        .digest("hex");
    const user = await Admin.findOne({
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
// @route   POST    /api/v1/auth/admin/forgotpassword
// @access  Public
exports.adminForgotPassword = asyncHandler(async (req, res, next) => {
    const user = await Admin.findOne({ email: req.body.email });

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
const sendTokenResponse = (admin, statusCode, res) => {
    //create token
    const token = admin.getSignedJwtToken();

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