import asyncHandlers from "express-async-handler";
import {models} from "../configDb/database";
import { Request, Response, nextFunction } from 'express'

// Create category
// route       POST  api/categories/
// Public     Admin
export const createCategory = asyncHandlers(async (req: Request, res: Response, next:nextFunction) => {
  const category = await models.Category.create(req.body);
  res.status(201).json({ status: "Success", data: category });
});

// get categories
// route       GET  api/categories/
// Public     Admin - User
export const getCategories = asyncHandlers(async (req: Request, res: Response, next:nextFunction) => {
  const categories = await models.Category.findAll();
  res.status(201).json({ status: "Success", data: categories });
});

// get category
// route       GET  api/categories/id
// Public     Admin - User
export const getCategory = asyncHandlers(async (req: Request, res: Response, next:nextFunction) => {
  const category = await models.Category.findByPk(req.params.id);
  res.status(201).json({ status: "Success", data: category });
});

// Update category
// route      PUT  api/categories/id
// Public     Admin
export const updateCategory = asyncHandlers(async (req: Request, res: Response, next:nextFunction) => {
  const category =await models.Category.update(req.body, { where: { id: req.params.id } });
  res.status(200).json({ status: "Success" });
});

// Delete category
// route      DELATE  api/categories/id
// Public     Admin
export const deleteCategory = asyncHandlers(async (req: Request, res: Response, next:nextFunction) => {
  await models.Category.destroy({ where: { id: req.params.id } });
  res.status(200).json({ status: "Success" });
});
