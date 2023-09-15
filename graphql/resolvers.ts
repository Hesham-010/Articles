import userResolver from "./Resolvers/userResolver";
import articleResolver from "./Resolvers/articleResolver";
import commentResolver from "./Resolvers/commentResolver";
import categoryResolver from "./Resolvers/categoryResolver";
import authResolver from "./Resolvers/authResolver";
import { mergeResolvers } from '@graphql-tools/merge'

const resolvers = mergeResolvers([
  userResolver,
  articleResolver,
  commentResolver,
  categoryResolver,
  authResolver,
]);

export default resolvers;
