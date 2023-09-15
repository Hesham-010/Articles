import asyncHandlers from "express-async-handler";
import { models } from "../database/database";
import { Request, Response, NextFunction } from "express";

export const UserIdandCategoryIdToBodyForCreate = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.UserId) req.body.UserId = req.user.id;
  if (!req.body.CategoryId) req.body.CategoryId = req.params.categoryId;
  next();
};

export const createFilterObj = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  let filterObj = {};
  if (req.params.userId) filterObj = { UserId: req.params.userId };
  if (req.params.categoryId) filterObj = { CategoryId: req.params.categoryId };
  req.filterObj = filterObj;
  next();
};

// Create Article
// route       POST  api/articles/
// Public     Admin
export const createArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const article = await models.Article.create(req.body);
  res.status(201).json({ status: "Success", data: article });
};

// get articles
// route       GET  api/articles/
// Public     Admin - User
export const getArticles = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  let filter = {};
  if (req.filterObj) {
    filter = req.filterObj;
  }
  const articles = await models.Article.findAll({ where: filter });
  res.status(201).json({ status: "Success", data: articles });
};

// get Article
// route      GET  api/Articles/id
// Public     Admin - User
export const getArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const articles = await models.Article.findByPk(req.params.id);
  res.status(201).json({ status: "Success", data: articles });
};

// Update Article
// route      PUT  api/categories/id
// Public     Admin
export const updateArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await models.Article.update(
    req.body,
    { where: { id: req.params.id } },
    { new: true }
  );
  res.status(200).json({ status: "Success" });
};

// Delete Article
// route      DELATE  api/categories/id
// Public     Admin
export const deleteArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await models.Article.destroy({ where: { id: req.params.id } });
  res.status(200).json({ status: "Success" });
};
