const { queries } = require('../utils'),
  { user: User } = require('../../models');

module.exports = {
  queries: {
    user: (_, params) => User.getOne(params)
  },
  schema: queries`
      user(id: ID, firstName: String, email: String): User!
  `
};
