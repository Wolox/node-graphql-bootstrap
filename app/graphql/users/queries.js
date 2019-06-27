const { gql } = require('apollo-server'),
  { user: User } = require('../../models');

module.exports = {
  queries: {
    user: (_, params) => User.getOne(params),
    users: (_, params) => User.getAll(params)
  },
  schema: gql`
    extend type Query {
      user(id: ID, firstName: String, email: String): User!
      users: [User]
    }
  `
};
