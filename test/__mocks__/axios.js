const { parse: urlParse } = require('url');

const axios = jest.genMockFromModule('axios');

const mockResponse = Object.create(null);

function setMockAlbums(albums) {
  mockResponse['/albums'] = albums;
  albums.forEach(album => {
    mockResponse[`/albums/${album.id}`] = album;
  });
}

function setMockPhotos(photos) {
  mockResponse['/photos'] = photos;
}

function get(url) {
  const urlParsed = urlParse(url);
  return new Promise(resolve => {
    setTimeout(
      () =>
        resolve({
          data: mockResponse[urlParsed.pathname]
        }),
      500
    );
  });
}

axios.setMockAlbums = setMockAlbums;
axios.setMockPhotos = setMockPhotos;
axios.get = get;

module.exports = axios;
