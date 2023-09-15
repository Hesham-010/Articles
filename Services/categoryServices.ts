import asyncHandlers from "express-async-handler";
import {models} from "../database/database";
import { Request, Response, NextFunction } from 'express'

// Create category
// route       POST  api/categories/
// Public     Admin
export const createCategory = async (req: Request, res: Response, next:NextFunction) => {
  const category = await models.Category.create(req.body);
  res.status(201).json({ status: "Success", data: category });
};

// get categories
// route       GET  api/categories/
// Public     Admin - User
export const getCategories = async (req: Request, res: Response, next:NextFunction) => {
  const categories = await models.Category.findAll();
  res.status(201).json({ status: "Success", data: categories });
};

// get category
// route       GET  api/categories/id
// Public     Admin - User
export const getCategory = async (req: Request, res: Response, next:NextFunction) => {
  const category = await models.Category.findByPk(req.params.id);
  res.status(201).json({ status: "Success", data: category });
};

// Update category
// route      PUT  api/categories/id
// Public     Admin
export const updateCategory = async (req: Request, res: Response, next:NextFunction) => {
  const category =await models.Category.update(req.body, { where: { id: req.params.id } });
  res.status(200).json({ status: "Success" });
};

// Delete category
// route      DELATE  api/categories/id
// Public     Admin
export const deleteCategory = async (req: Request, res: Response, next:NextFunction) => {
  await models.Category.destroy({ where: { id: req.params.id } });
  res.status(200).json({ status: "Success" });
};
