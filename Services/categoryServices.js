const asyncHandlers = require("express-async-handler");
const Category = require("../models/categoryModel");
const { models } = require("../config/database");

// Create category
// route       POST  api/categories/
// Public     Admin
exports.createCategory = asyncHandlers(async (req, res, next) => {
  const category = await models.Category.create(req.body);
  res.status(201).json({ status: "Success", data: category });
});

// get categories
// route       GET  api/categories/
// Public     Admin - User
exports.getCategories = asyncHandlers(async (req, res, next) => {
  const categories = await models.Category.findAll();
  res.status(201).json({ status: "Success", data: categories });
});

// get category
// route       GET  api/categories/id
// Public     Admin - User
exports.getCategory = asyncHandlers(async (req, res, next) => {
  const category = await models.Category.findByPk(req.params.id);
  res.status(201).json({ status: "Success", data: category });
});

// Update category
// route      PUT  api/categories/id
// Public     Admin
exports.updateCategory = asyncHandlers(async (req, res, next) => {
  await models.Category.update(req.body, { where: { id: req.params.id } });
  res.status(200).json({ status: "Success" });
});

// Delete category
// route      DELATE  api/categories/id
// Public     Admin
exports.deleteCategory = asyncHandlers(async (req, res, next) => {
  await models.Category.destroy({ where: { id: req.params.id } });
  res.status(200).json({ status: "Success" });
});
