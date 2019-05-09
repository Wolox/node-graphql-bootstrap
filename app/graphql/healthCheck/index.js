const { gql } = require('apollo-server');

module.exports = {
  queries: {
    healthCheck: () => process.uptime()
  },
  schemas: [
    gql`
      extend type Query {
        healthCheck: String!
      }
    `
  ]
};
