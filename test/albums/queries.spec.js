const { query } = require('../server.spec'),
  { getAlbum, getAlbums, getAlbumsWithFilter, getAlbumsWithOffset } = require('./graphql'),
  albumFactory = require('../factories/album'),
  photoFactory = require('../factories/photo'),
  axios = require('axios');

describe('albums', () => {
  describe('queries', () => {
    it('should get album properly', () => {
      const fakeAlbumsProm = albumFactory
        .createManyFakeAlbums(5)
        .then(fakeAlbumsToMock => axios.setMockAlbums(fakeAlbumsToMock).then(() => fakeAlbumsToMock));
      const fakePhotosProm = photoFactory
        .createManyFakePhotos(5, 2)
        .then(fakePhotosToMock => axios.setMockPhotos(fakePhotosToMock).then(() => fakePhotosToMock));
      return Promise.all([fakeAlbumsProm, fakePhotosProm]).then(([fakeAlbums, fakePhotos]) => {
        const queryProm0 = query(getAlbum(fakeAlbums[0].id));
        const queryProm1 = query(getAlbum(fakeAlbums[1].id));
        const queryProm2 = query(getAlbum(fakeAlbums[2].id));
        return Promise.all([queryProm0, queryProm1, queryProm2]).then(([resQuery0, resQuery1, resQuery2]) => {
          expect(resQuery0).not.toEqual(resQuery1);
          expect(resQuery0).not.toEqual(resQuery2);
          expect(resQuery1).not.toEqual(resQuery2);
          expect(resQuery0.data).toEqual({
            album: {
              id: fakeAlbums[0].id,
              title: fakeAlbums[0].title,
              photos: fakePhotos
            }
          });
          expect(resQuery1.data).toEqual({
            album: {
              id: fakeAlbums[1].id,
              title: fakeAlbums[1].title,
              photos: fakePhotos
            }
          });
          expect(resQuery2.data).toEqual({
            album: {
              id: fakeAlbums[2].id,
              title: fakeAlbums[2].title,
              photos: fakePhotos
            }
          });
        });
      });
    });
    it('should get all albums properly', () => {
      const fakeAlbumsProm = albumFactory
        .createManyFakeAlbums(5)
        .then(fakeAlbumsToMock => axios.setMockAlbums(fakeAlbumsToMock).then(() => fakeAlbumsToMock));
      const fakePhotosProm = photoFactory
        .createManyFakePhotos(5, 3)
        .then(fakePhotosToMock => axios.setMockPhotos(fakePhotosToMock).then(() => fakePhotosToMock));
      return Promise.all([fakeAlbumsProm, fakePhotosProm]).then(([fakeAlbums, fakePhotos]) => {
        const queryAllAlbumsProm = query(getAlbums());
        const querySlicedAlbumsProm = query(getAlbumsWithOffset(0, 3));
        const queryFilterAlbumsProm = query(getAlbumsWithFilter(fakeAlbums[2].title));
        return Promise.all([queryAllAlbumsProm, querySlicedAlbumsProm, queryFilterAlbumsProm]).then(
          ([resAllAlbums, resSliceAlbums, resFilterAlbums]) => {
            expect(resAllAlbums.data.albums).toHaveLength(5);
            expect(resSliceAlbums.data.albums).toHaveLength(3);
            expect(resFilterAlbums.data.albums).toHaveLength(1);
            expect(resFilterAlbums.data.albums[0]).toEqual({
              id: fakeAlbums[2].id,
              title: fakeAlbums[2].title,
              photos: fakePhotos
            });
          }
        );
      });
    });
  });
});
