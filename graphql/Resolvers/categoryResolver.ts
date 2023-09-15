import {
  categoriesGet,
  categoryGetById,
  categoryCreate,
  categoryUpdate,
  categoryDelete,
} from "../services/categoryService";

let roles = ["admin", "writer"];
const categoryResolver = {
  Query: {
    categoriesGet,
    categoryGetById,
  },

  Mutation: {
    categoryCreate,
    categoryUpdate,
    categoryDelete,
  },
};
export default categoryResolver;
