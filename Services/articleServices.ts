import Article from "../models/articleModel";
import asyncHandlers from "express-async-handler";
import models from "../configDb/database";
import {Request,Response,nextFunction} from 'express'
// Create Article
// route       POST  api/articles/
// Public     Admin
export const createArticle = asyncHandlers(async (req: Request, res: Response, next:nextFunction) => {
  const article = await models.Article.create(req.body);
  res.status(201).json({ status: "Success", data: article });
});

// get articles
// route       GET  api/articles/
// Public     Admin - User
export const getArticles = asyncHandlers(async (req: Request, res: Response, next:nextFunction) => {
  const articles = await models.Article.findAll();
  res.status(201).json({ status: "Success", data: articles });
});

// get Articles
// route      GET  api/Articles/id
// Public     Admin - User
export const getArticle = asyncHandlers(async (req: Request, res: Response, next:nextFunction) => {
  const articles = await models.Article.findByPk(req.params.id);
  res.status(201).json({ status: "Success", data: articles });
});

// Update Article
// route      PUT  api/categories/id
// Public     Admin
export const updateArticle = asyncHandlers(async (req: Request, res: Response, next:nextFunction) => {
  await models.Article.update(
    req.body,
    { where: { id: req.params.id } },
    { new: true }
  );
  res.status(200).json({ status: "Success" });
});

// Delete Article
// route      DELATE  api/categories/id
// Public     Admin
export const deleteArticle = asyncHandlers(async (req: Request, res: Response, next:nextFunction) => {
  await models.Article.destroy({ where: { id: req.params.id } });
  res.status(200).json({ status: "Success" });
});
