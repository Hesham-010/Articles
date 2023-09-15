import {models} from "../database/database";
import  asyncHandlers from "express-async-handler";
import bcrypt from "bcryptjs";
import uploadImage from  "../middleWares/uploadImageMiddleware";
import sharp from "sharp";
import { Request, Response, NextFunction } from 'express'

// upload user imadge
export const uploadUserImage = uploadImage("image");

// resize user imadge
export const resizeUserImage = async (req: any, res: Response, next: NextFunction) => {
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
};

// create user
// route       POST  api/users/
// private     Admin
export const createOne = async (req: Request, res: Response, next:NextFunction) => {
  req.body.password = await bcrypt.hash(req.body.password, 12);
  const document = await models.User.create(req.body);
  res.status(201).json({ data: document });
};

// get users
// route       GET  api/users/
// private     Admin
export const getUsers = async (req: Request, res: Response, next:NextFunction) => {
  const document = await models.User.findAll();
  res.status(201).json({ data: document });
};

// create user
// route       GET  api/users/:id
// private     Admin
export const getUser = async (req: Request, res: Response, next:NextFunction) => {
  const document = await models.User.findByPk(req.params.id);
  res.status(200).json({ data: document });
};

// Update user
// route       PUT  api/users/:id
// private     Admin
export const updateUser = async (req: Request, res: Response, next:NextFunction) => {
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
};

// Delete user
// route       DELETE  api/users/:id
// private     Admin
export const deleteUser = async (req: Request, res: Response, next:NextFunction) => {
  await models.User.destroy({ where: { id: req.params.id } });
  res.status(200).json({ status: "Success" });
};

// Get Logged User Data
// route       GET api/users/getMe
// public     User -Admin
export const getMyData = async (req: any, res: Response, next:NextFunction) => {
  const user = await models.User.findByPk(req.user.id);
  if (!user) {
    next(new Error("There is no user for this id"));
  }
  res.status(201).json({ status: "Success", data: user });
};

// Update Logged User Data
// route       PUT api/users/updateMe
// public     User - admin
export const updateMyData = async (req: any, res: Response, next:NextFunction) => {
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
};

// Delete Logged User
// route       PUT api/users/updateMe
// public     User - admin
export const deleteMe = async (req: any, res: Response, next:NextFunction) => {
  await models.User.destroy({ where: { id: req.user.id } });
  res.status(201).json({ status: "Success" });
};

// Change Logged User Password
// route       PUT api/users/updateMe
// public     User - admin
export const changeMyPassword = async (req: any, res: Response, next:NextFunction) => {
  const newPassword = await bcrypt.hash(req.body.password, 12);
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
};
