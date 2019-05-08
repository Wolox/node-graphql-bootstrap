const { gql } = require('apollo-server');

module.exports = gql`
  type User {
    name: String!
  }

  type Mutation {
    show(name: String!): String!
  }

  type Query {
    view(name: String!): String
  }
`;
