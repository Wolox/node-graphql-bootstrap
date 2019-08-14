const { gql } = require('apollo-server');

const rootTypes = gql`
  extend type Query {
    album(id: ID): Album!
  }
`;

const customTypes = gql`
  type Album {
    id: ID!
    title: String!
    userId: String!
    photos: [Photos]!
  }
  type Photos {
    id: ID!
    title: String!
    albumId: ID!
    url: String!
    thumbnailUrl: String
  }
`;

exports.typeDefs = [rootTypes, customTypes];
