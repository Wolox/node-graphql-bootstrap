const { user: User } = require('../../models');

module.exports = {
  createUser: (_, { user }) => User.createModel(user)
};
