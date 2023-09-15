import {
  usersGet,
  userGetById,
  getMyData,
  userCreate,
  userDelete,
  updateMyData,
  userUpdate,deleteMe,
    changeMyPassword,
} from "../services/userService";

const userResolver = {
  Query: {
    usersGet,
    userGetById,
    getMyData,
  },

  Mutation: {
    userCreate,
    userUpdate,
    userDelete,
    updateMyData,
    deleteMe,
    changeMyPassword,
  },
};
export default userResolver;
