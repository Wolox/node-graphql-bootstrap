const { gql } = require('apollo-server');

const rootTypes = gql`
  extend type Query {
    album(id: ID): Album!
    albums(offset: Int, limit: Int, filter: String, orderBy: String): [Album!]!
  }
`;

const customTypes = gql`
  type Album {
    id: ID!
    title: String!
    photos: [Photo!]!
  }
  type Photo {
    albumId: ID!
    id: Int!
    title: String!
    url: String!
    thumbnailUrl: String!
  }
`;

exports.typeDefs = [rootTypes, customTypes];
