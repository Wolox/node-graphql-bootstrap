const { gql } = require('apollo-server'),
  { user: User } = require('../../models');

module.exports = {
  mutations: {
    createUser: (_, { user }) => User.createModel(user)
  },
  schema: gql`
    extend type Mutation {
      createUser(user: UserInput!): User!
    }
  `
};
