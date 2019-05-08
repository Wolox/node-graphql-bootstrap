const { user: User } = require('../../models');

module.exports = {
  user: (_, params) => User.getOne(params)
};
