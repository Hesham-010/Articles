const { gql } = require("apollo-server");

const articleDefs = gql`
  type schema {
    query: Query
    mutation: Mutation
  }

  type Article {
    id: ID!
    title: String!
    content: String!
    CategoryId: ID!
    UserId: ID!
  }

  input createArticleData {
    title: String!
    content: String!
    CategoryId: ID!
  }

  input updateArticleData {
    id: ID!
    title: String
    content: String
    CategoryId: ID
    UserId: ID
  }

   type Query {
    articleGetById(id:ID!): Article
    articleGetByUserIdOrCategoryId(CategoryId:ID,UserId:ID): [Article]
  }

  type Mutation {
    articleCreate(articleData:createArticleData): Article
    articleUpdate(articleData:updateArticleData): Article
    articleDelete(id: ID!): String
  }
  `
export default articleDefs;
