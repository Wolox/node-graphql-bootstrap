const { RedisCache } = require('apollo-server-cache-redis');
const Redis = require('ioredis');

const config = require('../../config').common.redisCache;

describe('redis', () => {
  test('connection redisCache', () => {
    const cache = new RedisCache({
      // host: config.host,
      // db: config.name,
      // maxRetriesPerRequest: 2
    });
    return cache
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
      });
  });
  test.only('connection redis', () => {
    jest.setTimeout(30000);
    console.log(config.host);
    const cache = new Redis({
      // host: config.host,
      // db: config.name,
      // maxRetriesPerRequest: 2
    });
    return cache
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
      });
  });
});
