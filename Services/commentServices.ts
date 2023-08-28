import Comment from "../models/commentModel";
import asyncHandlers from "express-async-handler";
import models from "../configDb/database";
import { Request, Response, nextFunction } from 'express'

// Create Comment
// route       POST  api/comments/
// Public     Admin
export const createComment = asyncHandlers(async (req: Request, res: Response, next:nextFunction) => {
  const comment = await models.Comment.create(req.body);
  res.status(201).json({ status: "Success", data: comment });
});

// get comments
// route      GET /api/comments
export const getComments = asyncHandlers(async (req: Request, res: Response, next:nextFunction) => {
  const comments = await models.Comment.findAll();
  res.status(200).json({ data: comments });
});

// get comments
// route      GET /api/comments
export const getComment = asyncHandlers(async (req: Request, res: Response, next:nextFunction) => {
  const comment = await models.Comment.findByPk(req.params.id);
  res.status(200).json({ status: "Success", data: comment });
});

// Update comments
// route      GET /api/comments
export const updateComment = asyncHandlers(async (req: Request, res: Response, next:nextFunction) => {
  await models.Comment.update(
    req.body,
    { where: { id: req.params.id } },
    { new: true }
  );
  res.status(200).json({ status: "Success" });
});

// Delete Comment
// route      DELATE  api/categories/id
export const deleteComment = asyncHandlers(async (req: Request, res: Response, next:nextFunction) => {
  await models.Comment.destroy({ where: { id: req.params.id } });
  res.status(200).json({ status: "Success" });
});
