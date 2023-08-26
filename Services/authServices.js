const User = require("../models/userModel");
const createToken = require("../utils/createToken");
const bcrypt = require("bcryptjs");
const ApiError = require("../utils/apiError");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { models } = require("../config/database");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const { AsyncLocalStorage } = require("async_hooks");

//Protect
exports.protect = asyncHandler(async (req, res, next) => {
  // 1- check  if token exist
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new ApiError("Please Login", 400));
  }
  // Verifiy Token
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  // check if user exist
  const user = await models.User.findByPk(decoded.userId);

  // check if user change his password
  if (user.passwordChangedAt) {
    const passChangedTimeStamp = parseInt(
      user.passwordChangedAt.getTime() / 1000,
      10
    );
    if (passChangedTimeStamp > decoded.iat) {
      return next(
        new ApiError(
          "User recently changed his password. please login again..",
          401
        )
      );
    }
  }
  req.user = user;
  next();
});

// Authorization
exports.allowTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ApiError("can't access this route"));
    }
    next();
  });

// SignUp
// route    POST  /api/auth/signup
exports.signUp = async (req, res, next) => {
  req.body.password = await bcrypt.hash(req.body.password, 12);

  const user = await models.User.create(req.body);

  const token = createToken(user.id);

  res.status(201).json({ data: user, Token: token });
};

// Login
// route    POST  /api/auth/login
exports.login = async (req, res, next) => {
  const user = await models.User.findOne({ where: { email: req.body.email } });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError("Invalid Email or Password", 401));
  }

  const token = createToken(user.id);

  res.status(201).json({ data: user, Token: token });
};

// forgot password
// route     POST   /api/v1/auth/forgotPassword
// public    User - Admin
exports.forgetPassword = asyncHandler(async (req, res, next) => {
  // get user based on email
  const user = await models.User.findOne({ where: { email: req.body.email } });
  if (!user) {
    return next(
      new ApiError(`There is no user with this email ${req.body.email}`, 404)
    );
  }
  // create hash Reset Code and saved in datebase
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(resetCode)
    .digest("hex");

  user.passwordResetCode = hashedResetCode;
  user.passwordResetExpiration = Date.now() + 10 * (60 * 1000);
  user.passwordResetVerified = false;
  await user.save();

  // 3- send the reset code via email
  const message = `Hi ${user.name}, \n ${resetCode} \n Enter this code to complete the reset.`;
  try {
    await sendEmail({
      email: user.email,
      subject: "your reset code valid for 10 min ",
      message: message,
    });
  } catch (err) {
    user.passwordResetCode = undefined;
    user.passwordResetExpiration = undefined;
    user.passwordResetVerified = undefined;
    await user.save();
    return next(new ApiError(`There is an error in sending email`, 500));
  }
  res.status(200).json({ message: "Enter Reset Code From Your Email" });
});

// verify reset code
// route     POST   /api/v1/auth/forgotPassword
// public    User - Admin
exports.verifyResetCode = asyncHandler(async (req, res, next) => {
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(req.body.resetCode)
    .digest("hex");

  const user = await models.User.findOne({
    where: {
      passwordResetCode: hashedResetCode,
    },
  });
  if (!user) {
    next(new ApiError("Invalid Reset Code", 404));
  }
  if (user.passwordResetExpiration > Date.now()) {
    user.passwordResetVerified = true;
    await user.save();
  } else {
    next(new ApiError("Invalid Reset Code", 404));
  }
  res.status(200).json({ status: "Success" });
});

// reset user password
// route     POST   /api/v1/auth/forgotPassword
// public    User - Admin
exports.resetPassword = asyncHandler(async (req, res, next) => {
  const user = await models.User.findOne({ where: { email: req.body.email } });
  if (!user) {
    return next(
      new ApiError(`There is no user with this email ${req.body.email}`, 404)
    );
  }
  if (!user.passwordResetVerified) {
    return next(new ApiError("This reset code is not verified ", 400));
  }
  const newPassword = await bcrypt.hash(req.body.newPassword, 12);
  user.password = newPassword;
  user.passwordResetCode = undefined;
  user.passwordResetExpiration = undefined;
  user.passwordResetVerified = undefined;
  await user.save();

  const token = createToken(user.id);
  res.status(200).json({ message: "Your Password is changed", token: token });
});
