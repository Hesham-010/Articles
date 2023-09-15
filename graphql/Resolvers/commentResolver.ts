import {
  commentGetById,
  commentGetByUserIdOrArticleId,
  commentCreate,
  commentUpdate,commentDelete
} from "../services/commentService";

const commentResolver = {
  Query: {
    commentGetById,
    commentGetByUserIdOrArticleId,
  },

  Mutation: {
    commentCreate,
    commentUpdate,
    commentDelete
  },
};
export default commentResolver;
