const { PubSub } = require('apollo-server'),
  pubsub = new PubSub();

const USER_LOGGED_IN = 'USER_LOGGED_IN';
exports.userLoggedIn = {
  iter: () => pubsub.asyncIterator(USER_LOGGED_IN),
  publish: username =>
    pubsub.publish(USER_LOGGED_IN, {
      onLogin: `${username} just logged in`
    })
};
