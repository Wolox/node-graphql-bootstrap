const { factory } = require('factory-girl'),
  // { chance } = factory,
  models = require('../../app/models'),
  { user: User } = models;

factory.define('user', User, {
  firstName: () => 'ASD',
  lastName: () => 'asd',
  email: () => 'asd',
  username: () => 'asd',
  password: () => 'asd'
});

const create = params => factory.create('user', params);

module.exports = { create };
