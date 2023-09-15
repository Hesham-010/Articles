const { gql } = require("apollo-server");

const commentDefs = gql`
  type schema {
    query: Query
    mutation: Mutation
  }

  type Comment {
    id: ID!
    content: String!
    ArticleId: ID!
    UserId: ID!
  }

  input createCommentData {
    content: String!
    ArticleId: ID!
  }

  input updateCommentData {
    id: ID!
    content: String
    ArticleId: ID
    UserId: ID
  }

  type Query {
    commentGetById(id: ID!): Comment!
    commentGetByUserIdOrArticleId(ArticleId: ID, UserId: ID): [Comment]!
  }

  type Mutation {
    commentCreate(commentData: createCommentData): Comment!
    commentUpdate(commentData: updateCommentData): Comment
    commentDelete(id: ID!): String!
  }
`;
export default commentDefs;
