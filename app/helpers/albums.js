const filterByTitle = (albums, filter) => albums.filter(({ title }) => title.includes(filter));

const paginate = (albums, offset, limit) => albums.slice(offset, offset + limit);

const orderByFunction = (albums, orderBy) =>
  albums.sort((prev, next) => (prev[orderBy] > next[orderBy] ? 1 : -1));

exports.filterAndFormat = (rawAlbums, modifiers) => {
  const { filter, offset, limit, orderBy } = modifiers;
  const filteredAlbums = filter ? filterByTitle(rawAlbums, filter) : rawAlbums;
  const paginatedAlbums = limit ? paginate(filteredAlbums, offset, limit) : filteredAlbums;
  return orderBy ? orderByFunction(paginatedAlbums, orderBy) : paginatedAlbums;
};
