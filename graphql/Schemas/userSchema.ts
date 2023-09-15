const { gql } = require("apollo-server");

const userDefs = gql`
  type schema {
    query: Query
    mutation: Mutation
  }

   type User {
    id: ID!
    name: String
    email: String
    password: String
    phone: String
    role: String
  }

  input createUserData {
    name: String!
    email: String!
    password: String!
    phone: String!
    role: String
    adresses: String
  }

  input updateUserData {
    id: ID
    name: String
    email: String
    password: String
    phone: String
    address: String
  }

   type Query {
    usersGet: [User]
    userGetById(id: ID!): User!
    getMyData:User
  }

  type Mutation {
    userCreate(userData: createUserData): User!
    userUpdate(userData: updateUserData): User!
    userDelete(id: ID!): String!
    
    updateMyData(userData: updateUserData):User
    deleteMe: String
    changeMyPassword(password: String): String
  }
  `
export default userDefs;
