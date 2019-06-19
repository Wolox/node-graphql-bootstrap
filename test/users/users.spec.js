const { query, mutate } = require('../server.spec'),
  { getUser, getUsers, createUser } = require('./graphql'),
  userFactory = require('../factories/user'),
  { mutations } = require('../../app/graphql/users/mutations');

describe('users', () => {
  describe('queries', () => {
    it('should get user properly', () =>
      userFactory.create().then(user =>
        query(getUser(user.id)).then(res => {
          expect(res.data).toEqual({
            user: {
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email
            }
          });
        })
      ));

    it('should get all users', () =>
      userFactory.createMany(5).then(() =>
        query(getUsers()).then(res => {
          expect(res.data.users).toHaveLength(5);
        })
      ));

    it('should return null when fetching a non existing user', () =>
      query(getUser(876545678)).then(res => {
        expect(res.data).toBeNull();
      }));

    it('should return an empty array wheren there are no users', () =>
      query(getUsers()).then(res => {
        expect(res.data.users).toEqual([]);
      }));
  });

  describe('mutations', () => {
    it('should create an user successfuly', () =>
      userFactory.attributes().then(user =>
        mutate(createUser(user)).then(res => {
          const { firstName, lastName, email, password, username, id } = res.data.createUser;
          expect(firstName).toEqual(user.firstName);
          expect(lastName).toEqual(user.lastName);
          expect(email).toEqual(user.email);
          expect(password).toEqual(user.password);
          expect(username).toEqual(user.username);
          expect(id).toBeDefined();
        })
      ));
  });

  describe('resolvers', () => {
    describe('createUser', () => {
      it('should create an user successfuly', async () => {
        const user = await userFactory.build();
        mutations.createUser({}, { user: user.dataValues }).then(res => {
          expect(res.dataValues).toHaveProperty('id');
          expect(res.dataValues).toHaveProperty('firstName');
          expect(res.dataValues).toHaveProperty('lastName');
          expect(res.dataValues).toHaveProperty('email');
          expect(res.dataValues).toHaveProperty('username');
          expect(res.dataValues).toHaveProperty('password');
          expect(res.dataValues).toHaveProperty('updated_at');
          expect(res.dataValues).toHaveProperty('created_at');
        });
      });

      it('should fail to create an user with malformed parameters', () => {
        mutations.createUser({}, { user: { a: 'b' } }).catch(err => {
          expect(typeof err.errors).toBe('object');
          expect(err.errors).toHaveLength();
        });
      });
    });
  });
});
