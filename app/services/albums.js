const { get } = require('axios');

const { findInCache, updateCache } = require('../helpers/cache'),
  { filterAndFormat } = require('../helpers/albums'),
  { url } = require('../../config').common.albumApi;

exports.getAlbum = id => {
  const endpoint = `${url}albums/${id}`;
  return findInCache(endpoint).then(
    cachedInfo =>
      cachedInfo ||
      get(endpoint).then(response => {
        updateCache(endpoint, response.data);
        return response.data;
      })
  );
};

exports.getAllAlbums = options => {
  const endpoint = `${url}albums`;
  return findInCache(endpoint)
    .then(
      cachedInfo =>
        cachedInfo ||
        get(endpoint).then(response => {
          updateCache(endpoint, response.data);
          return response.data;
        })
    )
    .then(albums => filterAndFormat(albums, options));
};

exports.getPhotosOfAlbum = albumId => {
  const query = `?albumId=${albumId}`;
  const endpoint = `${url}photos${query}`;
  return findInCache(endpoint).then(
    cachedInfo =>
      cachedInfo ||
      get(endpoint).then(response => {
        updateCache(endpoint, response.data);
        return response.data;
      })
  );
};
