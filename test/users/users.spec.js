const { query } = require('../server.spec'),
  { getUser } = require('./graphql'),
  { create } = require('./factory');

describe('users', () => {
  describe('queries', () => {
    it('should get user properly', () =>
      create().then(user =>
        query({ query: getUser(user.id) }).then(res => {
          expect(res.data).toEqual({
            user: {
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email
            }
          });
        })
      ));
  });
});
