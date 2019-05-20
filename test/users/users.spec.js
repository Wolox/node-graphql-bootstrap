const { query } = require('../server.spec'),
  { getUser } = require('./graphql');

describe('users', () => {
  describe('queries', () => {
    it('should fail if authorization header is missing', done => {
      query({ query: getUser(1) })
        .then(res => {
          console.log(res);
          expect(res.data).toBe({
            data: {
              user: {
                firstName: 'gonza',
                lastName: 'esc',
                email: 'gonzalo.escandarani@wolox.com.ar'
              }
            }
          });
        })
        .then(() => done());
    });
  });
});
