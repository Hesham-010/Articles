const Article = require("../models/articleModel");
const asyncHandlers = require("express-async-handler");
const { models } = require("../configDb/database");

// Create Article
// route       POST  api/articles/
// Public     Admin
exports.createArticle = asyncHandlers(async (req, res, next) => {
  const article = await models.Article.create(req.body);
  res.status(201).json({ status: "Success", data: article });
});

// get articles
// route       GET  api/articles/
// Public     Admin - User
exports.getArticles = asyncHandlers(async (req, res, next) => {
  const articles = await models.Article.findAll();
  res.status(201).json({ status: "Success", data: articles });
});

// get Articles
// route      GET  api/Articles/id
// Public     Admin - User
exports.getArticle = asyncHandlers(async (req, res, next) => {
  const articles = await models.Article.findByPk(req.params.id);
  res.status(201).json({ status: "Success", data: articles });
});

// Update Article
// route      PUT  api/categories/id
// Public     Admin
exports.updateArticle = asyncHandlers(async (req, res, next) => {
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
exports.deleteArticle = asyncHandlers(async (req, res, next) => {
  await models.Article.destroy({ where: { id: req.params.id } });
  res.status(200).json({ status: "Success" });
});
