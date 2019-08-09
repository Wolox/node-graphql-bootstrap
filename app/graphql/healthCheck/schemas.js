const { gql } = require('apollo-server');

const rootTpyes = gql`
  extend type Query {
    healthCheck: String!
  }
`;

exports.schemas = [rootTpyes];
