import { models } from "../../database/database";
import {
  createCommentValidation,
  updateCommentValidation,
} from "../schemaValidation/commentSchemaValidation";

export const commentGetById = async (root, args) => {
  const comment = await models.Comment.findByPk(args.id);
  return comment;
};

export const commentGetByUserIdOrArticleId = async (root, args) => {
  let filter = {};
  if (args.UserId) filter = { UserId: args.UserId };
  if (args.ArticleId) filter = { ArticleId: args.ArticleId };
  const document = await models.Comment.findAll({ where: filter });
  return document;
};

export const commentCreate = async (root, args, context) => {
  createCommentValidation(args.commentData);
  args.commentData.UserId = context.id;
  const document = await models.Comment.create(args.commentData);
  return document;
};

export const commentUpdate = async (root, args, context) => {
  updateCommentValidation(args.commentData);
  const comment = await models.Comment.findOne({
    where: { id: args.commentData.id, UserId: context.id },
  });
  if (!comment) {
    return new Error("This comment is not about you ");
  }
  comment.content = args.commentData.content;
  comment.ArticleId = args.commentData.ArticleId;
  comment.save();
  return comment;
};

export const commentDelete = async (root, { id }, context) => {
  const comment = await models.Comment.findOne({
    where: { id, UserId: context.id },
  });
  if (!comment) {
    return new Error("This comment is not about you ");
  }
  comment.destroy();
  return "Success";
};
