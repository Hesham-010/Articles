const { gql } = require("apollo-server");

const authDefs = gql`
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

  input loginData {
    email: String!
    password: String!
  }

  type Mutation {
    forgetPassword(email: String!): String
    verifyResetCode(resetCode: String): String
    resetPassword(email: String,newPassword: String): String

    signUp(singUpData:createUserData): String!
    login(loginData:loginData): String!
  }
  `
export default authDefs;
