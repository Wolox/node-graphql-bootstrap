const { get } = require('axios');

const { init } = require('../helpers/cache'),
  { filterAndFormat } = require('../helpers/albums'),
  { url } = require('../../config').common.albumApi;

const getter = ({ endpoint }) => get(endpoint).then(response => response.data);

const cache = init(getter);

exports.getAlbum = id => {
  const endpoint = `${url}albums/${id}`;
  return cache.load({ endpoint });
};

exports.getAllAlbums = options => {
  const endpoint = `${url}albums`;
  return cache.load({ endpoint }).then(albums => filterAndFormat(albums, options));
};

exports.getPhotosOfAlbum = albumId => {
  const query = `?albumId=${albumId}`;
  const endpoint = `${url}photos${query}`;
  return cache.load({ endpoint });
};
