const { query } = require('../server.spec'),
  { getAlbum } = require('./graphql'),
  albumFactory = require('../factories/album'),
  photoFactory = require('../factories/photo'),
  axios = require('axios'),
  moment = require('moment');

describe('albums', () => {
  describe.skip('queries', () => {
    let fakeAlbumsToMock = undefined;
    let fakePhotosToMock = undefined;

    beforeEach(async done => {
      fakeAlbumsToMock = await albumFactory.createManyFakeAlbums(3);
      await axios.setMockAlbums(fakeAlbumsToMock);
      fakePhotosToMock = await photoFactory.createManyFakePhotos(5, 1);
      await axios.setMockPhotos(fakePhotosToMock);
      done();
    });
    test('testing cache', () => {
      jest.setTimeout(30000);
      const hrstartNoChached = moment();
      return query(getAlbum(fakeAlbumsToMock[0].id)).then(() => {
        const hrendNoCached = moment().diff(hrstartNoChached);
        const hrstartCached = moment();
        return query(getAlbum(fakeAlbumsToMock[0].id)).then(() => {
          const hrendCached = moment().diff(hrstartCached);
          expect(hrendNoCached - hrendCached).toBeGreaterThan(100);
        });
      });
    });
  });
});
