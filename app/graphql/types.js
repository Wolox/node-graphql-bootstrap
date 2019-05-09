const { gql } = require('apollo-server');

module.exports = gql`
  type User {
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
    id: ID!
  }

  input UserInput {
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
  }

  type Mutation {
    createUser(user: UserInput!): User!
  }

  type Query {
    user(id: ID, firstName: String, email: String): User!
    healthCheck: String
  }
`;
