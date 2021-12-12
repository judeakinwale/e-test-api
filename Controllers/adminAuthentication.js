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
        .update(req.params.resettoken)
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

    // const html = `<a href="${resetUrl}" style="padding:1rem;color:white;background:green;border-radius:20px;">Click Here</a>`;

    const html = `<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
<tbody>
    <tr>
        <td align="center">
            <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0">
                <tbody>
                    <tr>
                        <td align="center" valign="top" bgcolor="#640ad2"
                            style="background:linear-gradient(0deg, rgba(100, 10, 210, 0.8), rgba(100, 10, 210, 0.8)),url(https://lbanstaffportal.herokuapp.com/static/media/tech.45a93050.jpg);background-size:cover; background-position:top;height:230">
                            <table class="col-600" width="600" height="200" border="0" align="center"
                                cellpadding="0" cellspacing="0">
                                <tbody>
                                    <tr>
                                        <td align="center" style="line-height: 0px;">
                                            <img style="display:block; line-height:0px; font-size:0px; border:0px;"
                                                src="https://lbanstaffportal.herokuapp.com/static/media/logo.49e95c77.png"
                                                width="70" height="70" alt="logo">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center"
                                            style="font-family: 'Raleway', sans-serif; font-size:37px; color:#ffffff;font-weight: bold;">
                                            Lotus Beta Analytics
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center"
                                            style="font-family: 'Lato', sans-serif; font-size:15px; color:#ffffff;font-weight: 300;">
                                            Our goal as an organization is to provide our customers with the best
                                            value
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </td>
    </tr>
    <tr>
        <td align="center">
            <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0"
                style="margin-left:20px; margin-right:20px; border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
                <tbody>
                    <tr>
                        <td height="35"></td>
                    </tr>

                    <tr>
                        <td align="center"
                            style="font-family: 'Raleway', sans-serif; font-size:22px; font-weight: bold; color:#2a3a4b;">
                           Hello There!
                        </td>
                    </tr>

                    <tr>
                        <td height="10"></td>
                    </tr>


                    <tr>
                        <td align="center"
                            style="font-family: 'Lato', sans-serif; font-size:14px; color:#757575; line-height:24px; font-weight: 300;">
                            You are receiving this email because you (or someone else) has requested
                            the reset of a password, Click on the link below to reset your password 
                            <br />
                            <br />
                            <a href="${resetUrl}" style="padding:1rem;color:white;background:green;border-radius:20px;">Click Here</a>
                        </td>
                    </tr>

                </tbody>
            </table>
        </td>
    </tr>
</tbody>
</table>`;

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