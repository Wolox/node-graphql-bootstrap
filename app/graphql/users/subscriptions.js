const { gql } = require('apollo-server'),
  { userLoggedIn } = require('../events');

module.exports = {
  subscriptions: {
    onLogin: {
      subscribe: userLoggedIn.iter
    }
  },
  schema: gql`
    extend type Subscription {
      onLogin: String!
    }
  `
};
