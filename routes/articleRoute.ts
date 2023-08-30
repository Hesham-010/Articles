import express from "express";
const router = express.Router({ mergeParams: true });
import { protect, allowTo } from "../Services/authServices";
import commentRoute from '../routes/commentRoute';
import {
  createArticle,
  deleteArticle,
  updateArticle,
  getArticles,
  getArticle,
  createFilterObj,
  UserIdandCategoryIdToBodyForCreate,
} from "../Services/articleServices";
import {createArticleValidator,updateArticleValidator} from '../validators/articleValidator'

router.use('/:articleId/comments',commentRoute);

router.use(protect);

router
  .route("/")
  .post(
    allowTo("writer", "admin"),
    UserIdandCategoryIdToBodyForCreate,createArticleValidator,
    createArticle
  )
  .get(createFilterObj, getArticles);
router
  .route("/:id")
  .put(allowTo("writer", "admin"),updateArticleValidator, updateArticle)
  .delete(allowTo("writer", "admin"), deleteArticle)
  .get(getArticle);

export default router;
