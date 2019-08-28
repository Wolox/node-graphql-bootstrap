const { query } = require('../server.spec'),
  { getAlbum, getAlbums, getAlbumsWithFilter, getAlbumsWithOffset } = require('./graphql'),
  albumFactory = require('../factories/album'),
  photoFactory = require('../factories/photo'),
  axios = require('axios');

describe('albums', () => {
  describe('queries', () => {
    let fakeAlbumsToMock = undefined;
    let fakePhotosToMock = undefined;
    let cont = 0;

    beforeEach(async done => {
      fakeAlbumsToMock = await albumFactory.createManyFakeAlbums(5);
      const mockAlbumsProm = axios.setMockAlbums(fakeAlbumsToMock);
      fakePhotosToMock = await photoFactory.createManyFakePhotos(5, cont);
      const mockPhotosProm = axios.setMockPhotos(fakePhotosToMock);
      cont += 1;
      Promise.all([mockAlbumsProm, mockPhotosProm]).then(done());
    });

    test('should get album properly', () => {
      const queryProm0 = query(getAlbum(fakeAlbumsToMock[0].id));
      const queryProm1 = query(getAlbum(fakeAlbumsToMock[1].id));
      const queryProm2 = query(getAlbum(fakeAlbumsToMock[2].id));
      return Promise.all([queryProm0, queryProm1, queryProm2]).then(([resQuery0, resQuery1, resQuery2]) => {
        expect(resQuery0).not.toEqual(resQuery1);
        expect(resQuery0).not.toEqual(resQuery2);
        expect(resQuery1).not.toEqual(resQuery2);
        expect(resQuery0.data).toEqual({
          album: {
            id: fakeAlbumsToMock[0].id,
            title: fakeAlbumsToMock[0].title,
            photos: fakePhotosToMock
          }
        });
        expect(resQuery1.data).toEqual({
          album: {
            id: fakeAlbumsToMock[1].id,
            title: fakeAlbumsToMock[1].title,
            photos: fakePhotosToMock
          }
        });
        expect(resQuery2.data).toEqual({
          album: {
            id: fakeAlbumsToMock[2].id,
            title: fakeAlbumsToMock[2].title,
            photos: fakePhotosToMock
          }
        });
      });
    });
    test('should get all albums properly', () => {
      const queryAllAlbumsProm = query(getAlbums());
      const querySlicedAlbumsProm = query(getAlbumsWithOffset(0, 3));
      const queryFilterAlbumsProm = query(getAlbumsWithFilter(fakeAlbumsToMock[2].title));
      return Promise.all([queryAllAlbumsProm, querySlicedAlbumsProm, queryFilterAlbumsProm]).then(
        ([resAllAlbums, resSliceAlbums, resFilterAlbums]) => {
          expect(resAllAlbums.data.albums).toHaveLength(5);
          expect(resSliceAlbums.data.albums).toHaveLength(3);
          expect(resFilterAlbums.data.albums).toHaveLength(1);
          expect(resFilterAlbums.data.albums[0]).toEqual({
            id: fakeAlbumsToMock[2].id,
            title: fakeAlbumsToMock[2].title,
            photos: fakePhotosToMock
          });
        }
      );
    });
  });
});
