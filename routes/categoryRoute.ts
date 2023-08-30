import express from "express";
const router = express.Router();
import { protect, allowTo } from "../Services/authServices";
import articleRoute from './articleRoute'
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../Services/categoryServices";

router.use('/:categoryId/articles', articleRoute)

router.use(protect)

router.route("/").get(getCategories).post(allowTo('admin'),createCategory);
router
  .route("/:id")
  .get(getCategory)
  .put(allowTo('admin'),updateCategory)
  .delete(allowTo('admin'),deleteCategory);

export default router;
