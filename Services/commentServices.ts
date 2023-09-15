import asyncHandlers from "express-async-handler";
import { models } from "../database/database";
import { Request, Response, NextFunction } from "express";

export const UserIdandArticleIdToBodyForCreate = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.UserId) req.body.UserId = req.user.id;
  if (!req.body.ArticleId) req.body.ArticleId = req.params.articleId;
  next();
};

export const createFilterObj = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  let filterObj = {};
  if (req.params.articleId) filterObj = { ArticleId: req.params.articleId };
  req.filterObj = filterObj;
  next();
};

// Create Comment
// route       POST  api/comments/
// Public     Admin
export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const comment = await models.Comment.create(req.body);
  res.status(201).json({ status: "Success", data: comment });
};

// get comments
// route      GET /api/comments
export const getComments = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  let filter = {};
  if (req.filterObj) {
    filter = req.filterObj;
  }
  const comments = await models.Comment.findAll({ where: filter });
  res.status(200).json({ data: comments });
};

// get comments
// route      GET /api/comments
export const getComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const comment = await models.Comment.findByPk(req.params.id);
  res.status(200).json({ status: "Success", data: comment });
};

// Update comments
// route      GET /api/comments
export const updateComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await models.Comment.update(
    req.body,
    { where: { id: req.params.id } },
    { new: true }
  );
  res.status(200).json({ status: "Success" });
};

// Delete Comment
// route      DELATE  api/categories/id
export const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await models.Comment.destroy({ where: { id: req.params.id } });
  res.status(200).json({ status: "Success" });
};
