import express from "express";
const router = express.Router();
import {protect,allowTo} from "../Services/authServices";

import {
  createArticle,
  deleteArticle,
  updateArticle,
  getArticles,
  getArticle,
} from "../Services/articleServices";

router.use(protect,allowTo("user", "admin"));

router.route("/").post(createArticle).get(getArticles);
router.route("/:id").put(updateArticle).delete(deleteArticle).get(getArticle);

export default router;
