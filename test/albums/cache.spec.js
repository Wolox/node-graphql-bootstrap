const { query } = require('../server.spec'),
  { getAlbum } = require('./graphql'),
  albumFactory = require('../factories/album'),
  photoFactory = require('../factories/photo'),
  axios = require('axios'),
  moment = require('moment');

describe('albums', () => {
  describe('queries', () => {
    it('testing cache', () => {
      const fakeAlbumsProm = albumFactory
        .createManyFakeAlbums(3)
        .then(fakeAlbumsToMock => axios.setMockAlbums(fakeAlbumsToMock).then(() => fakeAlbumsToMock));
      const fakePhotosProm = photoFactory
        .createManyFakePhotos(5, 1)
        .then(fakePhotosToMock => axios.setMockPhotos(fakePhotosToMock).then(() => fakePhotosToMock));
      return Promise.all([fakeAlbumsProm, fakePhotosProm]).then(([fakeAlbums]) => {
        const hrstartNoChached = moment();
        query(getAlbum(fakeAlbums[0].id));
        const hrendNoCached = moment().diff(hrstartNoChached);
        const hrstartCached = moment();
        query(getAlbum(fakeAlbums[0].id));
        const hrendCached = moment().diff(hrstartCached);
        return expect(hrendNoCached - hrendCached).toBeGreaterThan(100);
      });
    });
  });
});
