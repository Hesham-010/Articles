const Comment = require("../models/commentModel");
const asyncHandlers = require("express-async-handler");
const { models } = require("../config/database");

// Create Comment
// route       POST  api/comments/
// Public     Admin
exports.createComment = asyncHandlers(async (req, res, next) => {
  const comment = await models.Comment.create(req.body);
  res.status(201).json({ status: "Success", data: comment });
});

// get comments
// route      GET /api/comments
exports.getComments = asyncHandlers(async (req, res, next) => {
  const comments = await models.Comment.findAll();
  res.status(200).json({ data: comments });
});

// get comments
// route      GET /api/comments
exports.getComment = asyncHandlers(async (req, res, next) => {
  const comment = await models.Comment.findByPk(req.params.id);
  res.status(200).json({ status: "Success", data: comment });
});

// Update comments
// route      GET /api/comments
exports.updateComment = asyncHandlers(async (req, res, next) => {
  await models.Comment.update(
    req.body,
    { where: { id: req.params.id } },
    { new: true }
  );
  res.status(200).json({ status: "Success" });
});

// Delete Comment
// route      DELATE  api/categories/id
exports.deleteComment = asyncHandlers(async (req, res, next) => {
  await models.Comment.destroy({ where: { id: req.params.id } });
  res.status(200).json({ status: "Success" });
});
