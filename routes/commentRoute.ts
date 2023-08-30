import express from "express";
const router = express.Router({mergeParams:true});
import { protect, allowTo } from "../Services/authServices";

import {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,createFilterObj,UserIdandArticleIdToBodyForCreate
} from "../Services/commentServices";
import {createCommentValidator,updateCommentValidator} from '../validators/commentValidator'

router.use(protect);

router
  .route("/")
  .get(createFilterObj,getComments)
  .post(UserIdandArticleIdToBodyForCreate,createCommentValidator,createComment);
router
  .route("/:id")
  .get(getComment)
  .put(updateCommentValidator,updateComment)
  .delete(deleteComment);

export default router;
