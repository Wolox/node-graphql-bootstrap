const { mutations } = require('../utils'),
  { user: User } = require('../../models');

module.exports = {
  mutations: {
    createUser: (_, { user }) => User.createModel(user)
  },
  schema: mutations`
      createUser(user: UserInput!): User!
  `
};
