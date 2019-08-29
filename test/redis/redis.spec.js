const { RedisCache } = require('apollo-server-cache-redis');

const config = require('../../config').common.redisCache;

const cache = new RedisCache({
  host: config.host,
  db: config.name,
  maxRetriesPerRequest: 20
});
describe('redis', () => {
  test.only('connection', () =>
    cache
      .set('keyTest', 'TEST')
      .then(() =>
        cache
          .get('keyTest')
          .then(value => expect(value).toEqual('TEST'))
          .catch(error => {
            console.log(error);
            return expect(typeof error).toEqual(undefined);
          })
      )
      .catch(error => {
        console.log(error);
        return expect(typeof error).toEqual(undefined);
      }));
});
