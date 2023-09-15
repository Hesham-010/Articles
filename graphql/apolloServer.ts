import { ApolloServer } from "apollo-server-express";
import jwt from "jsonwebtoken";
import { models } from "../database/database";
import { protect } from "../utils/authFunction";

async function startApolloServer(app, typeDefs, resolvers) {

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async({ req }) => {
      const user = await protect(req);
      return user
    },
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: "/graphql" });
}
export default startApolloServer;
