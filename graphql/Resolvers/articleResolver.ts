import { articleCreate, articleDelete, articleGetById,articleGetByUserIdOrCategoryId,articleUpdate } from "../services/articleService";

let roles = ['admin','writer']
const articleResolver = {
  Query: {
    articleGetById,
    articleGetByUserIdOrCategoryId
  },

  Mutation: {
    articleCreate,
    articleUpdate,
    articleDelete,
  },
};
export default articleResolver;
