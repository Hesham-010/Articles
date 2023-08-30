import asyncHandlers from "express-async-handler";
import { models } from "../configDb/database";
import { Request, Response, nextFunction } from "express";

export const UserIdandCategoryIdToBodyForCreate = asyncHandlers(async (req: Request, res: Response, next: nextFunction) => {
  if (!req.body.UserId) req.body.UserId = req.user.id;
  if (!req.body.CategoryId) req.body.CategoryId = req.params.categoryId;
  next()
})

export const createFilterObj = asyncHandlers(
  async (req: Request, res: Response, next: nextFunction) => {
    let filterObj = {};
    if (req.params.userId) filterObj = { UserId: req.params.userId };
    if (req.params.categoryId) filterObj = { CategoryId: req.params.categoryId };
    req.filterObj = filterObj;
    next();
  }
);

// Create Article
// route       POST  api/articles/
// Public     Admin
export const createArticle = asyncHandlers(
  async (req: Request, res: Response, next: nextFunction) => {
    const article = await models.Article.create(req.body);
    res.status(201).json({ status: "Success", data: article });
  }
);

// get articles
// route       GET  api/articles/
// Public     Admin - User
export const getArticles = asyncHandlers(
  async (req: Request, res: Response, next: nextFunction) => {
    let filter = {};
    if (req.filterObj) {
      filter = req.filterObj;
    }
    const articles = await models.Article.findAll({ where: filter });
    res.status(201).json({ status: "Success", data: articles });
  }
);

// get Articles
// route      GET  api/Articles/id
// Public     Admin - User
export const getArticle = asyncHandlers(
  async (req: Request, res: Response, next: nextFunction) => {
    const articles = await models.Article.findByPk(req.params.id);
    res.status(201).json({ status: "Success", data: articles });
  }
);

// Update Article
// route      PUT  api/categories/id
// Public     Admin
export const updateArticle = asyncHandlers(
  async (req: Request, res: Response, next: nextFunction) => {
    await models.Article.update(
      req.body,
      { where: { id: req.params.id } },
      { new: true }
    );
    res.status(200).json({ status: "Success" });
  }
);

// Delete Article
// route      DELATE  api/categories/id
// Public     Admin
export const deleteArticle = asyncHandlers(
  async (req: Request, res: Response, next: nextFunction) => {
    await models.Article.destroy({ where: { id: req.params.id } });
    res.status(200).json({ status: "Success" });
  }
);
