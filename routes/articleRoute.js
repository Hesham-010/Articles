const express = require("express");
const router = express.Router();
const authServices = require("../Services/authServices");

const {
  createArticle,
  deleteArticle,
  updateArticle,
  getArticles,
  getArticle,
} = require("../Services/articleServices");

router.use(authServices.protect, authServices.allowTo("user", "admin"));

router.route("/").post(createArticle).get(getArticles);
router.route("/:id").put(updateArticle).delete(deleteArticle).get(getArticle);

module.exports = router;
