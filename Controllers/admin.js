const Admin = require("../Models/admin");
const {ErrorResponseJSON} = require("../Utils/errorResponse");
const asyncHandler = require("../Middleware/async");

// @desc    Get all admins
// @route   GET     /api/v1/admin
// @access  Public
exports.getAllAdmins = asyncHandler(async (req, res, next) => {
  // res.status(200).json(res.advancedResults);

  const admins = await Admin.find();

  if (!admins || admins.length < 1) {
    return res.status(404).json({
      success: false,
      message: "There are no admins",
    });
  }
  res.status(200).json({
    success: true,
    data: admins,
  });
});

// @desc    Create admin
// @route   POST    /api/v1/admin
// @access  Private
exports.createAdmin = asyncHandler(async (req, res, next) => {
  const existingAdmin = await Admin.findOne({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  });

  if (existingAdmin) {
    return res.status(400).json({
      success: false,
      message: "This account already exists, log in instead",
    });
  }

  const admin = await Admin.create(req.body);

  if (!admin) {
    // return res.status(400).json({
    //     success: false,
    //     message: "Invalid admin details"
    // })
    return next(new ErrorResponseJSON(res, "Invalid admin credentials", 400));
  }
  res.status(201).json({
    success: true,
    data: admin,
  });
});

// @desc    Get admin
// @route   GET     /api/v1/admin/:id
// @access  Private
exports.getAdmin = asyncHandler(async (req, res, next) => {
  const admin = await Admin.findById(req.params.id);

  if (!admin) {
    return res.status(404).json({
      success: false,
      message: "Admin not found",
    });
  }
  res.status(200).json({
    success: true,
    data: admin,
  });
});

// @desc    Update admin
// @route   PUT    /api/v1/admin/:id
// @access  Private
exports.updateAdmin = asyncHandler(async (req, res, next) => {
  const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  // temporary fix for password update
  if ("password" in req.body) {
    const adminHelper = await Admin.findById(req.params.id);
    adminHelper.password = req.body.password
    await adminHelper.save()
  }

  if (!admin) {
    return res.status(400).json({
      success: false,
      message: "Invalid admin details",
    });
  }
  res.status(200).json({
    success: true,
    data: admin,
  });
});

// @desc    Delete admin
// @route   DELETE    /api/v1/admin/:id
// @access  Private
exports.deleteAdmin = asyncHandler(async (req, res, next) => {
  const admin = await Admin.findByIdAndDelete(req.params.id);

  if (!admin) {
    return res.status(404).json({
      success: false,
      message: "Admin not found",
    });
  }
  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc    Get currently authenticated admin
// @route   GET    /api/v1/admin/self
// @access  Private
exports.getSelf = asyncHandler(async (req, res, next) => {
  console.log(req.admin)
  const admin = await Admin.findById(req.admin._id);

  if (!admin) {
    return res.status(404).json({
      success: false,
      message: "Admin not found",
    });
  }
  res.status(200).json({
    success: true,
    data: admin,
  });
});

// @desc    Get currently authenticated admin
// @route   PUT    /api/v1/admin/self
// @access  Private
exports.updateSelf = asyncHandler(async (req, res, next) => {
  const admin = await Admin.findByIdAndUpdate(req.admin._id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!admin) {
    return res.status(400).json({
      success: false,
      message: "Invalid admin details",
    });
  }
  res.status(200).json({
    success: true,
    data: admin,
  });
});

// @desc    Upload profile picture for admin
// @route   POST    /api/v1/admin/upload-profile
// @access  Private
exports.uploadProfilePicture = asyncHandler(async (req, res, next) => {
  if (!req.files) {
    return next(new ErrorResponseJSON(res, `Please Upload a picture`, 400));
  }

  const file = req.files.file;
  // Make sure the image is a photo
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponseJSON(res, `Please Upload an image file`, 400));
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(new ErrorResponseJSON(res, `Please Upload an image less than 5MB`, 400));
  }

  // Confirm admin user is authenticated
  if (!req.admin) {
    return res.status(401).json({
      success: false,
      message: "You are not authenticated, Please login",
    });
  }

  //create custom filename
  file.name = `logo_${req.admin.lastName}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponseJSON(res, `An error occured while uploading`, 500));
    }
    adminImage = await Admin.findByIdAndUpdate(req.admin.id, {image: file.name});
    if (!adminImage) {
      return next(new ErrorResponseJSON(res, "An Error Occured, Please Tray Again", 400));
    }
    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
