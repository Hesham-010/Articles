const { gql } = require("apollo-server");

const categoryDefs = gql`
  type schema {
    query: Query
    mutation: Mutation
  }

   type Category {
    id: ID!
    title: String!
  }

  input createCategoryData {
    title: String!
  }

  input updateCategoryData {
    id: ID!
    title: String!
  }

  type Query {
    categoriesGet: [Category]
    categoryGetById(id: ID!): Category!
  }

  type Mutation {
    categoryCreate(categoryData:createCategoryData): Category!
    categoryUpdate(categoryData:updateCategoryData): Category!
    categoryDelete(id: ID!): String!
  }
`;
export default categoryDefs;
