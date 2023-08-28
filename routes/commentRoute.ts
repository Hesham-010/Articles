import express from "express";
const router = express.Router();

import {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
} from "../Services/commentServices";

router.route("/").get(getComments).post(createComment);
router.route("/:id").get(getComment).put(updateComment).delete(deleteComment);

export default router;
