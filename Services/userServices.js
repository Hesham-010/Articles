const { models } = require("../configDb/database");
const User = require("../models/userModel");
const asyncHandlers = require("express-async-handler");
const bcrypt = require("bcryptjs");
const ApiError = require("../utils/apiError");
const { uploadUserImage } = require("../middleWares/uploadImageMiddleware");
const sharp = require("sharp");

// upload user imadge
exports.uploadUserImage = uploadUserImage("image");

// resize user imadge
exports.resizeUserImage = asyncHandlers(async (req, res, next) => {
  const filename = `${req.body.name}_${Date.now()}.jpeg`;
  if (req.file) {
    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`uploads/usersImages/${filename}`);
    req.body.image = filename;
  }
  next();
});

// get users
// route       POST  api/users/
// private     Admin
exports.createOne = asyncHandlers(async (req, res, next) => {
  req.body.password = await bcrypt.hash(req.body.password, 12);
  const document = await models.User.create(req.body);
  res.status(201).json({ data: document });
});

// get users
// route       GET  api/users/
// private     Admin
exports.getUsers = asyncHandlers(async (req, res, next) => {
  const document = await models.User.findAll();
  res.status(201).json({ data: document });
});

// create user
// route       GET  api/users/:id
// private     Admin
exports.getUser = asyncHandlers(async (req, res, next) => {
  const document = await models.User.findByPk(req.params.id);
  res.status(200).json({ data: document });
});

// Update user
// route       PUT  api/users/:id
// private     Admin
exports.updateUser = asyncHandlers(async (req, res, next) => {
  await models.User.update(
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
    },
    {
      where: { id: req.params.id },
    }
  );
  res.status(200).json({ status: "Success" });
});

// Delete user
// route       DELETE  api/users/:id
// private     Admin
exports.deleteUser = asyncHandlers(async (req, res, next) => {
  await models.User.destroy({ where: { id: req.params.id } });
  res.status(200).json({ status: "Success" });
});

// Get Logged User Data
// route       GET api/users/getMe
// public     User -Admin
exports.getMyData = asyncHandlers(async (req, res, next) => {
  const user = await models.User.findByPk(req.user.id);
  if (!user) {
    next(new ApiError("There is no user for this id", 400));
  }
  res.status(201).json({ status: "Success", data: user });
});

// Update Logged User Data
// route       PUT api/users/updateMe
// public     User - admin
exports.updateMyData = asyncHandlers(async (req, res, next) => {
  await models.User.update(
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
    },
    {
      where: { id: req.user.id },
    }
  );
  res.status(200).json({ status: "Success" });
});

// Delete Logged User
// route       PUT api/users/updateMe
// public     User - admin
exports.deleteMe = asyncHandlers(async (req, res, next) => {
  await models.User.destroy({ where: { id: req.user.id } });
  res.status(201).json({ status: "Success" });
});

// Change Logged User Password
// route       PUT api/users/updateMe
// public     User - admin
exports.changeMyPassword = asyncHandlers(async (req, res, next) => {
  const newPassword = await bcrypt.hash(req.body.password, 12);
  console.log(newPassword);
  await models.User.update(
    {
      password: newPassword,
      passwordChangedAt: Date.now(),
    },
    {
      where: { id: req.user.id },
    }
  );
  res.status(200).json({ status: "Success" });
});
