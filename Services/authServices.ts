import createToken from "../utils/createToken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import {models} from "../configDb/database";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail";
import { Request, Response, nextFunction } from "express";

//Protect
export const protect = asyncHandler(
  async (req: Request, res: Response, next: nextFunction) => {
    // 1- check  if token exist
    let token;
    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return next(new Error("Please Login"));
    }
    // Verifiy Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // check if user exist
    const user = await models.User.findByPk(decoded.userId);

    req.user = user;
    next();
  }
);

// Authorization
export const allowTo = (...roles) =>
  asyncHandler(async (req: Request, res: Response, next: nextFunction) => {
    if (!roles.includes(req.user.role)) {
      return next(new Error("can't access this route"));
    }
    next();
  });

// SignUp
// route    POST  /api/auth/signup
export const signUp = async (
  req: Request,
  res: Response,
  next: nextFunction
) => {
  req.body.password = await bcrypt.hash(req.body.password, 12);

  const user = await models.User.create(req.body);

  const token = createToken(user.id);

  res.status(201).json({ data: user, Token: token });
};

// Login
// route    POST  /api/auth/login
export const login = async (req, res, next) => {
  const user = await models.User.findOne({ where: { email: req.body.email } });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new Error("Invalid Email or Password"));
  }

  const token = createToken(user.id);

  res.status(201).json({ data: user, Token: token });
};

// forgot password
// route     POST   /api/v1/auth/forgotPassword
// public    User - Admin
export const forgetPassword = asyncHandler(
  async (req: Request, res: Response, next: nextFunction) => {
    // get user based on email
    const user = await models.User.findOne({
      where: { email: req.body.email },
    });
    if (!user) {
      return next(
        new Error(`There is no user with this email ${req.body.email}`)
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
      return next(new Error(`There is an error in sending email`));
    }
    res.status(200).json({ message: "Enter Reset Code From Your Email" });
  }
);

// verify reset code
// route     POST   /api/v1/auth/forgotPassword
// public    User - Admin
export const verifyResetCode = asyncHandler(
  async (req: Request, res: Response, next: nextFunction) => {
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
      next(new Error("Invalid Reset Code"));
    }
    if (user.passwordResetExpiration > Date.now()) {
      user.passwordResetVerified = true;
      await user.save();
    } else {
      next(new Error("Invalid Reset Code"));
    }
    res.status(200).json({ status: "Success" });
  }
);

// reset user password
// route     POST   /api/v1/auth/forgotPassword
// public    User - Admin
export const resetPassword = asyncHandler(
  async (req: Request, res: Response, next: nextFunction) => {
    const user = await models.User.findOne({
      where: { email: req.body.email },
    });
    
    if (!user) {
      return next(
        new Error(`There is no user with this email ${req.body.email}`)
      );
    }
    if (!user.passwordResetVerified) {
      return next(new Error("This reset code is not verified "));
    }
    const newPassword = await bcrypt.hash(req.body.newPassword, 12);
    user.password = newPassword;
    user.passwordResetCode = undefined;
    user.passwordResetExpiration = undefined;
    user.passwordResetVerified = undefined;
    await user.save();

    const token = createToken(user.id);
    res.status(200).json({ message: "Your Password is changed", token: token });
  }
);
